import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ninwords'
})
export class NinwordsPipe implements PipeTransform {

  transform(value: any) {
    let val:any;
    if (value >= 10000000) {
      val = (value / 10000000).toFixed(2) + ' Cr';
    } else if (value >= 100000) {
      val = (value / 100000).toFixed(2) + ' L';
    } else if (value >= 1000) {
      val = (value / 1000).toFixed(2) + ' K';
    } else if(value == 0){
      val = 0;
    }else if (value < 1000) {
      val = value;
    }
    return val;
  }

}
