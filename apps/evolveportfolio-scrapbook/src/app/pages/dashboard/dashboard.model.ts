export type DashboardState = 'ready' | 'loading' | 'empty' | 'partial' | 'error';
export type Period = 'all' | '7' | '30' | '90';
export interface ProjectSummary {
  id: string;
  name: string;
  startDate: string;
  openIssues: number;
  closedIssues: number;
  openMergeRequests: number;
  pipeline: 'success' | 'failed' | 'none';
  pipelineLabel: string;
}
export interface Activity {
  id: string;
  projectId: string;
  kind: 'commit' | 'merge-request' | 'issue';
  title: string;
  date: string;
  reference: string;
}
export interface DashboardSnapshot {
  referenceDate: string;
  projects: ProjectSummary[];
  activities: Activity[];
}

export function selectProjects(snapshot: DashboardSnapshot, projectId: string): ProjectSummary[] {
  return snapshot.projects.filter((project) => projectId === 'all' || project.id === projectId);
}

export function selectActivities(
  snapshot: DashboardSnapshot,
  projectId: string,
  period: Period,
): Activity[] {
  const projects = selectProjects(snapshot, projectId);
  if (!projects.length) return [];
  const end = Date.parse(snapshot.referenceDate);
  const start =
    period === 'all'
      ? Math.min(...projects.map((project) => Date.parse(project.startDate)))
      : end - Number(period) * 24 * 60 * 60 * 1000;
  const ids = new Set(projects.map((project) => project.id));
  return snapshot.activities
    .filter((activity) => {
      const date = Date.parse(activity.date);
      return ids.has(activity.projectId) && date >= start && date <= end;
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function summarize(projects: ProjectSummary[]) {
  return projects.reduce(
    (sum, project) => ({
      openIssues: sum.openIssues + project.openIssues,
      closedIssues: sum.closedIssues + project.closedIssues,
      openMergeRequests: sum.openMergeRequests + project.openMergeRequests,
    }),
    { openIssues: 0, closedIssues: 0, openMergeRequests: 0 },
  );
}

export function closedIssueShare(project: ProjectSummary): number {
  const total = project.openIssues + project.closedIssues;
  return total === 0 ? 0 : Math.round((project.closedIssues / total) * 100);
}
