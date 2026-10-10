import { Component } from '@angular/core';
import { ScrapbookPolaroid } from '../../shared/scrapbook-polaroid';

@Component({
  selector: 'app-design-page',
  imports: [ScrapbookPolaroid],
  template: `
    <div class="page-width reveal">
      <header class="page-heading">
        <div class="eyebrow">Designlabor / Die Scrapbook-Variante</div>
        <h1>Aus Papier.<br />Mit Persönlichkeit.</h1>
        <p>
          Handschrift ist gesetzt. Diese lokale Variante greift bewusst die ursprüngliche Sammlung
          „Little UI, Big Feelings“ auf, nicht die gesicherte grüne Project-Evolve-Notebook-Version.
        </p>
      </header>
      <section class="design-grid" aria-label="Gestaltung und wiederverwendete Komponenten">
        <div class="design-sheet">
          <h2>Unser Materialkasten.</h2>
          <div class="swatches" aria-label="Scrapbook-Farbpalette">
            @for (color of colors; track color.name) {
              <div [style.background]="color.hex">
                <strong>{{ color.name }}</strong
                ><span>{{ color.hex }}</span>
              </div>
            }
          </div>
          <p class="hand sample">Ein Anfang. Viele Möglichkeiten.</p>
          <p>
            Lokal ausgelieferte Caveat für persönliche Akzente, Bricolage Grotesque aus der
            ursprünglichen Sammlung für Überschriften und DM Sans für lesbare Inhalte.
          </p>
        </div>
        <div class="polaroid-example">
          <app-scrapbook-polaroid caption="Zum Anfassen gemacht." />
          <p class="hand">Auch mit Tastatur umdrehen ↶</p>
        </div>
      </section>
      <section class="sources">
        <h2>Aus der Originalsammlung.</h2>
        <p>
          Angular-Adaptionen aus <code>Capstone/ui-scrapbook/source/</code>. Keine eingebetteten
          HTML-Demos, keine fremden Teamdaten und kein Code aus
          <code>variants/project-evolve/</code>.
        </p>
        <ul>
          <li><strong>Binder tabs</strong> · farbige Register der Hauptnavigation</li>
          <li><strong>Polaroid team flip</strong> · umdrehbare Profilplatzhalter auf Home</li>
          <li><strong>Introduce-yourself badge</strong> · HELLO-Namenssticker im Hero</li>
          <li>
            <strong>Train-ticket stepper</strong> · Ticketmaterial und Perforation, ohne erfundenen
            Projektfortschritt
          </li>
          <li>
            <strong>Paper trail activity</strong> · Papierflächen und Aktivitäten im Dashboard
          </li>
          <li>
            <strong>Paper primitives</strong> · Tape, Papierkorn, Abrisskanten und Farbpalette
          </li>
        </ul>
        <p>
          Die Originalsammlung und das bestehende Angular-Projekt bleiben unverändert. Rosa, Gelb
          und Hellblau sind die Akzente dieser Entwurfsvariante; Waldgrün bleibt für das Signet und
          einzelne Stempel.
        </p>
      </section>
    </div>
  `,
  styles: `
    .page-heading h1 {
      font-size: clamp(2.1rem, 6vw, 5rem);
    }
    .design-grid {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 65px;
      align-items: center;
    }
    .design-sheet {
      padding: 30px;
      background: var(--surface);
      border: 1px solid var(--line);
    }
    .design-sheet h2 {
      font-size: 2rem;
    }
    .swatches {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-block: 26px;
      gap: 12px;
    }
    .swatches div {
      padding: 20px 12px;
      border: 1px solid var(--ink);
      transform: rotate(-2deg);
    }
    .swatches strong,
    .swatches span {
      display: block;
      font-size: 0.7rem;
    }
    .swatches span {
      margin-top: 12px;
    }
    .sample {
      font-size: 2rem;
      margin-bottom: 20px;
    }
    .design-sheet > p:last-child,
    .sources p,
    .sources li {
      font-size: 0.85rem;
    }
    .polaroid-example {
      max-width: 250px;
      margin: auto;
      transform: rotate(5deg);
    }
    .polaroid-example > p {
      font-size: 1.5rem;
      margin-top: 25px;
    }
    .sources {
      padding-block: 65px;
      max-width: 800px;
    }
    .sources h2 {
      font-size: clamp(1.7rem, 5vw, 2.5rem);
      margin-bottom: 20px;
    }
    .sources ul {
      margin-block: 25px;
      padding-left: 20px;
    }
    .sources li {
      padding-block: 8px;
    }
    code {
      overflow-wrap: anywhere;
    }
    @media (max-width: 800px) {
      .design-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
    @media (max-width: 400px) {
      .design-sheet {
        padding: 20px;
      }
      .swatches {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class DesignPage {
  readonly colors = [
    { name: 'Rosa', hex: '#f0a4bf' },
    { name: 'Gelb', hex: '#f4cd50' },
    { name: 'Hellblau', hex: '#9dc8e3' },
  ];
}
