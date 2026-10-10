import { Component, inject } from '@angular/core';
import { CookiePreference } from '../../layout/cookie-notice/cookie-preference';

@Component({
  selector: 'app-privacy-page',
  template: `
    <div class="page-width reveal">
      <header class="page-heading">
        <div class="eyebrow">Notiz zur Umsetzung</div>
        <h1>Datenschutz<br />&amp; Cookies.</h1>
        <p>
          Technischer Stand des lokalen MVPs. Diese Seite ist noch keine vollständige
          Datenschutzerklärung für die Veröffentlichung.
        </p>
      </header>
      <div class="privacy-content">
        <section>
          <h2>Was dieser MVP speichert</h2>
          <p>
            Das Cookie <code>evolve_notice_seen</code> speichert ausschließlich, dass du den
            Cookie-Hinweis bestätigt hast. Es gilt 180 Tage, ist auf diese Website beschränkt und
            wird mit SameSite=Lax gesetzt. Unter HTTPS wird zusätzlich Secure verwendet.
          </p>
        </section>
        <section>
          <h2>Was er nicht lädt</h2>
          <p>
            Keine optionalen Analyse- oder Werbedienste. Schriften und Logo werden lokal
            ausgeliefert. Das Dashboard verwendet ausdrücklich gekennzeichnete Testdaten und stellt
            noch keine GitLab-API-Anfragen.
          </p>
        </section>
        <section>
          <h2>Was vor Veröffentlichung offen bleibt</h2>
          <p>
            Verantwortliche, Kontaktangaben, Hosting-Verarbeitung und die spätere
            API-Authentifizierung müssen anhand der tatsächlichen Umsetzung ergänzt werden. Die
            Cookies des vorgeschalteten GitLab-Logins werden nicht durch diesen Angular-MVP
            verwaltet.
          </p>
        </section>
        <button class="button secondary" (click)="preference.reopen()">
          Cookie-Hinweis erneut anzeigen
        </button>
        @if (preference.storageFailed()) {
          <p role="status" class="mt-4 muted">
            Dein Browser hat das Bestätigungs-Cookie nicht gespeichert. Beim nächsten Laden kann der
            Hinweis erneut erscheinen.
          </p>
        }
      </div>
    </div>
  `,
  styles: `
    .privacy-content {
      max-width: 760px;
      padding-bottom: 64px;
    }
    section {
      padding-block: 28px;
      border-top: 1px solid var(--line);
    }
    h2 {
      font-size: 1.4rem;
      margin-bottom: 16px;
    }
    p {
      font-size: 0.9rem;
      color: var(--muted);
    }
    code {
      overflow-wrap: anywhere;
      color: var(--forest);
    }
  `,
})
export class PrivacyPage {
  readonly preference = inject(CookiePreference);
}
