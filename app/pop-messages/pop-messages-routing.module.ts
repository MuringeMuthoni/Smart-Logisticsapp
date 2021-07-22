import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopMessagesPage } from './pop-messages.page';

const routes: Routes = [
  {
    path: '',
    component: PopMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopMessagesPageRoutingModule {}
