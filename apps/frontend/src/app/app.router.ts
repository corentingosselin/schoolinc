import { Route } from '@angular/router';
import { PageNotFoundComponent } from '@schoolinc/shared/ui/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@schoolinc/frontend/core').then((m) => m.CoreModule),
  },
  { path: '**', component: PageNotFoundComponent },
];
