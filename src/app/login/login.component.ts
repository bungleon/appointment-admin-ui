import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';


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

  constructor(private auth: AuthenticationService) {
    this.auth.logout();
  }

  login() {
    this.auth.logout();
    this.loading = true;
    this.auth.login(this.form, (e: Response) => {
      const ej: any = e ? e.json() : {};
      if (ej.message) {
        this.alert = ej.message;
      }
      this.loading = false;
    });
  }

}
