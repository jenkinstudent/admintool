import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programCourse'
})
export class ProgramCoursePipe implements PipeTransform {
  transform(item: any) {
    let totalModules = item.module.length;
    let totalModulesWatch = 0;
    for(let i =0; i<item.module.length;i++){
        if(item.module[i].isWatch){
          totalModulesWatch += 1;
        } 
    }
    let modules  = Math.round((totalModulesWatch / totalModules) * 100);
    return modules;
  }

}
