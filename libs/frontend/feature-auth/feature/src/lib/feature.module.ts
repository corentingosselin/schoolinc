import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { featureRoutes } from './lib.routes';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloModule } from 'apollo-angular';
import { LoginService } from '@schoolinc/frontend/feature-auth/data-access';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(featureRoutes),
    ApolloModule,
    HttpClientModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [LoginService],
})
export class FeatureModule {}
