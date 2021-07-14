import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingDashboardPageRoutingModule } from './tracking-dashboard-routing.module';

import { TrackingDashboardPage } from './tracking-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingDashboardPageRoutingModule
  ],
  declarations: [TrackingDashboardPage]
})
export class TrackingDashboardPageModule {}
