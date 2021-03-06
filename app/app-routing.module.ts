import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },  
  {
    path: 'default',
    loadChildren: () => import('./default/default.module').then( m => m.DefaultPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'tracking-dashboard',
    loadChildren: () => import('./tracking-dashboard/tracking-dashboard.module').then( m => m.TrackingDashboardPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tab-account',
    loadChildren: () => import('./tab-account/tab-account.module').then( m => m.TabAccountPageModule)
  },
  {
    path: 'tab-search',
    loadChildren: () => import('./tab-search/tab-search.module').then( m => m.TabSearchPageModule)
  },
  {
    path: 'tab-settings',
    loadChildren: () => import('./tab-settings/tab-settings.module').then( m => m.TabSettingsPageModule)
  },
  {
    path: 'vehicle-list',
    loadChildren: () => import('./vehicle-list/vehicle-list.module').then( m => m.VehicleListPageModule)
  },
  {
    path: 'fuel',
    loadChildren: () => import('./fuel/fuel.module').then( m => m.FuelPageModule)
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./scheduler/scheduler.module').then( m => m.SchedulerPageModule)
  },
  {
    path: 'expenses',
    loadChildren: () => import('./expenses/expenses.module').then( m => m.ExpensesPageModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'pop-messages',
    loadChildren: () => import('./pop-messages/pop-messages.module').then( m => m.PopMessagesPageModule)
  },  {
    path: 'pop-alert',
    loadChildren: () => import('./pop-alert/pop-alert.module').then( m => m.PopAlertPageModule)
  },
  {
    path: 'testpage',
    loadChildren: () => import('./testpage/testpage.module').then( m => m.TestpagePageModule)
  },
  {
    path: 'reportson-fuel',
    loadChildren: () => import('./reportson-fuel/reportson-fuel.module').then( m => m.ReportsonFuelPageModule)
  },
  {
    path: 'reportson-expenses',
    loadChildren: () => import('./reportson-expenses/reportson-expenses.module').then( m => m.ReportsonExpensesPageModule)
  },
  {
    path: 'reportson-schedules',
    loadChildren: () => import('./reportson-schedules/reportson-schedules.module').then( m => m.ReportsonSchedulesPageModule)
  },
  {
    path: 'tracking-all',
    loadChildren: () => import('./tracking-all/tracking-all.module').then( m => m.TrackingAllPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
