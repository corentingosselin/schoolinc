import { Route } from '@angular/router';
import { AuthGuard } from '@schoolinc/frontend/feature-auth/shared';

export const frontendCoreRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@schoolinc/frontend/feature-home/core').then(
        (m) => m.CoreModule
      ),
  },
  {
    path: '', 
    canActivate: [],
    loadChildren: () =>
      import('@schoolinc/frontend/feature-auth/core').then(
        (m) => m.CoreModule
      ),
  },
];
