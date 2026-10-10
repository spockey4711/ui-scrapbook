import { Component, input, output } from '@angular/core';
import { closedIssueShare, ProjectSummary } from './dashboard.model';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.html',
  styleUrl: './dashboard-projects.css',
})
export class DashboardProjects {
  readonly projects = input.required<ProjectSummary[]>();
  readonly partialError = input(false);
  readonly retry = output<void>();
  readonly closedShare = closedIssueShare;
}
