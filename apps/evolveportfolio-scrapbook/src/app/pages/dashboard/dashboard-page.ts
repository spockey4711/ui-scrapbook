import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SITE } from '../../site.data';
import { DashboardDemoService } from './dashboard-demo.service';
import {
  DashboardState,
  Period,
  selectActivities,
  selectProjects,
  summarize,
} from './dashboard.model';
import { DashboardProjects } from './dashboard-projects';

@Component({
  selector: 'app-dashboard-page',
  imports: [DatePipe, DashboardProjects],
  providers: [DashboardDemoService],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  readonly demo = inject(DashboardDemoService);
  readonly site = SITE;
  readonly projectId = signal('all');
  readonly period = signal<Period>('all');
  readonly projects = computed(() => selectProjects(this.demo.snapshot, this.projectId()));
  readonly activities = computed(() =>
    selectActivities(this.demo.snapshot, this.projectId(), this.period()),
  );
  readonly totals = computed(() => summarize(this.projects()));
  readonly kinds = { commit: 'Commit', 'merge-request': 'Merge Request', issue: 'Issue' };
  readonly stateOptions: { id: DashboardState; label: string }[] = [
    { id: 'ready', label: 'Mit Daten' },
    { id: 'loading', label: 'Laden' },
    { id: 'empty', label: 'Keine Daten' },
    { id: 'partial', label: 'Teilfehler' },
    { id: 'error', label: 'Abruffehler' },
  ];

  changeProject(event: Event): void {
    this.projectId.set((event.target as HTMLSelectElement).value);
  }

  changePeriod(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (['all', '7', '30', '90'].includes(value)) this.period.set(value as Period);
  }

  changeState(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (this.stateOptions.some((option) => option.id === value))
      this.demo.preview(value as DashboardState);
  }

  projectName(id: string): string {
    return (
      this.demo.snapshot.projects.find((project) => project.id === id)?.name ??
      'Unbekanntes Projekt'
    );
  }
}
