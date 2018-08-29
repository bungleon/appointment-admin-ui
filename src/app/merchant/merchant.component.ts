import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {Merchant, MerchantList} from './model/merchant';
import {ClientUrl} from '../services/client.path';
import {ModalSettings} from '../shared/modal-settings';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-merchant',
  templateUrl: 'merchant.component.html',
})
export class MerchantComponent implements OnInit {
  public merchants;
  public modalSettings = ModalSettings;
  public loading = false;
  public errorMessage: string;
  public createRequest: any = {};
  private keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  public apiKey: string;
  public secretKey: string;
  public id: string;

  constructor(private client: ClientService) {
  }

  ngOnInit() {
    this.merchantList();
  }

  merchantList() {
    this.client.post(ClientUrl.MERCHANT_LIST, {})
      .then((item: MerchantList) => this.merchants = item.merchantList);
  }

  openModal(_modal: ModalDirective) {
    this.errorMessage = '';
    this.generateKey();
    this.createRequest['apiKey'] = this.apiKey;
    this.createRequest['secretKey'] = this.secretKey;
    _modal.show();
  }

  create(_modal: ModalDirective) {
    this.loading = true;
    _modal.hide();
    const path = this.createRequest.id ? ClientUrl.MERCHANT_UPDATE : ClientUrl.MERCHANT_CREATE;
    if (this.id) {
      this.createRequest['id'] = this.id;
    }
    this.client.post(path, this.createRequest)
      .then((res: any) => {
        this.loading = false;
        if (res.code === 100) {
          this.createRequest = {};
          this.merchantList();
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

  editModalOpen(merchant: Merchant, _modal: ModalDirective) {
    this.createRequest = {
      name: merchant.name,
      ipnUrl: merchant.ipnUrl,
      apiKey: merchant.apiKey,
      secretKey: merchant.secretKey,
      workingRange: merchant.workingRange,
      enabled: merchant.enabled,
      id: merchant.id
    };
    _modal.show();
  }

  deleteItem(id: string) {
    if (!confirm('Are you sure ?')) {
      return false;
    }
    this.client.post(ClientUrl.MERCHANT_DELETE, {'id': id})
      .then(res => this.merchantList());
  }

  generateKey() {
    this.apiKey = '';
    this.secretKey = '';
    for (let i = 0; i < 35; i++) {
      this.apiKey += this.keys.charAt(Math.floor(Math.random() * this.keys.length));
    }

    for (let i = 0; i < 40; i++) {
      this.secretKey += this.keys.charAt(Math.floor(Math.random() * this.keys.length));
    }
  }
}
