import { TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard-page';

describe('DashboardPage', () => {
  async function setup() {
    const fixture = TestBed.createComponent(DashboardPage);
    await fixture.whenStable();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardPage] }).compileComponents();
  });

  it('labels all data as synthetic and shows current counts', async () => {
    const fixture = await setup();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('keine Live-Daten');
    expect(element.querySelector('.metric-value')?.textContent).toContain('11');
    expect(element.querySelectorAll('.activity-row')).toHaveLength(6);
  });

  it('updates rendered project and activity filters', async () => {
    const fixture = await setup();
    fixture.componentInstance.projectId.set('demo-vorkurs');
    fixture.componentInstance.period.set('7');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.project-progress')).toHaveLength(1);
    expect(element.querySelectorAll('.activity-row')).toHaveLength(1);
    expect(element.querySelector('.metric-value')?.textContent).toContain('2');
  });

  it('distinguishes loading, empty and failed states from zero counts', async () => {
    const fixture = await setup();
    for (const state of ['loading', 'empty', 'error'] as const) {
      fixture.componentInstance.demo.preview(state);
      await fixture.whenStable();
      expect(fixture.nativeElement.querySelector('.metrics')).toBeNull();
    }
    expect(fixture.nativeElement.textContent).toContain('Abruf fehlgeschlagen');
  });

  it('preserves successful data when one pipeline request fails', async () => {
    const fixture = await setup();
    fixture.componentInstance.demo.preview('partial');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.metrics')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.pipeline-error')).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('Erfolgreich');
  });
});
