import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { CookieNotice } from './layout/cookie-notice/cookie-notice';

@Component({
  imports: [RouterOutlet, Header, Footer, CookieNotice],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);

  skipToContent(event: Event): void {
    event.preventDefault();
    const content = this.document.getElementById('main-content');
    content?.focus();
    content?.scrollIntoView();
  }
}
