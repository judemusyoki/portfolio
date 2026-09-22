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
- `content/skills.ts` — the grouped Toolkit section (chips per card)
- `content/projects.ts` — case studies (problem → role → decisions → outcomes) and work experience (Spiio, Acter, WasteHero)

Screenshots live in `public/images/<project>/` as WebP.

## Before launch (TODOs)

- [ ] Add `public/resume.pdf` and set `resumeUrl` in `content/site.ts`
- [ ] Confirm Spiio job title/start date in `content/projects.ts` (`experience`)
- [ ] Add the Acter company URL in `content/projects.ts`, or leave it unlinked
- [ ] Deploy SmartBin to Vercel and set its `links.demo` in `content/projects.ts`
- [x] Nairobi Dashboard overview screenshot in `public/images/nairobi/`
- [ ] Capture more Nairobi views (FRS SLA chart, data explorer, Swahili) into `public/images/nairobi/` and list them in `content/projects.ts`

See [ROADMAP.md](ROADMAP.md) for the post-launch work that should make the site convert better (social proof, outcomes on cards, services with a process).

## Deploy (Vercel free tier)

1. Push to GitHub.
2. vercel.com → Add New Project → import the repo (framework auto-detected).
3. Set env var `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://judemusyoki.vercel.app`).
4. Later: add a custom domain in Vercel → update `NEXT_PUBLIC_SITE_URL`.
