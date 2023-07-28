import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'course'
})
export class CoursePipe implements PipeTransform {

  transform(item: any) {
    let totalModules = item.modules.length;
    let totalModulesWatch = 0;
    for(let i =0; i<item.modules.length;i++){
        if(item.modules[i].isWatch){
          totalModulesWatch += 1;
        } 
    }
    let modules  = (totalModulesWatch / totalModules) * 100;
    return modules;
  }

}
