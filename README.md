# judemusyoki.com — Portfolio

Personal portfolio site for Jude Musyoki — data-heavy dashboards & geospatial visualization.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. Fully static, dark-mode default.

## Develop

```bash
npm run dev
```

## Content

All copy lives in typed content objects — no CMS:

- `content/site.ts` — name, email, links, availability, about, services
- `content/projects.ts` — case studies (problem → role → decisions → outcomes) and Spiio experience

Screenshots live in `public/images/<project>/` as WebP.

## Before launch (TODOs)

- [ ] Add `public/resume.pdf` and set `resumeUrl` in `content/site.ts`
- [ ] Set `linkedin` in `content/site.ts`
- [ ] Confirm job title/dates in `content/projects.ts` (`experience`)
- [ ] Deploy SmartBin to Vercel and set its `links.demo` in `content/projects.ts`
- [ ] Capture Nairobi Dashboard screenshots (authenticated, local) into `public/images/nairobi/` and list them in `content/projects.ts`

## Deploy (Vercel free tier)

1. Push to GitHub.
2. vercel.com → Add New Project → import the repo (framework auto-detected).
3. Set env var `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://judemusyoki.vercel.app`).
4. Later: add a custom domain in Vercel → update `NEXT_PUBLIC_SITE_URL`.
