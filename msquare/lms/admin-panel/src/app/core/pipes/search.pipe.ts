import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;

    searchTerm = searchTerm.toLowerCase();
    // console.log(items);
    return items.filter(item => {
      
      return Object.values(item).some((val:any) =>
        val.toString().toLowerCase().includes(searchTerm)
      );
    });
  }
}
