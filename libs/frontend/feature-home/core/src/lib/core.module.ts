import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeCoreRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(HomeCoreRoutes)],
})
export class CoreModule {}
