import {NgModule} from '@angular/core';


import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {MerchantComponent} from './merchant/merchant.component';
import {AuthGuard} from './services/auth-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WorkingHoursComponent} from './working-hours/working-hours.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'merchant',
    component: MerchantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'working-hours',
    component: WorkingHoursComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
