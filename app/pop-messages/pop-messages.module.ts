import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopMessagesPageRoutingModule } from './pop-messages-routing.module';

import { PopMessagesPage } from './pop-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopMessagesPageRoutingModule
  ],
  declarations: [PopMessagesPage]
})
export class PopMessagesPageModule {}
