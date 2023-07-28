import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any {
    if(!items)return null;
    if(!term)return items;
    term = term.toLowerCase();
    

      return items.filter(function(data){
          return JSON.stringify(data).toLowerCase().includes(term);
      });
  }

}
