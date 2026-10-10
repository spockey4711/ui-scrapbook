import { TestBed } from '@angular/core/testing';
import { DEMO_SNAPSHOT } from './dashboard-demo.data';
import { DashboardProjects } from './dashboard-projects';

describe('DashboardProjects', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardProjects] }).compileComponents();
  });

  it('distinguishes missing pipeline from failed pipeline and request errors', async () => {
    const fixture = TestBed.createComponent(DashboardProjects);
    fixture.componentRef.setInput('projects', [
      { ...DEMO_SNAPSHOT.projects[0], pipeline: 'none', pipelineLabel: 'Noch kein Lauf vorhanden' },
    ]);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Keine Pipeline vorhanden');
    expect(fixture.nativeElement.querySelector('.pipeline-error')).toBeNull();
    expect(fixture.nativeElement.querySelector('.status-tag.failed')).toBeNull();
  });
});
