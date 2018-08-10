import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  private pattern = '<span class="badge badge-{1}">{2}</span>';

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this._statusInfo(value);
  }

  _statusInfo(status: string) {
    const cls: any = {
      'STARTED': 'info',
      'WAITING': 'warning',
      'CANCELED': 'danger',
      'SUCCESS': 'success'
    };

    const html = this.pattern
      .replace('{1}', cls[status])
      .replace('{2}', status);

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
