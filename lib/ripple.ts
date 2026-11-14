/**
 * Ripple-displacement image transition on a bare WebGL context.
 *
 * The fragment shader is adapted from Vengeance UI's RippleDisplacementSlider
 * (https://github.com/Ashutoshx7/VengeanceUI, MIT License, Copyright (c)
 * 2025-2026 Ashutoshx7). The original drives it with three.js and gsap; here
 * the same shader runs on a raw context with a requestAnimationFrame tween,
 * and images are letterboxed ("contain") instead of cropped so screenshots
 * keep their edges.
 */

const VERT = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uResCurrent;
uniform vec2 uResNext;
uniform float uWaveFreq;
uniform float uWavePow;
uniform float uWaveWidth;
uniform float uFalloff;
uniform float uBoost;
uniform float uCrossfade;
varying vec2 vUv;

vec4 sampleContain(sampler2D tex, vec2 uv, vec2 imgRes) {
  float boxAspect = uResolution.x / uResolution.y;
  float imgAspect = imgRes.x / imgRes.y;
  vec2 scale = vec2(1.0);
  if (boxAspect > imgAspect) scale.x = boxAspect / imgAspect;
  else scale.y = imgAspect / boxAspect;
  vec2 p = (uv - 0.5) * scale + 0.5;
  if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) return vec4(0.0);
  return texture2D(tex, p);
}

void main() {
  float aspectRatio = uResolution.y / uResolution.x;
  vec2 coord = vec2(vUv.x, vUv.y * aspectRatio);
  vec2 center = vec2(0.5, 0.5 * aspectRatio);
  float dist = distance(coord, center);

  vec2 displaced = coord;
  float brightness = 0.0;
  float blend = 0.0;

  if (uProgress > 0.001) {
    float trailing = dist - uProgress;
    if (trailing < uWaveWidth && trailing < 0.0) {
      float age = -trailing;
      float decay = exp(-age * uFalloff);
      float wave = sin(age * uWaveFreq) * decay;
      vec2 direction = normalize(coord - center);
      displaced += direction * wave * uWavePow;
      brightness = abs(wave) * uBoost * decay;
    }
    blend = smoothstep(0.0, uCrossfade, -trailing);
  }

  vec2 finalUv = vec2(displaced.x, displaced.y / aspectRatio);
  vec4 current = sampleContain(uTexCurrent, finalUv, uResCurrent);
  vec4 next = sampleContain(uTexNext, finalUv, uResNext);
  vec4 color = mix(current, next, blend);
  color.rgb += color.rgb * brightness;
  gl_FragColor = color;
}
`;

const CONFIG = { waveFreq: 25, wavePow: 0.035, waveWidth: 0.5, falloff: 10, boost: 0.5, crossfade: 0.05, duration: 1200 };

type Tex = { texture: WebGLTexture; width: number; height: number };

export type Ripple = {
  /** Decode an image and upload it as a texture (no-op if already loaded). */
  load: (src: string) => Promise<void>;
  has: (src: string) => boolean;
  /** Draw this image with no transition. */
  show: (src: string) => void;
  /** Ripple from the image on screen to this one. */
  transition: (src: string) => void;
  busy: () => boolean;
  dispose: () => void;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Returns null when WebGL is unavailable, so callers can fall back to a plain image. */
export function createRipple(canvas: HTMLCanvasElement, box: HTMLElement): Ripple | null {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
  if (!gl) return null;
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  gl.uniform1i(u("uTexCurrent"), 0);
  gl.uniform1i(u("uTexNext"), 1);
  gl.uniform1f(u("uWaveFreq"), CONFIG.waveFreq);
  gl.uniform1f(u("uWavePow"), CONFIG.wavePow);
  gl.uniform1f(u("uWaveWidth"), CONFIG.waveWidth);
  gl.uniform1f(u("uFalloff"), CONFIG.falloff);
  gl.uniform1f(u("uBoost"), CONFIG.boost);
  gl.uniform1f(u("uCrossfade"), CONFIG.crossfade);
  const uProgress = u("uProgress");
  const uResolution = u("uResolution");
  const uResCurrent = u("uResCurrent");
  const uResNext = u("uResNext");

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  const textures = new Map<string, Tex>();
  let current: Tex | null = null;
  let next: Tex | null = null;
  let progress = 0;
  let raf = 0;
  let disposed = false;

  const draw = () => {
    if (disposed || !current) return;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, current.texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, (next ?? current).texture);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform2f(uResCurrent, current.width, current.height);
    gl.uniform2f(uResNext, (next ?? current).width, (next ?? current).height);
    gl.uniform1f(uProgress, progress);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(box.clientWidth * dpr));
    const h = Math.max(1, Math.round(box.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    draw();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(box);
  resize();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return {
    async load(src) {
      if (textures.has(src) || disposed) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      try {
        await img.decode();
      } catch {
        return;
      }
      if (disposed) return;
      const texture = gl.createTexture();
      if (!texture) return;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      textures.set(src, { texture, width: img.naturalWidth, height: img.naturalHeight });
      // keep whatever was on screen bound
      if (current) gl.bindTexture(gl.TEXTURE_2D, current.texture);
    },
    has: (src) => textures.has(src),
    show(src) {
      const tex = textures.get(src);
      if (!tex) return;
      cancelAnimationFrame(raf);
      raf = 0;
      current = tex;
      next = null;
      progress = 0;
      draw();
    },
    transition(src) {
      const tex = textures.get(src);
      if (!tex || !current || raf) return;
      if (reduced) {
        this.show(src);
        return;
      }
      next = tex;
      // the wave must travel past the far corner before the swap completes
      const ratio = canvas.height / canvas.width;
      const end = Math.hypot(0.5, 0.5 * ratio) + CONFIG.waveWidth;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / CONFIG.duration);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        progress = eased * end;
        draw();
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          current = tex;
          next = null;
          progress = 0;
          raf = 0;
          draw();
        }
      };
      raf = requestAnimationFrame(step);
    },
    busy: () => raf !== 0,
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      for (const { texture } of textures.values()) gl.deleteTexture(texture);
      textures.clear();
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
