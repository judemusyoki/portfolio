# Roadmap — turning visitors into inquiries

Last reviewed: 2026-09-22.

This file tracks the work that should make the site convert better for its two audiences: freelance clients (primary) and full-time employers. Launch mechanics (resume, LinkedIn, Vercel) live in the [README](README.md#before-launch-todos); this file is about what the site says and shows.

## Where the site stands

The structure and design already match what well-regarded freelance developer sites do: a named specialism and availability in the hero, a "hire me" call to action above the fold, and full case studies instead of project thumbnails. The gap is **proof**. The site has no testimonials, no client or employer names outside the Experience section, and no measurable outcomes on the project cards, so it currently reads more like a job-seeker portfolio than a business site.

Positioning decision, made 2026-09-21: keep the narrow headline ("data-heavy dashboards & geospatial visualization"). Show the wider range of work, from a simple marketing site to a layered platform, in the Services section rather than widening the hero.

## Priorities

Ordered by expected impact. Items marked **needs Jude** require content or a decision before any code can be written.

### 1. Social proof — needs Jude

- [ ] Collect two or three short quotes (two sentences each, with name, title, company): Spiio manager, someone from Acter, and the WasteHero manager who wrote the recommendation letter.
- [ ] Add a "Worked with" strip under the hero: Spiio, Acter, WasteHero, Safeex. Wordmarks only with permission; plain text otherwise.
- [ ] Place each quote next to the claim it supports (for example the Spiio quote beside the Spiio experience card), not in a separate testimonials block.

### 2. Outcomes on the project cards

- [ ] Add one result line per card in `content/projects.ts` and render it in `components/ProjectCard.tsx`.
  - Chanzo: all five seeded fraud patterns caught (11 of 12 forest-loss plots).
  - SmartBin: collection distance cut by 30–50%.
  - Nairobi: response-time performance against SLA across 14 charts and a live map.
- [ ] Repeat the same line at the top of each case-study page, above the fold.

### 3. Spiio as a case study — needs Jude

- [ ] Check what the contract or NDA allows to be shown.
- [ ] Write it in the same problem → approach → decisions → outcome shape as the other three, with two screenshots if permitted. If screenshots are not allowed, describe the surfaces and keep the stack chips.

### 4. Nairobi card image

- [ ] Capture a screenshot with synthetic or redacted data into `public/images/nairobi/` and list it in `content/projects.ts`. This is the only card without an image and is the weakest card visually. (Also listed under launch TODOs in the README.)

### 5. Human element — needs Jude

- [ ] Add a photo to the About section.
- [ ] State location and timezone (Aarhus, Denmark, CET).
- [ ] Add one personal line. Stand-up comedy on Sundays is a good candidate.

### 6. Services with a process

- [ ] Reorder the services tiles in `content/site.ts` into a ladder: marketing site → dashboard or data product → full platform build → audit.
- [ ] Add a short "how we'd work together" block with three or four steps: discovery call → scoped proposal → build in weekly increments → handover with docs.
- [ ] Move the Services section above About in `app/page.tsx` so a client sees offers before biography.

### 7. Site as evidence — optional, later

- [ ] A small live chart or map in the hero, so the specialism is visible rather than stated.

## Open questions

- Acter company URL: the Experience entry has a TODO in `content/projects.ts`. Leave unlinked if there is no current site.
- Whether to add a Writing section. The strongest solo consultants use articles as credibility, but it only helps if it is kept up. Not planned for now.

## Sources behind the priorities

Research done 2026-09-21 comparing this site against freelance developer and data-visualization portfolios:
[Twine freelance portfolios](https://www.twine.net/blog/best-freelance-developer-portfolio-examples/),
[HubSpot freelancer websites](https://blog.hubspot.com/website/freelancer-website-examples),
[Damongo on case studies](https://damongo.com/freelance-case-studies-2026/),
[Simple Programmer on testimonials](https://simpleprogrammer.com/client-testimonials-freelance-developer/),
[Visual Cinnamon](https://www.visualcinnamon.com/),
[Robin Wieruch](https://www.robinwieruch.de/),
[Brittany Chiang](https://brittanychiang.com/).
