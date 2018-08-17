import {Injectable} from '@angular/core';
import {ClientService} from './client.service';
import {Response} from '@angular/http';

export const TOKEN_NAME = 'TOKEN_ITSELF';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';
export const TOKEN_ROLES = 'TOKEN_ROLE';

interface UserToken {
  token: string;
  expireTime: string;
  roles: string[];
}

@Injectable()
export class AuthenticationService {
  constructor(private client: ClientService) {
  }

  login(data: any, errorCallback) {
    this.client.auth(data)
      .then((result: UserToken) => this._loginAction(result))
      .catch((err: Response) => errorCallback(err));
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(TOKEN_ROLES);
    localStorage.removeItem(TOKEN_EXPIRE);
  }

  loggedIn() {
    return localStorage.getItem(TOKEN_NAME) != null;
  }

  _loginAction(result: UserToken) {
    if (result && result.token) {
      localStorage.setItem(TOKEN_NAME, result.token);
      localStorage.setItem(TOKEN_EXPIRE, result.expireTime);
      localStorage.setItem(TOKEN_ROLES, JSON.stringify(result.roles));
      console.log(result);
      window.location.href = '/';
    }
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  getDatas() {
    return 'TOKEN ' + localStorage.getItem(TOKEN_NAME) +
      '\nEXPIRE TIME ' + localStorage.getItem(TOKEN_EXPIRE) +
      '\nROLE ' + localStorage.getItem(TOKEN_ROLES);
  }

  getRole() {
    return localStorage.getItem(TOKEN_ROLES);
  }
}
