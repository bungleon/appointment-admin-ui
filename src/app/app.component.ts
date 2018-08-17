import {Component} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {Jwt} from './services/jwt';
import {JwtParserService} from './services/jwt-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: 'layout.html'
})
export class AppComponent {
  admin: boolean;
  jwt: Jwt;

  constructor(private auth: AuthenticationService, private router: Router, private  parser: JwtParserService) {
    if (this.auth.getRole()) {
      this.admin = this.auth.getRole().includes('ADMIN');
    } else {
      this.admin = false;
    }
    this.jwt = this.parser.parse();
  }

  logout() {
    this.auth.logout();
    window.location.href = '/';
  }
}
