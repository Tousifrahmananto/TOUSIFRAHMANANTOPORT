# Tousif Rahman Anto — Portfolio

A personal portfolio built with React, TypeScript and Vite. The approved Figma direction pairs a sticky introduction rail with large project previews. Warm neutrals, editorial typography and burnt orange carry through the research, experience, interactive skills and credentials. Once-only project reveals add subtle motion. No new runtime dependencies.

## Run locally

```powershell
npm install
npm run dev
```

## Build and preview

```powershell
npm run build
npm run preview
```

The production output is `dist/`. Vercel is configured in `vercel.json` to run the build and serve that directory. Older `/projects` and `/hobbies` URLs redirect to the corresponding homepage sections. Changes are local until committed and deployed.

## Edit content

- `src/data.ts`: email, GitHub, LinkedIn, optional X profile, and project descriptions, stacks, links, and case-study notes. X stays hidden until a real URL is supplied.
- The showcase contains eight original projects reviewed against public repository READMEs and source: CodeSwitch, AFK Productions, The Archive, MediPay, Game Physics Lab, The Chuckle Chronicles, Geo Entity Manager, and Workshop Appointments. Counts and category filters derive from the project data. Starter scaffolds, the small exercise bundle, profile/portfolio repos, and forks are not represented as original product work. EduCore and research remain separately sourced from the CV.
- `src/App.tsx`: introduction rail, about, availability, experience, education, research and credentials. Millennium Fellowship and Global Admissions Committee roles are completed. The CV establishes BRAC graduate status and Dreamers Academy dates of 2024–2026.
- `src/styles.css`: palette, typography, responsive layouts, and reduced-motion support.
- `public/images/`: full-color screenshots, portrait, and certificate previews. Source-only projects have clearly labeled interface illustrations with sample data. MediPay's listed live deployment returned 404 when checked, so only the source is linked. All eight projects have direct repository links; only verified live projects show a live link.
- `public/documents/`: résumé, Millennium Fellowship completion certificate, GAC appreciation certificate, and MCN recommendation. The recommendation confirms 40 application reviews in the completed 2026 cycle. The downloadable résumé is the updated 11 October 2026 CV from `D:/CV/Tousif_Rahman_Anto_Resume.pdf`. Thesis content follows its contribution-focused research description: interpretable response checks, bounded correction, conversational memory and local QLoRA adaptation.
- `public/fonts/`: self-hosted font files with their licenses. No third-party font requests at runtime.

## Validation

TypeScript checking and production compilation run through `npm run build`. Browser checks cover project filters, case-study opening and Escape dismissal, focus restoration, email copying, mobile overflow, image loading, and desktop/mobile layouts. Review captures are stored in the ignored `output/playwright/` directory.

With the local server running on port 4173, run the repeatable browser check:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-refresh open http://127.0.0.1:4173/
npx --yes --package @playwright/cli playwright-cli -s=portfolio-refresh run-code --filename tests/portfolio.check.js
```

The check covers filters, focus restoration, skill keyboard navigation, clipboard feedback, clean URLs, five viewport widths, reduced motion and visible image loading. Screenshots are saved under `.impeccable/review/`. Figma reference: https://www.figma.com/design/FpR1Qr6PL3pmCA9XSzun5z?node-id=2-32. Automated Impeccable engine checks were unavailable locally; browser verification is the evidence used for this build.

The original assignment pages and scripts are superseded by this app; their history remains in Git.
