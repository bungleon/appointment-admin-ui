import {Component} from '@angular/core';
import {AuthenticationService} from './authentication.service';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  form: any = {
    'email': '',
    'password': ''
  };
  loading = false;
  alert = '';
  auth = new AuthenticationService();

  constructor() {
  }

  login() {
    this.auth.logout();
    this.loading = true;
    this.auth.login(this.form, (e: Response) => {
      /*console.log(e);
      const ej: any = e ? e.json() : {};
      if (ej.message) {
        this.alert = ej.message;
      }*/
      this.loading = false;
    });
  }

}
