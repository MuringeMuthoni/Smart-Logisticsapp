import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsonFuelPage } from './reportson-fuel.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsonFuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsonFuelPageRoutingModule {}
