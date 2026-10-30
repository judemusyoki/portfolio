import type { CSSProperties } from "react";

/** Splits "plain *emphasised* plain" into parts; *…* renders in the accent colour. */
function parse(text: string) {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*")
        ? { text: part.slice(1, -1), em: true }
        : { text: part, em: false },
    );
}

const emClass = "not-italic text-accent";

/** Inline text with *asterisk* emphasis. */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {parse(text).map((part, i) =>
        part.em ? (
          <em key={i} className={emClass}>
            {part.text}
          </em>
        ) : (
          part.text
        ),
      )}
    </>
  );
}

/**
 * Headline where every word rises out of its own mask on load (see .word in
 * globals.css). Screen readers get the plain sentence once instead of the
 * word fragments.
 */
export function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  let index = 0;
  const plain = parse(text)
    .map((p) => p.text)
    .join("");
  return (
    <>
      <span className="sr-only">{plain}</span>
      {parse(text).map((part, p) =>
        part.text
          .split(/(\s+)/)
          .filter(Boolean)
          .map((word, w) => {
            if (/^\s+$/.test(word)) return " ";
            const i = index++;
            return (
              <span key={`${p}-${w}`} className="word" aria-hidden="true">
                <span
                  className={part.em ? emClass : undefined}
                  style={{ "--i": i + delay } as CSSProperties}
                >
                  {word}
                </span>
              </span>
            );
          }),
      )}
    </>
  );
}

/**
 * Paragraph that lights up word by word as it scrolls through the viewport
 * (.scrub-words). --p is each word's position, 0 → 1.
 */
export function ScrubWords({ text, className = "" }: { text: string; className?: string }) {
  const words = parse(text).flatMap((part) =>
    part.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, em: part.em })),
  );
  return (
    <p className={`scrub-words ${className}`}>
      {words.map(({ word, em }, i) => (
        <span
          key={i}
          className={em ? "text-accent" : undefined}
          style={{ "--p": i / words.length } as CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
