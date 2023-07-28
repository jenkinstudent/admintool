import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'time',
  pure: true
})
export class TimeformatPipe implements PipeTransform {


  transform(value: any, args?: any): any {
    if (value) {
      const seconds = moment().tz('Asia/Kolkata').diff(moment(value).tz('Asia/Kolkata'), 'seconds');
      if (seconds < 30) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: any = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }

}