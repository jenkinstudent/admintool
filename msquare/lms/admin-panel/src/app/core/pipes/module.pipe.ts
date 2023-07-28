import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'module'
})
export class ModulePipe implements PipeTransform {

  transform(item: any) {
    let totalModulesWatch = 0;
    if(item.isWatch){
      totalModulesWatch += 1;
    } 
    let modules  = (totalModulesWatch / 1) * 100;
    return modules;
  }


}
