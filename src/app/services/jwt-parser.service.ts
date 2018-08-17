import {Injectable} from '@angular/core';
import {Jwt} from './jwt';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class JwtParserService {

  constructor(private auth: AuthenticationService) {
  }

  parse(): Jwt {
    const token = this.auth.getToken();
    if (!token) {
      return null;
    }
    const data = token.split('.')[1];

    const decode = this._b64DecodeUnicode(data);
    return JSON.parse(decode);
  }

  _b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

}
