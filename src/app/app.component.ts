import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <a
        routerLink="/login">Login</a> |
      <a
        routerLink="/merchant">Merchant</a> |
      <a
        routerLink="/user">User</a>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {

}
