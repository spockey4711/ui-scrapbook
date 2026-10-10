import { Injectable, OnDestroy, signal } from '@angular/core';
import { DEMO_SNAPSHOT } from './dashboard-demo.data';
import { DashboardState } from './dashboard.model';

@Injectable()
export class DashboardDemoService implements OnDestroy {
  readonly snapshot = DEMO_SNAPSHOT;
  readonly state = signal<DashboardState>('ready');
  readonly loadedAt = signal(new Date());
  private timer?: ReturnType<typeof setTimeout>;

  preview(state: DashboardState): void {
    clearTimeout(this.timer);
    this.state.set(state);
  }

  reload(): void {
    clearTimeout(this.timer);
    this.state.set('loading');
    // Simulates asynchronous loading only. No API request or credential is used.
    this.timer = setTimeout(() => {
      this.loadedAt.set(new Date());
      this.state.set('ready');
    }, 450);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
