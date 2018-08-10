import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {MerchantComponent} from './merchant/merchant.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }  ,
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'merchant',
    component: MerchantComponent
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
