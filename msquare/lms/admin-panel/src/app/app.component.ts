import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fusion Gurukul';
  token = "";
  
  constructor(public translate:TranslateService){
    translate.addLangs(['English - EN', 'हिंदी - HI','தமிழ் - TA']);  
    let lang :any;
    lang=  localStorage.getItem("language");
    if(lang !== ''){
      translate.setDefaultLang(lang); 
    }else{
      translate.setDefaultLang('English - EN'); 
    }

    
  }

}
