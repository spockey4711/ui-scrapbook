import { TestBed } from '@angular/core/testing';
import { provideRouter, withHashLocation } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { Hero } from './hero';

describe('Hero on GitHub Pages', () => {
  it('keeps the discover fragment inside the home hash route', async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [provideRouter([], withHashLocation())],
    }).compileComponents();
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('.hero-bottom a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('#/#team-preview');
  });
});
