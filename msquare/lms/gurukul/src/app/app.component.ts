import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fusion Gurukul';
  token = "";
  version = "";
  appversion = "";
  latest = false;
  isNativePlatForm = false;
  
  constructor(public translate:TranslateService,public apiS:ApiService){
    if(Capacitor.isNativePlatform()){
      this.isNativePlatForm = true;
      App.getInfo().then(res=>{
        this.version = res.version;
      })
      this.apiS.getAllAppVersion().subscribe(data =>{
        if(data.data.length > 0){
          this.appversion = data.data[0]?.version;
          this.latest = data.data[0]?.isLatest
        }
      })
    }

    
    
    translate.addLangs(['English - EN', 'हिंदी - HI','தமிழ் - TA']);  
    let lang :any;
    lang=  localStorage.getItem("language");
    if(lang !== ''){
      translate.setDefaultLang(lang); 
    }else{
      translate.setDefaultLang('English - EN'); 
    }

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log("error push notification");
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log(token);
        this.token = token.value;
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

}
