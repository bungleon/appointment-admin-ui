import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpModule, RequestOptions} from '@angular/http';
import {AuthRequestOptions} from 'app/services/auth.request.options';
import {LoginComponent} from './login/login.component';
import {MerchantComponent} from './merchant/merchant.component';
import {UserComponent} from './user/user.component';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {ClientService} from './services/client.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {JwtParserService} from './services/jwt-parser.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MerchantComponent,
    UserComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, {
    provide: RequestOptions,
    useClass: AuthRequestOptions
  }, AuthGuard, AuthenticationService, ClientService, JwtParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
