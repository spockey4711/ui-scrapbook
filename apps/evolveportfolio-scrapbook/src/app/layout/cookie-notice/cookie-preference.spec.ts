import { TestBed } from '@angular/core/testing';
import { CookiePreference, NOTICE_COOKIE } from './cookie-preference';

describe('CookiePreference', () => {
  beforeEach(() => {
    document.cookie = `${NOTICE_COOKIE}=; Max-Age=0; Path=/`;
    TestBed.configureTestingModule({});
  });
  afterEach(() => {
    document.cookie = `${NOTICE_COOKIE}=; Max-Age=0; Path=/`;
  });

  it('shows the notice on first visit and remembers acknowledgment', () => {
    const preference = TestBed.inject(CookiePreference);
    expect(preference.visible()).toBe(true);
    preference.acknowledge();
    expect(preference.visible()).toBe(false);
    expect(document.cookie).toContain(`${NOTICE_COOKIE}=1`);
    TestBed.resetTestingModule();
    expect(TestBed.inject(CookiePreference).visible()).toBe(false);
  });

  it('can reopen the notice without deleting the acknowledgment', () => {
    const preference = TestBed.inject(CookiePreference);
    preference.acknowledge();
    preference.reopen();
    expect(preference.visible()).toBe(true);
    expect(document.cookie).toContain(`${NOTICE_COOKIE}=1`);
  });
});
