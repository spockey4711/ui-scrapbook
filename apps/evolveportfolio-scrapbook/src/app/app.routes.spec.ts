import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('site routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('renders each page and the not-found route', async () => {
    const harness = await RouterTestingHarness.create();
    for (const [path, expected] of [
      ['/', 'Evolve'],
      ['/team', 'Commit-Namen'],
      ['/contact', 'Gespräch'],
      ['/dashboard', 'bei uns bewegt'],
      ['/design', 'Aus Papier'],
      ['/privacy', 'Cookies'],
      ['/does-not-exist', 'fehlt noch'],
    ]) {
      await harness.navigateByUrl(path);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(expected);
    }
  });
});
