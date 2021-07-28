import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingAllPageRoutingModule } from './tracking-all-routing.module';

import { TrackingAllPage } from './tracking-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingAllPageRoutingModule
  ],
  declarations: [TrackingAllPage]
})
export class TrackingAllPageModule {}
