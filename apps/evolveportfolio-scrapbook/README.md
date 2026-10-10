# Project Evolve: Scrapbook preview

An independently built Angular snapshot of `uni/evolveportfolio-scrapbook`, published alongside the original 100-component gallery. The gallery is not replaced.

Public preview: https://spockey4711.github.io/ui-scrapbook/previews/evolveportfolio-scrapbook/

## Development and checks

Use Node.js 24. From this directory:

```sh
npm ci
npm start
npm run lint
npm test -- --watch=false
npm run build -- --base-href /ui-scrapbook/previews/evolveportfolio-scrapbook/
```

The existing Pages workflow checks and builds this application, then stages only its browser output under `previews/evolveportfolio-scrapbook/`. Source files, tests, repository documentation and dependencies are not published.

This copy uses Angular hash routing (`#/team`, `#/dashboard`, etc.) because GitHub Pages does not provide SPA rewrites. Direct links and refresh work without changing the original gallery's routing or 404 handling. The local original application retains its existing routing.

## Boundaries

This is a public design preview. Team profiles are explicitly marked placeholders and dashboard values are explicitly synthetic demo data. No GitLab API token or live integration is included. There is no working mail form or invented email address. The cookie notice stores only its acknowledgment, with no optional tracking.

Fonts are served locally; their license notices are in `public/licenses/`. The gallery and this preview remain independently maintained. Changes to the local original do not automatically update this snapshot.
