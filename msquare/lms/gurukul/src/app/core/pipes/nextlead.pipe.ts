import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'nextlead'
})
export class NextleadPipe implements PipeTransform {

  constructor(public http:HttpClient){

  }
  transform(value:any){

    

    
  }

}
