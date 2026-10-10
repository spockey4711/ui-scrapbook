import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DashboardDemoService } from './dashboard-demo.service';

describe('DashboardDemoService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [DashboardDemoService] });
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
  });

  it('reloads asynchronously and updates its local load timestamp', () => {
    const service = TestBed.inject(DashboardDemoService);
    const timestamp = service.loadedAt().getTime();
    service.reload();
    expect(service.state()).toBe('loading');
    vi.advanceTimersByTime(450);
    expect(service.state()).toBe('ready');
    expect(service.loadedAt().getTime()).toBeGreaterThan(timestamp);
  });

  it('does not overwrite a selected preview with an earlier pending reload', () => {
    const service = TestBed.inject(DashboardDemoService);
    service.reload();
    service.preview('error');
    vi.advanceTimersByTime(1000);
    expect(service.state()).toBe('error');
  });

  it('cancels pending updates when destroyed', () => {
    const service = TestBed.inject(DashboardDemoService);
    service.reload();
    service.ngOnDestroy();
    vi.advanceTimersByTime(1000);
    expect(service.state()).toBe('loading');
  });
});
