import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timediff'
})
export class TimediffPipe implements PipeTransform {

  transform(value: any): any {
    var today = new Date();
    var date = new Date(value);
    var diff =(today.getTime() - date.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

}
