import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'timediff'
})
export class TimediffPipe implements PipeTransform {

  transform(value: any): any {
    const today = moment().tz('Asia/Kolkata');
    const date = moment(value).tz('Asia/Kolkata');
    const diff = today.diff(date, 'hours');
    return Math.abs(Math.round(diff));
  }

}
