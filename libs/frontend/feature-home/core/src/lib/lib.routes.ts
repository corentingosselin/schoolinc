import { Route } from '@angular/router';

export const HomeCoreRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    loadChildren: () =>
      import('@schoolinc/frontend/feature-home/feature').then(
        (m) => m.FeatureModule
      ),
  },
];
