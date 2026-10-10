import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Project Evolve · Team-Scrapbook',
    loadComponent: () => import('./pages/home/home-page').then((module) => module.HomePage),
  },
  {
    path: 'team',
    title: 'Das Team · Project Evolve',
    loadComponent: () => import('./pages/team/team-page').then((module) => module.TeamPage),
  },
  {
    path: 'contact',
    title: 'Kontakt · Project Evolve',
    loadComponent: () =>
      import('./pages/contact/contact-page').then((module) => module.ContactPage),
  },
  {
    path: 'dashboard',
    title: 'Dashboard · Project Evolve',
    loadComponent: () =>
      import('./pages/dashboard/dashboard-page').then((module) => module.DashboardPage),
  },
  {
    path: 'design',
    title: 'Design & Quellen · Project Evolve',
    loadComponent: () => import('./pages/design/design-page').then((module) => module.DesignPage),
  },
  {
    path: 'privacy',
    title: 'Datenschutz & Cookies · Project Evolve',
    loadComponent: () =>
      import('./pages/privacy/privacy-page').then((module) => module.PrivacyPage),
  },
  {
    path: '**',
    title: 'Seite nicht gefunden · Project Evolve',
    loadComponent: () =>
      import('./pages/not-found/not-found-page').then((module) => module.NotFoundPage),
  },
];
