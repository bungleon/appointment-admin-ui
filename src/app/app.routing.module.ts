import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {MerchantComponent} from './merchant/merchant.component';
import {AuthGuard} from './login/auth-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }  ,
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'merchant',
    component: MerchantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
