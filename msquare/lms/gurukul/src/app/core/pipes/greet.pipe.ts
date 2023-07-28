import {
  Pipe,
  PipeTransform
} from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'greet'
})
export class GreetPipe implements PipeTransform {

  transform(string:any): unknown {
    const myDate = moment().tz('Asia/Kolkata');
    const hrs = myDate.hour();

    var greet;

    if (hrs < 12)
      greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      greet = 'Good Evening';

    return greet;
  }

}