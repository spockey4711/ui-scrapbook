import { DashboardSnapshot } from './dashboard.model';

// Entirely synthetic fixtures. These are never presented as live GitLab data.
export const DEMO_SNAPSHOT: DashboardSnapshot = {
  referenceDate: '2027-01-15T23:59:59Z',
  projects: [
    {
      id: 'demo-vorkurs',
      name: 'Vorkurs · Website',
      startDate: '2026-10-01T00:00:00Z',
      openIssues: 2,
      closedIssues: 18,
      openMergeRequests: 1,
      pipeline: 'success',
      pipelineLabel: 'Build & Tests erfolgreich',
    },
    {
      id: 'demo-capstone',
      name: 'Capstone · Vorschau',
      startDate: '2026-10-19T00:00:00Z',
      openIssues: 9,
      closedIssues: 24,
      openMergeRequests: 3,
      pipeline: 'failed',
      pipelineLabel: 'Ein Test ist fehlgeschlagen',
    },
  ],
  activities: [
    {
      id: 'activity-1',
      projectId: 'demo-capstone',
      kind: 'merge-request',
      title: 'Neue Ansicht zur gemeinsamen Prüfung bereit',
      date: '2027-01-15T10:30:00Z',
      reference: '!12',
    },
    {
      id: 'activity-2',
      projectId: 'demo-capstone',
      kind: 'commit',
      title: 'Leere Zustände verständlicher darstellen',
      date: '2027-01-14T14:10:00Z',
      reference: 'a3c17f2',
    },
    {
      id: 'activity-3',
      projectId: 'demo-vorkurs',
      kind: 'issue',
      title: 'Dokumentation der Website aktualisieren',
      date: '2027-01-11T09:00:00Z',
      reference: '#21',
    },
    {
      id: 'activity-4',
      projectId: 'demo-capstone',
      kind: 'commit',
      title: 'Tests für die Navigation ergänzen',
      date: '2026-12-28T16:45:00Z',
      reference: 'b9e204a',
    },
    {
      id: 'activity-5',
      projectId: 'demo-capstone',
      kind: 'issue',
      title: 'Ersten gemeinsamen Meilenstein abschließen',
      date: '2026-11-20T11:00:00Z',
      reference: '#8',
    },
    {
      id: 'activity-6',
      projectId: 'demo-vorkurs',
      kind: 'merge-request',
      title: 'Team-Notebook zur Abgabe vorbereiten',
      date: '2026-10-15T12:00:00Z',
      reference: '!4',
    },
  ],
};
