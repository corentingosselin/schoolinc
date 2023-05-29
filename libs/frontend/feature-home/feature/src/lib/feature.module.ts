import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { featureRoutes } from './lib.routes';
import { RouterModule } from '@angular/router';
import { GradeCardComponent } from './grade/grade-card.component';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { GradeService } from '@schoolinc/frontend/feature-home/data-access';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featureRoutes),ApolloModule,
    HttpClientModule],
  exports: [HomeComponent, GradeCardComponent],
  declarations: [HomeComponent,GradeCardComponent],
  providers: [GradeService],
})
export class FeatureModule {}
