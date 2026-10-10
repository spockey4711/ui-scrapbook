import { Component } from '@angular/core';

// Materials adapted from the original gallery, introduce-yourself-badge and ticket primitives.
@Component({
  selector: 'app-scrapbook-collage',
  template: `
    <div class="collage" aria-label="Momentaufnahme unseres Vorkursprojekts">
      <div class="field-note taped">
        <span class="eyebrow">Notiz für später</span>
        <p class="hand">Was wird<br />aus unseren Ideen?</p>
        <span class="scribble" aria-hidden="true"></span>
      </div>
      <div class="hello-badge">
        <div>HELLO<span>wir sind</span></div>
        <strong class="hand">Team Evolve</strong
        ><span class="hand">neugierig auf das, was kommt.</span>
      </div>
      <div class="project-ticket">
        <span class="eyebrow">Ein gemeinsamer Anfang</span
        ><strong>Vorkurs.<br />Dann Capstone.</strong>
        <div class="ticket-bottom">
          <span class="barcode" aria-hidden="true"></span><span class="hand">26 / 27</span>
        </div>
      </div>
      <span class="flower" aria-hidden="true">✳</span>
      <span class="status-stamp">Thema offen.<br />Team im Aufbau.</span>
      <p class="collage-caption hand">
        Noch kein fertiges Produkt.<br />Aber Platz für gute Ideen. ↖
      </p>
    </div>
  `,
  styleUrl: './scrapbook-collage.css',
})
export class ScrapbookCollage {}
