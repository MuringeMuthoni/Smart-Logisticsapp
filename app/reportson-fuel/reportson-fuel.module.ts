import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsonFuelPageRoutingModule } from './reportson-fuel-routing.module';

import { ReportsonFuelPage } from './reportson-fuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsonFuelPageRoutingModule
  ],
  declarations: [ReportsonFuelPage]
})
export class ReportsonFuelPageModule {}
