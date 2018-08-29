import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {ClientUrl} from '../services/client.path';
import {User, UserList} from './model/user';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent implements OnInit {
  public users;
  public errorMessage: string;
  public createRequest: any = {};
  public loading = false;

  constructor(private client: ClientService) {
  }

  ngOnInit() {
    this.userList();
  }

  userList() {
    this.client.post(ClientUrl.USER_LIST, {})
      .then((item: UserList) => this.users = item.users);
  }

  openModal(_modal: ModalDirective) {
    this.errorMessage = '';
    _modal.show();
  }

  editModalOpen(user: User, _modal: ModalDirective) {
    this.createRequest = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      enabled: user.enabled
    };
    _modal.show();
  }

  create(_modal: ModalDirective) {
    this.loading = true;
    _modal.hide();
    const path = this.createRequest.id ? ClientUrl.USER_UPDATE : ClientUrl.USER_CREATE;
    this.client.post(path, this.createRequest)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 100) {
          this.createRequest = {};
          this.userList();
          _modal.hide();
        } else {
          this.errorMessage = res.message;
        }
      }).catch((err: Response) => {
      this.loading = false;
      const e: any = err.json();
      this.errorMessage = e.message;
    });
  }

  deleteItem(id: string) {
    if (!confirm('Are you sure ?')) {
      return false;
    }
    this.client.post(ClientUrl.USER_DELETE, {'id': id})
      .then(res => this.userList());
  }
}
