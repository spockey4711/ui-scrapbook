import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export const NOTICE_COOKIE = 'evolve_notice_seen';

@Injectable({ providedIn: 'root' })
export class CookiePreference {
  private readonly document = inject(DOCUMENT);
  readonly visible = signal(
    !this.document.cookie.split(';').some((part) => part.trim() === `${NOTICE_COOKIE}=1`),
  );
  readonly storageFailed = signal(false);

  acknowledge(): void {
    const secure = this.document.location.protocol === 'https:' ? '; Secure' : '';
    this.document.cookie = `${NOTICE_COOKIE}=1; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
    this.storageFailed.set(
      !this.document.cookie.split(';').some((part) => part.trim() === `${NOTICE_COOKIE}=1`),
    );
    this.visible.set(false);
  }

  reopen(): void {
    this.visible.set(true);
  }
}
