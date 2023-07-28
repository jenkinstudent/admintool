import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'program'
})
export class ProgramPipe implements PipeTransform {

  transform(item: any) {
    let totalModules = 0;
    let totalModulesWatch = 0;
    for(let i =0; i<item.courses.length;i++){
      totalModules += item.courses[i].module.length;
      for(let j=0; j<item.courses[i].module.length;j++){
        if(item.courses[i].module[j].isWatch){
          totalModulesWatch += 1;
        } 
      }
    }
    let modules  = Math.round((totalModulesWatch / totalModules) * 100);
    return modules;
  }

}
