import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tracking-dashboard',
        loadChildren: () => import('../tracking-dashboard/tracking-dashboard.module').then(m => m.TrackingDashboardPageModule)
      },
      {
        path: 'tab-search',
        loadChildren: () => import('../tab-search/tab-search.module').then(m => m.TabSearchPageModule)
      },       
      {
        path: 'tab-settings',
        loadChildren: () => import('../tab-settings/tab-settings.module').then(m => m.TabSettingsPageModule)
      },
      {
        path: 'tab-account',
        loadChildren: () => import('../tab-account/tab-account.module').then(m => m.TabAccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tracking-dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
