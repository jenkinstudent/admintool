import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstletter'
})
export class FirstletterPipe implements PipeTransform {

  transform(value: any) {
    var matches = value.match(/\b(\w)/g); // ['J','S','O','N']
    var acronym = matches.join(''); // JSON
    return acronym;
  }

}
