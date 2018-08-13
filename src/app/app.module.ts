import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpModule, RequestOptions} from '@angular/http';
import {AuthRequestOptions} from 'app/services/auth.request.options';
import { LoginComponent } from './login/login.component';
import { MerchantComponent } from './merchant/merchant.component';
import { UserComponent } from './user/user.component';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MerchantComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, {
    provide: RequestOptions,
    useClass: AuthRequestOptions
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
