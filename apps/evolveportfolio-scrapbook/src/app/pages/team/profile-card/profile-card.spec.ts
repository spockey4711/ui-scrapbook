import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCard } from './profile-card';

describe('ProfileCard', () => {
  let component: ProfileCard;
  let fixture: ComponentFixture<ProfileCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens and closes a personal note without inventing a biography', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;
    const note = element.querySelector<HTMLElement>('.personal-note')!;
    expect(note.hidden).toBe(true);
    expect(button.getAttribute('aria-controls')).toBe(note.id);
    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(note.hidden).toBe(false);
    expect(note.textContent).toContain('Platzhalter');
    button.click();
    await fixture.whenStable();
    expect(note.hidden).toBe(true);
  });
});
