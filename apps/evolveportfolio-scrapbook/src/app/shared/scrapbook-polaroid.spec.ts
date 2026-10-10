import { TestBed } from '@angular/core/testing';
import { ScrapbookPolaroid } from './scrapbook-polaroid';

describe('ScrapbookPolaroid', () => {
  it('labels the placeholder and toggles both sides with a native button', async () => {
    const fixture = TestBed.createComponent(ScrapbookPolaroid);
    fixture.componentRef.setInput('caption', 'Deine Perspektive.');
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;
    expect(element.textContent).toContain('Profilplatzhalter');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.getAttribute('aria-label')).toContain('Karte umdrehen');
    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(element.textContent).toContain('Was macht dich aus?');
    expect(element.textContent).toContain('freigegebene Fotos');
    expect(button.getAttribute('aria-label')).toContain('Vorderseite zeigen');
    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(element.textContent).toContain('Foto folgt');
  });
});
