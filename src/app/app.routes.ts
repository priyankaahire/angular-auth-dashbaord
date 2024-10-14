import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';  // Your auth guard file
import { NotFoundComponent } from './auth/not-found/not-found.component';  // A generic 404 component
import { PreDashboardComponent } from './dashboard/preparer/pre-dashboard/pre-dashboard.component';
import { RevDashboardComponent } from './dashboard/reviewer/rev-dashboard/rev-dashboard.component';
import { ReviewerComponent } from './dashboard/reviewer/reviewer.component';
import { PreparerComponent } from './dashboard/preparer/preparer.component';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./auth/login/login.component').then((m) => m.LoginComponent),
  // },
  {
    path: 'review',
    component: ReviewerComponent,
    canActivate: [authGuard],
    data: { roles: ['reviewer'] },
    children: [
      { path: 'sub1', component: PreDashboardComponent },
    ]
  },
  {
    path: 'preparer',
    component: PreparerComponent,
    canActivate: [authGuard],
    data: { roles: ['preparer'] },
    children: [
      { path: 'sub1', component: RevDashboardComponent },
    ]
  },
  { path: '', redirectTo: '/review', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./auth/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  
];

