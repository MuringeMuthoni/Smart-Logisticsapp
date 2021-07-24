import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsonExpensesPageRoutingModule } from './reportson-expenses-routing.module';

import { ReportsonExpensesPage } from './reportson-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsonExpensesPageRoutingModule
  ],
  declarations: [ReportsonExpensesPage]
})
export class ReportsonExpensesPageModule {}
