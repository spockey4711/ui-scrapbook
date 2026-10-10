import { DEMO_SNAPSHOT } from './dashboard-demo.data';
import { closedIssueShare, selectActivities, selectProjects, summarize } from './dashboard.model';

describe('dashboard projections', () => {
  it('selects all projects or a single repository', () => {
    expect(selectProjects(DEMO_SNAPSHOT, 'all')).toHaveLength(2);
    expect(selectProjects(DEMO_SNAPSHOT, 'demo-vorkurs')).toHaveLength(1);
    expect(selectProjects(DEMO_SNAPSHOT, 'unknown')).toEqual([]);
  });

  it('filters recent activity without changing current issue totals', () => {
    expect(selectActivities(DEMO_SNAPSHOT, 'all', '7')).toHaveLength(3);
    expect(selectActivities(DEMO_SNAPSHOT, 'all', '30')).toHaveLength(4);
    expect(selectActivities(DEMO_SNAPSHOT, 'all', '90')).toHaveLength(5);
    expect(selectActivities(DEMO_SNAPSHOT, 'all', 'all')).toHaveLength(6);
    expect(summarize(selectProjects(DEMO_SNAPSHOT, 'all')).openIssues).toBe(11);
  });

  it('combines repository and period filters', () => {
    expect(selectActivities(DEMO_SNAPSHOT, 'demo-vorkurs', '7')).toHaveLength(1);
    expect(selectActivities(DEMO_SNAPSHOT, 'demo-vorkurs', 'all')).toHaveLength(2);
    expect(selectActivities(DEMO_SNAPSHOT, 'unknown', 'all')).toEqual([]);
  });

  it('excludes activity before project start and after the reference date', () => {
    const snapshot = {
      ...DEMO_SNAPSHOT,
      activities: [
        { ...DEMO_SNAPSHOT.activities[0], date: '2020-01-01T00:00:00Z' },
        { ...DEMO_SNAPSHOT.activities[0], date: '2028-01-01T00:00:00Z' },
      ],
    };
    expect(selectActivities(snapshot, 'all', 'all')).toEqual([]);
  });

  it('sums current counts only for selected projects', () => {
    expect(summarize(selectProjects(DEMO_SNAPSHOT, 'demo-vorkurs'))).toEqual({
      openIssues: 2,
      closedIssues: 18,
      openMergeRequests: 1,
    });
    expect(summarize([])).toEqual({ openIssues: 0, closedIssues: 0, openMergeRequests: 0 });
  });

  it('handles a project without issues without dividing by zero', () => {
    expect(closedIssueShare({ ...DEMO_SNAPSHOT.projects[0], openIssues: 0, closedIssues: 0 })).toBe(
      0,
    );
    expect(closedIssueShare(DEMO_SNAPSHOT.projects[0])).toBe(90);
  });
});
