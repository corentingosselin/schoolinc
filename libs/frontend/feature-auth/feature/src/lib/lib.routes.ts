import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';


export const featureRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  { path: 'login',  component: LoginComponent },
];
