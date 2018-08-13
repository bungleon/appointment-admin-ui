import { Component } from '@angular/core';

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

  constructor() {}

  login() {
    console.log(this.form);
  }

}
