import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {ClientService} from './client.service';
import {Router} from '@angular/router';

interface UserToken {
  token: string,
  expireTime: string,
  roles: string[]
}

export const TOKEN_NAME = 'jwt_token';
export const TOKEN_EXPIRE = 'jwt_token_expire';
export const TOKEN_ROLES = 'jwt_token_roles';

@Injectable()
export class AuthenticationService {
  constructor(private client: ClientService, private router: Router) { }

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

  loggedIn(): boolean {
    return localStorage.getItem(TOKEN_NAME) != null;
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  _loginAction(result: UserToken) {
    if (result && result.token) {
      localStorage.setItem(TOKEN_NAME, result.token);
      localStorage.setItem(TOKEN_EXPIRE, result.expireTime);
      localStorage.setItem(TOKEN_ROLES, JSON.stringify(result.roles));
      window.location.href = '/';
    }
  }
}
