import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

export const TOKEN_NAME = 'TOKEN_ITSELF';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';
export const TOKEN_ROLES = 'TOKEN_ROLE';

@Injectable()
export class ClientService {
  private API_URL: string = localStorage.getItem('api');

  constructor(private http: Http, private router: Router) {
  }

  auth(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this._apiUrl() + '/auth/login', data)
        .map(res => res.json())
        .subscribe(
          (result) => resolve(result),
          (error) => reject(error)
        );
    });
  }

  post(path: string, data?: any) {
    return new Promise((resolve, reject) => {
      if (data == null) {
        data = '{}';
      }
      this.http.post(this._apiUrl() + '/api/' + path, data)
        .map(res => res.json())
        .subscribe(
          (result) => resolve(result),
          (error: Response) => {
            if (error.status === 401) {
              this.logout();
              window.location.href = '/';
            }
            reject(error);
          }
        );
    });
  }

  private loadEnv() {
    new Promise((resolve, reject) => {
      this.http.get('./tsconfig.json')
        .subscribe((result) => resolve(result), err => reject(err));
    }).then((res: Response) => {
      const json = res ? res.json() : {};
      this.API_URL = json.api ? json.api : '';
      localStorage.setItem('api', this.API_URL);
    }).catch(err => {
      console.log(err);
      this.API_URL = window.location.protocol + '//' + window.location.host.replace('admin', 'api');
      localStorage.setItem('api', this.API_URL);
    });
  }

  private _apiUrl(): string {
    if (!this.API_URL) {
      this.loadEnv();
    }
    return this.API_URL;
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(TOKEN_ROLES);
    localStorage.removeItem(TOKEN_EXPIRE);
  }

}
