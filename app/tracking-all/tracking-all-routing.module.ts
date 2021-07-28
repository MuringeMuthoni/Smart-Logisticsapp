import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingAllPage } from './tracking-all.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingAllPageRoutingModule {}
