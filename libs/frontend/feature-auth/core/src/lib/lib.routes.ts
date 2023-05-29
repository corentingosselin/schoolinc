import { Route } from '@angular/router';

export const CoreRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    loadChildren: () =>
      import('@schoolinc/frontend/feature-auth/feature').then(
        (m) => m.FeatureModule
      ),
  },
];
