import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders navigation, content landmark and footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('nav')?.textContent).toContain('Dashboard');
    expect(element.querySelector('#main-content')).toBeTruthy();
    expect(element.querySelector('footer')?.textContent).toContain('Project Evolve');
    expect(element.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
  });

  it('focuses the current content without navigating to the base route', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    document.body.append(element);
    const main = element.querySelector<HTMLElement>('#main-content')!;
    main.scrollIntoView = vi.fn();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    element.querySelector('.skip-link')!.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(main);
    expect(main.scrollIntoView).toHaveBeenCalledOnce();
    element.remove();
  });
});
