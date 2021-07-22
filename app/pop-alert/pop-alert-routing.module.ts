import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopAlertPage } from './pop-alert.page';

const routes: Routes = [
  {
    path: '',
    component: PopAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopAlertPageRoutingModule {}
