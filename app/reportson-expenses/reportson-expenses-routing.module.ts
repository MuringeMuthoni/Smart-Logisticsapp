import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsonExpensesPage } from './reportson-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsonExpensesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsonExpensesPageRoutingModule {}
