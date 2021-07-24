import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsonSchedulesPageRoutingModule } from './reportson-schedules-routing.module';

import { ReportsonSchedulesPage } from './reportson-schedules.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsonSchedulesPageRoutingModule
  ],
  declarations: [ReportsonSchedulesPage]
})
export class ReportsonSchedulesPageModule {}
