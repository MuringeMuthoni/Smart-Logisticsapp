import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopAlertPageRoutingModule } from './pop-alert-routing.module';

import { PopAlertPage } from './pop-alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopAlertPageRoutingModule
  ],
  declarations: [PopAlertPage]
})
export class PopAlertPageModule {}
