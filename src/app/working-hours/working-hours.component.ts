import {Component, OnInit} from '@angular/core';
import {ClientUrl} from '../services/client.path';
import {MerchantList} from '../merchant/model/merchant';
import {ClientService} from '../services/client.service';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {TimePeriodFilter, WorkingHours, WorkingHoursList} from './model/working-hours';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-working-hours',
  templateUrl: 'working-hours.component.html',
})
export class WorkingHoursComponent implements OnInit {
  public merchants;
  public workingHours;
  public TimePeriodFilter = TimePeriodFilter;
  public createRequest: any = {};
  public timePeriods: any = {};
  public form = {
    fromDate: new Date(),
    toDate: new Date(),
    apiKey: ''
  };

  public dateSettings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd/MM/yyyy',
    defaultOpen: false,
    closeOnSelect: true,
  };

  constructor(private client: ClientService) {
  }

  ngOnInit() {
    this.workingHourList();
    this.createRequest.date = Date.now();
  }

  workingHourList() {
    this.client.post(ClientUrl.MERCHANT_LIST, {})
      .then((item: MerchantList) => this.merchants = item.merchantList);

    const searchJson: any = {
      fromDate: moment(Date.now()).format('YYYY-MM-DD'),
      toDate: moment(Date.now()).format('YYYY-MM-DD'),
    };

    this.client.post(ClientUrl.WORKING_HOUR_LIST, searchJson)
      .then((item: WorkingHoursList) => this.workingHours = item.workingHours);
  }

  doSearch() {
    const searchJson: any = {
      apiKey: this.form.apiKey,
      fromDate: moment(this.form.fromDate).format('YYYY-MM-DD'),
      toDate: moment(this.form.toDate).format('YYYY-MM-DD'),
    };
    this.client.post(ClientUrl.WORKING_HOUR_LIST, searchJson)
      .then((item: WorkingHoursList) => this.workingHours = item.workingHours);
  }

  onSelect(what: string, date: Date) {
    if (what === 'from') {
      this.form.fromDate = date;
    } else {
      this.form.toDate = date;
    }
  }

  onSelectInModal(date: Date) {
    this.createRequest.date = date;
  }

  editModalOpen(workingHour: WorkingHours, _modal: ModalDirective) {

    this.createRequest = {
      id: workingHour.id,
      date: workingHour.today,
      timePeriod: workingHour.timePeriod,
      apiKey: workingHour.apiKey,
      startTime: /^[\d-]+\s([\w:]+)$/g.exec(workingHour.startTime)[1],
      finishTime: /^[\d-]+\s([\w:]+)$/g.exec(workingHour.finishTime)[1],
    };
    _modal.show();
  }

  createModalOpen(_modal: ModalDirective) {
    this.createRequest = {};
    _modal.show();
  }

  createWorkingHour(_modal: ModalDirective) {
    this.loading = true;
    _modal.hide();
    const path = ClientUrl.WORKING_HOUR_UPDATE;
    this.createRequest.date = moment(this.createRequest.date).format('YYYY-MM-DD');

    console.log(this.createRequest);
    this.client.post(path, this.createRequest)
      .then((res: any) => {
        this.loading = false;
        console.log(res);
        if (res.code === 100) {
          this.createRequest = {};
          this.workingHourList();
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
}
