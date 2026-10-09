# Little UI, Big Feelings

**100 distinct, interactive UI experiments with a shared scrapbook soul.**

Torn paper, letterpress-like typography, handwritten notes, stitched details, paint-shop colors, tape, tickets, and a little intentional imperfection. Familiar controls remain recognizable; their interactions take a more playful route.

## Open the collection

Open [`index.html`](index.html) directly in a browser. No installation, build server, network connection, or framework is needed. The fonts and illustrations are included locally.

For an HTTP preview, run this from the `uni` directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory Capstone/ui-scrapbook
```

Then visit **http://127.0.0.1:4173/**.

## Browse and experiment

- Search titles, descriptions, categories, and interaction hints. Press `/` to focus search.
- Browse ten chapters, with ten different components in each.
- Save a local shortlist with the star buttons.
- Use **Surprise me** for an unexpected starting point.
- Open a live experiment, switch between desk and phone views, and try its controls.
- Use the previous/next buttons, or the arrow keys when focus is outside the preview, to move between experiments. Escape closes dialogs.
- Inspect, copy, or download the actual HTML. **Open full page** opens the standalone component.
- Share a gallery deep link such as `index.html#idea-seed-garden`.

The chapters are **Foundations, Navigation, Inputs, People, Projects, Data, Time, Messages, Media, and Play**. Components are numbered `001` through `100` in [`components/`](components/).

Highlights include an ink-stamp action button, binder tabs, a project passport, a Polaroid team card, a clothesline Kanban board, a sprint quilt, coffee-ring analytics, a paper-bellows breathing guide, an ambient sound mixer, a scratchcard, a seed garden, a decision scale, and a paper-airplane message dispatch.

## Files and reuse

```text
index.html                 The single collection browser
assets/paper.css           Shared typography, paper materials, and primitives
assets/gallery.css         Gallery and responsive preview layouts
assets/runtime.js          Small interaction helpers
assets/gallery.js          Search, filters, shortlist, and dialogs
assets/catalog.js          Generated component metadata and full HTML source
assets/fonts/              Local fonts and their OFL notices
assets/landscape.svg        Original landscape illustration
components/                Exactly 100 generated, individual HTML pages
source/                    Ten authored modules, each with ten experiments
build.mjs                  Dependency-free HTML/catalog generation
tests/                     Structural checks and browser interaction tests
```

Each component file contains its own markup, component-specific CSS, and interaction code. It references the shared stylesheet and helper script; image-led components also reference the local illustration. **Keep the `assets/` folder alongside `components/` when moving or deploying the collection.** Downloaded/copied HTML still uses those relative asset references.

To change a component, edit its definition in `source/`, then regenerate from the `uni` directory:

```sh
node Capstone/ui-scrapbook/build.mjs
```

Do not manually edit generated component HTML or `assets/catalog.js`. The builder checks the count, uniqueness, and script syntax. Use `String.raw` for JavaScript snippet strings containing regular-expression escapes or `\n`.

The collection is intentionally independent of `Capstone/evolveportfolio`. It is a visual and interaction reference library, not a replacement for the capstone application's framework, CSS-framework integration, GitLab API, deployment pipeline, or submission requirements. Its people and project data are illustrative.

## Interaction boundaries

- Forms, notes, consent choices, and preferences are local demonstrations. No email, actual reservation, payment, repository action, analytics, or real deployment is performed.
- Some features use browser-local storage. When storage is unavailable, the interface remains usable and explains where persistence cannot be provided.
- The upload pocket does not upload files. Drawing and sticker exports download to your device.
- The cassette and radio produce original synthesized audio, starting only after you request sound. Browsers without Web Audio receive a clear fallback.
- Scratchcards and drag interactions have button/keyboard alternatives. Controls have labels and visible focus states; dialogs use native focus management. Reduced-motion preferences are respected.
- This is not a claim of a complete accessibility certification or production backend integration.

## Tests

Structural and JavaScript syntax checks, without third-party dependencies:

```sh
node --test Capstone/ui-scrapbook/tests/structure.test.mjs
```

With the HTTP server above running, execute the browser suite in Chrome:

```sh
npx -y chrome-devtools-axi run < Capstone/ui-scrapbook/tests/browser.js
```

The browser suite opens **all 100 real HTML files at 900 px and 375 px**, checks initialization, horizontal page overflow, button names, and image loading, then exercises a distinct interaction in every component. Form tests click the visible submit buttons. It also checks that all 100 thumbnails fit their preview windows, and tests gallery filtering, search, live previews, phone sizing, source inspection, shortlist persistence, browsing all 100 components, and gallery layout at 320, 375, 768, and 1600 px. Test-generated component storage is restored after the component run.

The suite prints a compact report and exits with an error on failures. Visual review should additionally include the gallery and live previews at phone, tablet, and wide-desktop sizes.
