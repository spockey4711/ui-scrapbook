import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookiePreference } from './cookie-preference';

@Component({
  selector: 'app-cookie-notice',
  imports: [RouterLink],
  template: `
    @if (preference.visible()) {
      <aside class="cookie-note" aria-labelledby="cookie-title">
        <div class="flex items-center justify-between gap-4">
          <h2 id="cookie-title" class="hand">Eine kleine Randnotiz.</h2>
          <span class="eyebrow">Cookies</span>
        </div>
        <p>
          Dieser MVP nutzt ein Cookie, um diese Bestätigung für 180 Tage zu merken. Kein optionales
          Tracking.
        </p>
        <div class="flex flex-wrap items-center justify-between gap-3 mt-4">
          <a routerLink="/privacy" class="text-link">Details ansehen</a>
          <button class="button" (click)="preference.acknowledge()">
            Verstanden <span aria-hidden="true">✓</span>
          </button>
        </div>
      </aside>
    }
  `,
  styles: `
    .cookie-note {
      position: fixed;
      z-index: 30;
      right: 24px;
      bottom: 24px;
      width: min(450px, calc(100% - 36px));
      background: var(--surface);
      border: 1px solid var(--ink);
      border-top: 8px solid var(--pink);
      padding: 22px 26px;
      box-shadow: 0 8px 30px #28322018;
    }
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 12px;
    }
    .button {
      padding: 10px 16px;
      font-size: 0.78rem;
    }
    @media (max-width: 640px) {
      .cookie-note {
        right: 18px;
        bottom: 18px;
        padding: 18px;
      }
    }
  `,
})
export class CookieNotice {
  readonly preference = inject(CookiePreference);
}
