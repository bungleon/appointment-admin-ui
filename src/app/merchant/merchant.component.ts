import {Component, OnInit} from '@angular/core';
import {ClientService} from '../services/client.service';
import {MerchantList} from './model/merchant';
import {ClientUrl} from '../services/client.path';

@Component({
  selector: 'app-merchant',
  templateUrl: 'merchant.component.html',
})
export class MerchantComponent implements OnInit {
  public merchants;


  constructor(private client: ClientService) {
  }

  ngOnInit() {
    this.merchantList();
  }

  merchantList() {
    this.client.post(ClientUrl.MERCHANT_LIST, {})
      .then((item: MerchantList) => this.merchants = item.merchantList);
  }
}
