import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsonSchedulesPage } from './reportson-schedules.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsonSchedulesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsonSchedulesPageRoutingModule {}
