import { Component, input, signal } from '@angular/core';

// Adapted from the original collection: source/04-people.mjs, polaroid-team-flip.
// No invented portraits or names: the front and back are explicitly layout placeholders.
@Component({
  selector: 'app-scrapbook-polaroid',
  template: `
    <button
      class="polaroid"
      [class.blue]="tone() === 'blue'"
      [attr.aria-pressed]="flipped()"
      [attr.aria-label]="
        flipped() ? caption() + ': Vorderseite zeigen' : caption() + ': Karte umdrehen'
      "
      (click)="flipped.set(!flipped())"
    >
      @if (!flipped()) {
        <div class="portrait">
          <span class="hand">{{ mark() }}</span
          ><span class="photo-label">Foto folgt</span>
        </div>
        <span class="caption hand">{{ caption() }}</span>
        <span class="hint">Profilplatzhalter · umdrehen ↶</span>
      } @else {
        <div class="back">
          <span class="eyebrow">Platz für Persönlichkeit</span>
          <span class="hand">{{ question() }}</span>
          <p>Hier stehen später echte Interessen, kleine Geschichten und freigegebene Fotos.</p>
          <span class="hint">Zurück zum Foto ↶</span>
        </div>
      }
    </button>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .polaroid {
      position: relative;
      display: block;
      width: 100%;
      padding: 12px 12px 20px;
      text-align: center;
      border: 1px solid #bdb49e;
      background: var(--surface);
      box-shadow: 3px 6px 0 #79735920;
      color: var(--ink);
      transition: translate 0.18s;
    }
    .polaroid::before {
      content: '';
      position: absolute;
      width: 74px;
      height: 25px;
      left: calc(50% - 37px);
      top: -12px;
      background: #e9c98bbb;
      transform: rotate(5deg);
      z-index: 1;
    }
    .polaroid:hover {
      translate: 0 -4px;
    }
    .portrait {
      height: 180px;
      display: grid;
      place-content: center;
      background: var(--pink);
      position: relative;
      border: 1px solid #29291f30;
    }
    .blue .portrait {
      background: var(--blue);
    }
    .portrait > .hand {
      font-size: 5.5rem;
      line-height: 1.1;
      transform: rotate(-8deg);
    }
    .photo-label {
      font-size: 0.6rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-top: 5px;
    }
    .caption {
      display: block;
      font-size: 1.7rem;
      line-height: 1.1;
      padding-block: 14px 7px;
    }
    .hint {
      display: block;
      font-size: 0.6rem;
      color: var(--muted);
    }
    .back {
      min-height: 251px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 12px 4px;
    }
    .back > .hand {
      font-size: 2.3rem;
      line-height: 1.1;
      margin: 18px 0;
    }
    .back p {
      font-size: 0.75rem;
      margin-bottom: 18px;
    }
    @media (max-width: 640px) {
      .portrait {
        height: 145px;
      }
      .caption {
        font-size: 1.4rem;
      }
      .back {
        min-height: 212px;
      }
      .polaroid {
        padding: 9px 9px 16px;
      }
    }
  `,
})
export class ScrapbookPolaroid {
  readonly mark = input('Du?');
  readonly caption = input('Ein Gesicht für Evolve.');
  readonly question = input('Was macht dich aus?');
  readonly tone = input<'pink' | 'blue'>('pink');
  readonly flipped = signal(false);
}
