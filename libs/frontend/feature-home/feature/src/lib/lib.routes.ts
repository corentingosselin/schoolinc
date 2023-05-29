import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const featureRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  { path: 'home',  component: HomeComponent },
];
