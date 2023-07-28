import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programModule'
})
export class ProgramModulePipe implements PipeTransform {

  transform(item: any) {
    let totalModules = 1;
    let totalModulesWatch = 0;
    if(item.isWatch){
      totalModulesWatch += 1;
    } 
    let modules  = (totalModulesWatch / totalModules) * 100;
    return modules;
  }

}
