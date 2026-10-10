import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrapbookCollage } from '../../shared/scrapbook-collage';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, ScrapbookCollage],
  template: `
    <section class="hero" aria-label="Project Evolve Vorstellung">
      <div class="page-width hero-inner">
        <div class="hero-meta eyebrow">
          <span>Das Team-Scrapbook / Ausgabe 01</span><span>Vorkurs · WiSe 26/27</span>
        </div>
        <div class="hero-grid">
          <div class="hero-copy reveal">
            <p class="hero-preface hand">Ein Anfang. Viele Möglichkeiten.</p>
            <h1>
              <span class="project-word">Project</span
              ><span class="evolve-word hand">Evolve<span>.</span></span>
            </h1>
            <p class="hero-description">
              Wir sind Team Evolve. Hier lernst du uns kennen und kannst unsere gemeinsame
              Entwicklung auf GitLab verfolgen.
            </p>
            <div class="hero-actions flex flex-wrap gap-3">
              <a routerLink="/team" class="button"
                >Team kennenlernen <span aria-hidden="true">↗</span></a
              >
              <a routerLink="/dashboard" class="button secondary"
                >Zum Dashboard <span aria-hidden="true">→</span></a
              >
            </div>
          </div>
          <app-scrapbook-collage />
        </div>
        <div class="hero-bottom">
          <span class="hand">Menschen. Ideen. Und die Schritte dazwischen.</span
          ><a routerLink="/" fragment="team-preview" class="eyebrow">Entdecken ↓</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.css',
})
export class Hero {}
