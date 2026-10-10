import { Component } from '@angular/core';
import { SITE } from '../../site.data';

@Component({
  selector: 'app-contact-page',
  template: `
    <div class="page-width reveal">
      <header class="page-heading">
        <div class="eyebrow">03 / Kontakt</div>
        <h1>Platz für<br />ein Gespräch.</h1>
        <p>
          Fragen zu unserem Team oder unserer Arbeit? Hier findest du die Kontaktmöglichkeiten von
          Project Evolve.
        </p>
      </header>
      <section class="contact-grid grid gap-10 md:grid-cols-2">
        <div class="contact-sheet taped">
          <span class="postmark hand" aria-hidden="true">Evolve / 26–27</span>
          <span class="eyebrow">Unser gemeinsamer Ort</span>
          <h2>Auf GitLab.</h2>
          <p class="muted">
            In unserer Teamgruppe findest du die Projekte und ihre Entwicklung. Die Sichtbarkeit
            richtet sich nach deinen GitLab-Berechtigungen.
          </p>
          <a [href]="site.groupUrl" class="button" target="_blank" rel="noopener noreferrer"
            >GitLab-Teamgruppe öffnen <span aria-hidden="true">↗</span></a
          >
          <a [href]="site.repositoryUrl" class="text-link" target="_blank" rel="noopener noreferrer"
            >Repository dieser Website <span aria-hidden="true">↗</span></a
          >
        </div>
        <aside class="contact-note note">
          <span class="eyebrow">Direkter Kontakt</span>
          <h2 class="hand">Hier fehlt noch eine Adresse.</h2>
          @if (site.email) {
            <a [href]="'mailto:' + site.email" class="text-link">{{ site.email }}</a>
          } @else {
            <p>
              Eine freigegebene Team-Mailadresse ist noch nicht hinterlegt. Wir veröffentlichen
              keine erfundenen Kontaktdaten.
            </p>
          }
          <p class="hand bottom-note">Lieber ehrlich offen<br />als ein Formular ohne Versand.</p>
        </aside>
      </section>
      <p class="contact-footnote muted">
        Ein echtes Kontaktformular ist eine mögliche spätere Erweiterung. Im MVP bleibt diese Seite
        bewusst schlank.
      </p>
    </div>
  `,
  styles: `
    .contact-grid {
      margin-block: 10px 48px;
      align-items: start;
    }
    .contact-sheet {
      position: relative;
      padding: 34px;
      border: 1px solid #bdb49e;
      border-bottom: 12px solid var(--blue);
      background: var(--surface);
      box-shadow: 4px 6px 0 #79735920;
    }
    .postmark {
      display: block;
      width: fit-content;
      margin-bottom: 20px;
      border: 3px double var(--ink);
      background: var(--pink);
      padding: 8px 15px;
      font-size: 1.5rem;
      transform: rotate(-7deg);
    }
    .contact-sheet h2 {
      margin-block: 22px 18px;
    }
    .contact-sheet p {
      font-size: 0.9rem;
    }
    .contact-sheet .button {
      margin-top: 28px;
    }
    .contact-sheet .text-link {
      display: flex;
      width: fit-content;
      margin-top: 15px;
      font-size: 0.78rem;
    }
    .contact-note {
      margin: 20px;
      transform: rotate(3deg);
      background: var(--pink);
      padding: 34px;
    }
    .contact-note h2 {
      font-size: 2.2rem;
      margin-block: 20px;
    }
    .contact-note > p:not(.hand) {
      font-size: 0.85rem;
    }
    .bottom-note {
      color: var(--ink);
      margin-top: 28px;
    }
    .contact-footnote {
      padding-bottom: 55px;
      font-size: 0.75rem;
    }
    @media (max-width: 640px) {
      .contact-note {
        margin-inline: 5px;
      }
      .contact-sheet {
        padding: 24px;
      }
    }
  `,
})
export class ContactPage {
  readonly site = SITE;
}
