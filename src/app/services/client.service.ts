import { Injectable } from '@angular/core';
import {Http, RequestMethod, Response, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  private API_URL: string = localStorage.getItem('api');

  constructor(private http: Http, private router: Router) { }

  post(path: string, data?: any) {
    return new Promise((resolve, reject) => {
      if (data == null) {
        data = '{}';
      }
      this.http.post(this._apiUrl() + '/api/v1/' + path, data)
        .map(res => res.json())
        .subscribe(
          (result) => resolve(result),
          (error: Response) => {
            if (error.status === 401) {
              this.router.navigateByUrl('/auth/login');
            }
            reject(error);
          }
        );
    });
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

  download(id: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this._apiUrl() + '/export/caps/' + id, {}, {responseType: ResponseContentType.Blob})
        .map(x => x.blob())
        .subscribe(
          (result: Blob) => resolve(result),
          (error: Response) => {
            if (error.status === 401) {
              this.router.navigateByUrl('/auth/login');
            }
            reject(error);
          }
        );
    });
  }

  loadEnv() {
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
}
