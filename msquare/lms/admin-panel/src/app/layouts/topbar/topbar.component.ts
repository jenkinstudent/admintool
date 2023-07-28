import { Component, OnInit, EventEmitter, Output, Inject, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

//Logout
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

// Language
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @ViewChild("filtetcontent") filtetcontent!:TemplateRef<any>;
  title = "";
  component = "";
  
  element: any;
  mode: string | undefined;
  @Output() mobileMenuButtonClicked = new EventEmitter();
  search = "";
  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  designation:any="";
  profilephoto:any="";
  css:boolean=false;
  css2:boolean=false;

  baseURL = environment.baseURL;

  greetText = "";
  val = "";
  

  public searchProgram: any = [];
  public searchCourse: any = [];
  public searchModule: any = [];
  public searchQuiz: any = [];
  public searchLearningActivity:any = [];
  
  currentLang = "";
  
  
  constructor(@Inject(DOCUMENT) private document: any,private offcanvasService: NgbOffcanvas,
  public _cookiesService: CookieService,public apiS:ApiService,  public translate: TranslateService, public authService: AuthenticationService, private router: Router,public dataService: DataService) { }

  ngOnInit(): void {
    this.apiS.singleUser(this.authService.currentUserValue.id).subscribe(data=>{
      this.profilephoto = data.data.profilephoto;
    })

    let lang :any;
    lang=  localStorage.getItem("language");
    if(lang !== ''){
      this.currentLang = lang;
    }else{
      this.currentLang = "English - EN";
    }
    this.element = document.documentElement;
    this.apiS.singleUser(this.authService.currentUserValue.id).subscribe(data=>{
      this.designation = data.data.designation;
    })
     // Cookies wise Language set
     this.cookieValue = this._cookiesService.get('lang');
     const val = this.listLang.filter(x => x.lang === this.cookieValue);
     this.countryName = val.map(element => element.text);
     if (val.length === 0) {
       if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.svg'; }
     } else {
       this.flagvalue = val.map(element => element.flag);
     }
  }

  removeClass(el:any, className:any) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };
  
  addClass(el:any, className:any) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const firstIndex = $('.notify-item').first().index();
    const lastIndex = $('.notify-item').last().index();
    var index = $('.item').index();
    // if(event.which == 40){
    //   $('#learn').removeClass("item");
    //   $('#learn').addClass("item");
    // }
    switch(event.which){
      case 38:
        index = (index == firstIndex ? lastIndex : index - 1);
        break;
      case 40:
        index = (index == lastIndex ? 0 : index + 1);
        break;
      case 13:
        event.preventDefault();
        this.router.navigate([$('.item').attr("href")])
        break;
    }
    
    $('.item').removeClass('item');
    $('.notify-item:eq( '+ index +' )').addClass('item');
      
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
     toggleMobileMenu(event: any) {
      event.preventDefault();
      this.mobileMenuButtonClicked.emit();
    }

    changeLanguage(value:any){
      // console.log(value);
      this.translate.use(value);  
      localStorage.setItem("language",value);
      this.currentLang = value;
     }

     changeCss(){
      this.css = !this.css;
      if(this.css){
        $('.searching-drop').addClass('active');
      }else{
        $('.searching-drop').removeClass('active');
      }
     }

     changeCss2(){
      this.css2 = !this.css2;
      if(this.css2){
        $('.notification-drop').addClass('active');
      }else{
        $('.notification-drop').removeClass('active');
      }
     }
  /**
   * Fullscreen method
   */
   fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
  * Topbar Light-Dark Mode Change
  */
   changeMode(mode: string) {
    this.mode = mode;
    // this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.body.setAttribute('data-layout-mode', "light");
        document.body.setAttribute('data-sidebar', "light");
        break;
      case 'dark':
        document.body.setAttribute('data-layout-mode', "dark");
        document.body.setAttribute('data-sidebar', "dark");
        break;
      default:
        document.body.setAttribute('data-layout-mode', "light");
        break;
    }
  }

  /***
   * Language Listing
   */
   listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'de' },
    { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
    { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
    { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
    { text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr' },
  ];

  /***
   * Language Value Set
   */
   setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    // this.languageService.setLanguage(lang);
  }

  /**
   * Logout the user
   */
   logout() {
    this.router.navigate(['/auth/login']);
  }

  getItems(ev: any) {
    this.val = ev.target.value;
    if (!this.val) {
      this.searchProgram = [];
      this.searchCourse = [];
      this.searchModule = [];
      this.searchQuiz = [];
      this.searchLearningActivity = [];
      return;
    }
    this.searchProgram = [];
    this.searchCourse = [];
    this.searchModule = [];
    this.searchQuiz = [];
    this.searchLearningActivity = [];

    // this.apiS.searchQuiz(this.authService.currentUserValue.id, this.val).subscribe(data => {
    //   this.searchQuiz = data.data;
    // })

  }

  openNotification(){
    this.offcanvasService.open(this.filtetcontent, { position: 'end' });
  }

}
