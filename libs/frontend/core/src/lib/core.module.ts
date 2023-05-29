import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { frontendCoreRoutes } from './lib.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontendCoreRoutes),

  ],
  exports: [RouterModule],
})
export class CoreModule {}
