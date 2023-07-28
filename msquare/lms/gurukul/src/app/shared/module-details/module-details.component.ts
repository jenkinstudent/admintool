import { Component, ElementRef, AfterViewInit, OnDestroy, OnChanges, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import * as moment from 'moment-timezone';
import { DataService } from 'src/app/core/services/data.service';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() type: string | undefined;
  @ViewChild('dataModal') dataModal !: any;
  @ViewChild("ModifierCustom") ModifierCustom: any;
  element: any;
  module: any = [];
  course: any = [];
  program: any = [];
  questions: any = [];
  userQuestions: any = [];
  public scnt = 1;
  public anscal = 0;
  public wrongAns = 0;
  public skipAns = 0;
  questionsCount = 0;

  @Input() index: any | undefined;
  @Input() courseIndex: any | undefined;
  @Input() moduleIndex: any | undefined;

  path: any = "";

  programId: any = "";
  quizId: any = "";
  moduleTime: any = "";
  baseURL = environment.baseURL;

  page: number = 1;
  zoom: number = 1;
  zoomM: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;


  timeInSeconds = 0;
  time: any;
  runTimer: boolean = false;
  hasStarted: boolean = false;
  hasFinished: boolean = false;
  remainingTime: any;
  displayTime: any = '00.00';
  startTestS = false;
  interval: any;

  timeRemaining: number = 10 * 60;

  timeInSeconds1 = 0;
  time1: any;
  runTimer1: boolean = false;
  hasStarted1: boolean = false;
  hasFinished1: boolean = false;
  quizEnabled: boolean = false;
  remainingTime1: any;
  displayTime1: any = '00.00';
  startTestS1 = false;
  interval1: any;
  timeout: any;

  activeId: any = 1;
  dept: any = "";
  quizTime: any = "";
  effectiveDate: any = "";

  icon: any = "";

  rating: any = 0;
  submitRating: boolean = false;
  quizScoreId: any = "";
  quizScoreData: any = [];
  dummyQuizScoreData: any = [];
  certified: any = [];
  youtubes: any = [];
  allData: any = [];
  scoreResult: boolean = false;
  knowAnswer: boolean = false;
  quizStart: boolean = false;
  questionBankTitle: any = "";
  expired: boolean = false;

  loader:boolean = false;

  closeSeconds = 0;
  displaySeconds:any = '0';
  closeRunTimer: boolean = false;
  closeHasStarted: boolean = false;
  closeHasFinished: boolean = false;

  constructor(@Inject(DOCUMENT) private document: any, public apiS: ApiService, public modalService: NgbModal, public authS: AuthenticationService, public route: ActivatedRoute, public toast: ToastrService,
    private dataService: DataService, public router:Router) { }

  ngOnInit(): void {
    this.element = document.documentElement;
    this.apiS.singleUser(this.authS.currentUserValue.id).subscribe(data => {
      this.dept = data.data.department;
    });
  }

  _fetchData() {
    this.quizScoreData = [];
    this.allData = [];
    switch (this.type) {
      case "program":
        this.dataService.getMyProgramsData().subscribe(res => {
          this.allData = res.data;
          this.module = res.data[this.index].courses[this.courseIndex].module[this.moduleIndex];
          this.course = res.data[this.index].courses[this.courseIndex];
          this.program = res.data[this.index];
          this.activeId = 1;
          if (this.module.moduleId?.documents.length > 0) {
            this.activeId = 1;
            $('.training').addClass("nav-0");
            $('.youtube').removeClass("nav-0");
            $('.onePagerData').removeClass("nav-0");
          } else if (this.module.moduleId?.documents.length == 0 && this.module.moduleId?.youtubes.length > 0) {
            this.activeId = 2;
            $('.training').removeClass("nav-0");
            $('.youtube').addClass("nav-0");
            $('.onePagerData').removeClass("nav-0");
          } else if (this.module.moduleId?.documents.length == 0 && this.module.moduleId?.youtubes.length == 0 && this.module.moduleId?.onePagers.length > 0) {
            this.activeId = 3;
            $('.training').removeClass("nav-0");
            $('.youtube').removeClass("nav-0");
            $('.onePagerData').addClass("nav-0");
          }
          if (this.module.moduleId?.documents.length == 0) {
            $('.ngb-nav-0').css("display", "none");
          }
          if (this.module.moduleId?.youtubes.length == 0) {
            $('.ngb-nav-1').css("display", "none");
          }
          if (this.module.moduleId?.onePagers.length == 0) {
            $('.ngb-nav-2').css("display", "none");
          }
          this.questionsCount = this.module.moduleId?.questionbank?.questionsCount;
          this.questionBankTitle = this.module.moduleId?.questionbank?.title;
          this.quizId = this.module.moduleId?.questionbank?._id;
          this.quizTime = this.module.moduleId?.questionbank?.quizTime;
          $('.ngb-nav-3').addClass("disabled");
          if (this.module.moduleWatchTime == 0) {
            this.timeInSeconds = this.module.moduleId?.moduleWatchTime * 60;
            // this.initTimer();
            // this.startTimer()
            // this.interval = setInterval(() => {
            //   var key1 = "courses." + (this.courseIndex) + ".module." + (this.moduleIndex) + ".moduleWatchTime";
            //   var obj = { [key1]: (((this.remainingTime) > 60) ? this.timeInSeconds - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60) };
            //   const cdata = JSON.stringify(obj);
            //   this.apiS.updateProgramsWatchForModule(cdata, this.program._id, this.course.courseId?._id, this.module.moduleId?._id).subscribe(result => {
            //     this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            //   });
            // }, 60000);
          } else if (this.module.moduleWatchTime >= this.module.moduleId?.moduleWatchTime * 60) {
            this.pauseTimer();
            this.timeInSeconds = 0;
            this.displayTime = "00.00";
            this.remainingTime = 0;
            this.startTestS = true;
            this.quizStart = true;
            this.questions = [];
            this.userQuestions = [];
            if (this.module.quizAttended) {
              $('.ngb-nav-4').removeClass("disabled");
              $('.ngb-nav-3').removeClass("disabled");
              this.scoreResult = true;
              this.quizEnabled = false;
              this.quizScoreId = this.module.quizReference;
              this.apiS.singleQuizScore(this.module.quizReference).subscribe(data => {
                this.quizScoreData = data.data;
                if (data.data.rating == undefined || data.data.rating == 0) {
                  data.data.rating = 0;
                  this.submitRating = false;
                } else {
                  this.submitRating = true;
                }
              })
            } else {
              this.scoreResult = false;
              this.quizEnabled = true;
              $('.ngb-nav-3').removeClass("disabled");
            }

          } else {
            this.timeInSeconds = ((this.module.moduleId?.moduleWatchTime * 60) * 1) - (this.module.moduleWatchTime * 1);
            // this.initTimer();
            // this.startTimer();
            // this.interval = setInterval(() => {
            //   var key1 = "courses." + (this.courseIndex) + ".module." + (this.moduleIndex) + ".moduleWatchTime";
            //   var obj = { [key1]: (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60) };
            //   const cdata = JSON.stringify(obj);
            //   this.apiS.updateProgramsWatchForModule(cdata, this.program._id, this.course.courseId?._id, this.module.moduleId?._id).subscribe(result => {
            //     this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            //   });
            // }, 60000);
          }
        })
        break;
      case "course":
        this.dataService.getMyCoursesData().subscribe(res => {
          this.allData = res.data;
          this.module = res.data[this.index].modules[this.moduleIndex];
          this.course = res.data[this.index];
          console.log(this.course)
          this.activeId = 1;
          if (this.module.moduleId?.documents.length > 0) {
            this.activeId = 1;
            $('.training').addClass("nav-0");
            $('.youtube').removeClass("nav-0");
            $('.onePagerData').removeClass("nav-0");
          } else if (this.module.moduleId?.documents.length == 0 && this.module.moduleId?.youtubes.length > 0) {
            this.activeId = 2;
            $('.training').removeClass("nav-0");
            $('.youtube').addClass("nav-0");
            $('.onePagerData').removeClass("nav-0");
          } else if (this.module.moduleId?.documents.length == 0 && this.module.moduleId?.youtubes.length == 0 && this.module.moduleId?.onePagers.length > 0) {
            this.activeId = 3;
            $('.training').removeClass("nav-0");
            $('.youtube').removeClass("nav-0");
            $('.onePagerData').addClass("nav-0");
          }
          if (this.module.moduleId?.documents.length == 0) {
            $('.ngb-nav-0').css("display", "none");
          }
          if (this.module.moduleId?.youtubes.length == 0) {
            $('.ngb-nav-1').css("display", "none");
          }
          if (this.module.moduleId?.onePagers.length == 0) {
            $('.ngb-nav-2').css("display", "none");
          }
          this.questionsCount = this.module.questionbank?.questionsCount;
          this.questionBankTitle = this.module.questionbank?.title;
          this.quizId = this.module.questionbank?._id;
          this.quizTime = this.module.questionbank?.quizTime;
          $('.ngb-nav-3').addClass("disabled");
          if (this.module.moduleWatchTime == 0) { // 59
            this.timeInSeconds = this.module.moduleId?.moduleWatchTime * 60;
            // this.initTimer();
            // this.startTimer()
            // this.interval = setInterval(() => {
            //   const cdata = JSON.stringify({
            //     "modules.$.moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
            //   });
            //   this.apiS.updateCoursesWatchForModule(cdata, this.course._id, this.module.moduleId._id).subscribe(result => {
            //     this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            //   }, error => {
            //   });
            // }, 60000);
          } else if (this.module.moduleWatchTime >= this.module.moduleId?.moduleWatchTime * 60) {
            this.pauseTimer();
            this.timeInSeconds = 0;
            this.displayTime = "00.00";
            this.remainingTime = 0;
            this.startTestS = true;
            this.quizStart = true;
            this.questions = [];
            this.userQuestions = [];
            if (this.module.quizAttended) {
              $('.ngb-nav-4').removeClass("disabled");
              $('.ngb-nav-3').removeClass("disabled");
              this.scoreResult = true;
              this.quizEnabled = false;
              this.quizScoreId = this.module.quizReference;
              this.apiS.singleQuizScore(this.module.quizReference).subscribe(data => {
                this.quizScoreData = data.data;
                if (data.data.rating == undefined || data.data.rating == 0) {
                  data.data.rating = 0;
                  this.submitRating = false;
                } else {
                  this.submitRating = true;
                }
              })
            } else {
              this.scoreResult = false;
              this.quizEnabled = true;
              $('.ngb-nav-3').removeClass("disabled");
            }

          } else {
            this.timeInSeconds = ((this.module.moduleId?.moduleWatchTime * 60) * 1) - (this.module.moduleWatchTime * 1);
            // this.initTimer();
            // this.startTimer();
            // this.interval = setInterval(() => {
            //   const cdata = JSON.stringify({
            //     "modules.$.moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
            //   });
            //   this.apiS.updateCoursesWatchForModule(cdata, this.course._id, this.module.moduleId._id).subscribe(result => {
            //     this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            //   }, error => {
            //   });

            // }, 60000);
          }
        })
        break;
      case "module":
        // Module Watch
        this.dataService.getMyModulesData().subscribe(res => {
          this.allData = res.data;
          this.module = res.data[this.index];
          console.log(this.module)
          this.activeId = 1;
          if (this.module.moduleId?.documents.length > 0) {
            this.activeId = 1;
            $('.training').addClass("nav-0");
            $('.youtube').removeClass("nav-0");
            $('.onePagerData').removeClass("nav-0");
          } else if (this.module.moduleId?.documents.length == 0 && this.module.moduleId?.youtubes.length > 0) {
            this.activeId = 2;
            $('.training').removeClass("nav-0");
            $('.youtube').addClass("nav-0");
            $('.onePagerData').removeClass("nav-0");
          } else if (this.module.moduleId?.documents.length == 0 && this.module.moduleId?.youtubes.length == 0 && this.module.moduleId?.onePagers.length > 0) {
            this.activeId = 3;
            $('.training').removeClass("nav-0");
            $('.youtube').removeClass("nav-0");
            $('.onePagerData').addClass("nav-0");
          }
          if (this.module.moduleId?.documents.length == 0) {
            $('.ngb-nav-0').css("display", "none");
          }
          if (this.module.moduleId?.youtubes.length == 0) {
            $('.ngb-nav-1').css("display", "none");
          }
          if (this.module.moduleId?.onePagers.length == 0) {
            $('.ngb-nav-2').css("display", "none");
          }
          this.questionsCount = this.module.questionbank.questionsCount;
          this.questionBankTitle = this.module.questionbank.title;
          this.quizId = this.module.questionbank._id;
          this.quizTime = this.module.questionbank?.quizTime;
          $('.ngb-nav-3').addClass("disabled");
          if (this.module.moduleWatchTime == 0) { // 59
            this.timeInSeconds = this.module.moduleId?.moduleWatchTime * 60;
            // this.initTimer();
            // this.startTimer()
            // this.interval = setInterval(() => {
            //   const cdata = JSON.stringify({
            //     "moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
            //   });
            //   this.apiS.updateModulesWatch(cdata, this.module._id).subscribe(result => {
            //     this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            //   }, error => {
            //   });
            // }, 60000);
          } else if (this.module.moduleWatchTime >= this.module.moduleId?.moduleWatchTime * 60) {
            this.pauseTimer();
            this.timeInSeconds = 0;
            this.displayTime = "00.00";
            this.remainingTime = 0;
            this.startTestS = true;
            this.quizStart = true;
            this.questions = [];
            this.userQuestions = [];
            if (this.module.quizAttended) {
              $('.ngb-nav-4').removeClass("disabled");
              $('.ngb-nav-3').removeClass("disabled");
              this.scoreResult = true;
              this.quizEnabled = false;
              this.quizScoreId = this.module.quizReference;
              this.apiS.singleQuizScore(this.module.quizReference).subscribe(data => {
                this.quizScoreData = data.data;
                if (data.data.rating == undefined || data.data.rating == 0) {
                  data.data.rating = 0;
                  this.submitRating = false;
                } else {
                  this.submitRating = true;
                }
              })
            } else {
              this.scoreResult = false;
              this.quizEnabled = true;
              $('.ngb-nav-3').removeClass("disabled");
            }

          } else {
            this.timeInSeconds = ((this.module.moduleId?.moduleWatchTime * 60) * 1) - (this.module.moduleWatchTime * 1);
            // this.initTimer();
            // this.startTimer();
            // this.interval = setInterval(() => {
            //   const cdata = JSON.stringify({
            //     "moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
            //   });
            //   this.apiS.updateModulesWatch(cdata, this.module._id).subscribe(result => {
            //     this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            //   }, error => {
            //   });
            // }, 60000);
          }
        })
        break;
    }
  }

  ngOnChanges() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log("change detected");    
    this._fetchData();
  }

  ngAfterViewInit() {
  }


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  initTimer() {
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTest() {
    this.timeInSeconds1 = this.quizTime * 60;
    this.initTimer1();
    this.startTimer1();
    this.quizEnabled = false;
  }

  getCompleted() {
    this.activeId = 5;
    this.certified = [];
    switch (this.type) {
      case "program":
        this.dataService.getMyProgramsCertifiedData(this.program.programId?._id, this.quizId).subscribe(data => {
          this.certified = data.data;
        })
        break;
      case "course":
        this.dataService.getMyCoursesCertifiedData(this.course.courseId?._id, this.quizId).subscribe(data => {
          this.certified = data.data;
        })
        break;
      case "module":
        this.dataService.getMyModulesCertifiedData(this.module.moduleId?._id, this.quizId).subscribe(data => {
          this.certified = data.data;
        })
        break;
    }


  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var hours = Math.floor(inputSeconds / 3600);
    var minutes = Math.floor((inputSeconds - (hours * 3600)) / 60);
    var seconds = inputSeconds - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString + '.' + secondsString;
  }

  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  isInThePast(date: any) {
    const today = moment().tz('Asia/Kolkata').startOf('day');
    return date < today;
  }

  changeTab(id: any) {
    if (id == 4) {
      this.activeId = 4;
      if (this.quizStart && !this.scoreResult) {
        this.scoreResult = false;
        this.quizEnabled = true;
        this.questions = [];
        this.skipAns = 0;
        this.apiS.getAllQuestion(this.quizId).subscribe(question => {
          this.questions = this.userQuestions = this.chooseRandom(question.data, this.questionsCount);
          this.skipAns = this.questionsCount;
        })
      }else if(this.quizStart && this.scoreResult){
        this.quizScoreData = [];
        this.apiS.singleQuizScore(this.quizScoreId).subscribe(data => {
          this.quizScoreData = data.data;
          if (data.data.rating == undefined || data.data.rating == 0) {
            data.data.rating = 0;
            this.submitRating = false;
          } else {
            this.submitRating = true;
          }
        })
      }
    }
  }

  timerTick() {
    setTimeout(() => {
      if (!this.runTimer) { return; }
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
        this.timerTick();
      }
      else {
        this.quizEnabled = true;
        this.hasFinished = true;
        this.startTestS = true;
        this.quizStart = true;
        this.displayTime = "00.00";
        clearInterval(this.interval);
        $('.ngb-nav-3').removeClass("disabled");
      }
    }, 1000);
  }

  initTimer1() {
    this.time1 = this.timeInSeconds1;
    this.runTimer1 = false;
    this.hasStarted1 = false;
    this.hasFinished1 = false;
    this.remainingTime1 = this.timeInSeconds1;
    this.displayTime1 = this.getSecondsAsDigitalClock(this.remainingTime1);
  }

  getSecondsAsDigitalClock1(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return minutesString + '.' + secondsString;
  }

  startTimer1() {
    this.runTimer1 = true;
    this.hasStarted1 = true;
    this.timerTick1();
  }

  pauseTimer1() {
    this.runTimer1 = false;
  }

  resumeTimer1() {
    this.startTimer1();
  }

  timerTick1() {
    setTimeout(() => {

      if (!this.runTimer1) { return; }
      if (this.remainingTime1 > 0) {
        this.remainingTime1--;
        this.displayTime1 = this.getSecondsAsDigitalClock1(this.remainingTime1);
        this.timerTick1();
      }
      else {
        this.hasFinished1 = true;
        this.startTestS1 = true;
        Swal.fire({
          title: 'Time Over',
          confirmButtonColor: '#0ab39c',
          confirmButtonText: 'Continue',
          html: '<img style="width: 20%;" src="assets/images/chronometer.gif"><br>Do you want to start quiz again?',
          allowOutsideClick: false
        }).then(result => {
          if (result.value) {
            this.quizEnabled = true;
          }
        });
        // this.submitAns();
      }
    }, 1000);
  }

  chooseRandom(arr: any, num: any) {
    const res = [];
    for (let i = 0; i < num;) {
      const random = Math.floor(Math.random() * arr.length);
      if (res.indexOf(arr[random]) !== -1) {
        continue;
      };
      res.push(arr[random]);
      i++;
    };
    return res;
  };

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
    switch(this.type){
      case 'program':
        if (this.module.moduleWatchTime == 0) {
           this.initTimer();
          this.startTimer()
          this.interval = setInterval(() => {
            var key1 = "courses." + (this.courseIndex) + ".module." + (this.moduleIndex) + ".moduleWatchTime";
            var obj = { [key1]: (((this.remainingTime) > 60) ? this.timeInSeconds - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60) };
            const cdata = JSON.stringify(obj);
            this.apiS.updateProgramsWatchForModule(cdata, this.program._id, this.course.courseId?._id, this.module.moduleId?._id).subscribe(result => {
              this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            });
          }, 60000);
        }else if(this.module.moduleWatchTime >= this.module.moduleId?.moduleWatchTime * 60){
          this.pauseTimer();
        }else{
          this.initTimer();
          this.startTimer();
          this.interval = setInterval(() => {
            var key1 = "courses." + (this.courseIndex) + ".module." + (this.moduleIndex) + ".moduleWatchTime";
            var obj = { [key1]: (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60) };
            const cdata = JSON.stringify(obj);
            this.apiS.updateProgramsWatchForModule(cdata, this.program._id, this.course.courseId?._id, this.module.moduleId?._id).subscribe(result => {
              this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            });
          }, 5000);
        }
        break;
      case 'course':
        if (this.module.moduleWatchTime == 0) {
         this.initTimer();
          this.startTimer()
          this.interval = setInterval(() => {
            const cdata = JSON.stringify({
              "modules.$.moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
            });
            this.apiS.updateCoursesWatchForModule(cdata, this.course._id, this.module.moduleId._id).subscribe(result => {
              this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            }, error => {
            });
          }, 60000);
       }else if(this.module.moduleWatchTime >= this.module.moduleId?.moduleWatchTime * 60){
         this.pauseTimer();
       }else{
         this.initTimer();
            this.startTimer();
            this.interval = setInterval(() => {
              const cdata = JSON.stringify({
                "modules.$.moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
              });
              this.apiS.updateCoursesWatchForModule(cdata, this.course._id, this.module.moduleId._id).subscribe(result => {
                this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
              }, error => {
              });

            }, 60000);
       }
        break;
      case 'module':
        if (this.module.moduleWatchTime == 0) {
          this.initTimer();
          this.startTimer()
          this.interval = setInterval(() => {
            const cdata = JSON.stringify({
              "moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
            });
            this.apiS.updateModulesWatch(cdata, this.module._id).subscribe(result => {
              this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            }, error => {
            });
          }, 60000);
        }else if(this.module.moduleWatchTime >= this.module.moduleId?.moduleWatchTime * 60){
          this.pauseTimer();
        }else{
          this.initTimer();
          this.startTimer();
          this.interval = setInterval(() => {
            const cdata = JSON.stringify({
              "moduleWatchTime": (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60)
            });
            this.apiS.updateModulesWatch(cdata, this.module._id).subscribe(result => {
              this.module.moduleWatchTime = (((this.remainingTime) > 60) ? ((this.module.moduleId?.moduleWatchTime * 60) * 1) - this.remainingTime : this.module.moduleId?.moduleWatchTime * 60);
            }, error => {
            });
          }, 60000);
        }
        break;
    }
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  submitAns() {
    this.loader = true;
    this.wrongAns = 0;
    this.anscal = 0;
    this.pauseTimer1();
    let examTime = this.getSecondsAsDigitalClock1((this.timeInSeconds1 * 1) - ((this.displayTime1.split('.')[0] * 60) + (this.displayTime1.split('.')[1] * 1)));
    for (let index = 0; index < this.questionsCount; index++) {
      if (this.userQuestions[index]['status'] == true) {
        this.anscal = this.anscal + 1;
      } else if (this.userQuestions[index]['status'] == false) {
        this.wrongAns = this.wrongAns + 1;
      }
    }
    let per = Math.floor((100 / this.questionsCount) * this.anscal);
    let perc = per * 100;
    let wPer = Math.floor((100 / this.questionsCount) * (this.wrongAns));
    let sPer = Math.floor((100 / this.questionsCount) * (this.skipAns - (this.wrongAns + this.anscal)));
    if (per >= 80) {
      const data = JSON.stringify({
        "quizId": this.quizId,
        "employeeId": this.authS.currentUserValue.id,
        "score": per,
        "wrongAnswer": this.wrongAns,
        "totalQuestion": this.questionsCount,
        "correctAnswer": this.anscal,
        "skipAnswer": (this.skipAns - (this.wrongAns + this.anscal)),
        "questionArray": this.userQuestions,
        "examTime": examTime
      });

      this.apiS.createQuizScore(data).subscribe(quizS => {
        if (quizS.status == 'success') {

          const rdata = JSON.stringify({
            "title": this.questionBankTitle,
            "points": this.anscal,
            "type": "credit",
            "employeeId": this.authS.currentUserValue.id
          })
          this.apiS.createRewardPoints(rdata).subscribe(result => {
          }, error => {
          });

          switch (this.type) {
            case "program":
              var key5 = "courses." + this.courseIndex + ".module." + this.moduleIndex + ".isWatch";
              var key1 = "courses." + this.courseIndex + ".module." + this.moduleIndex + ".quizAttended";
              var key2 = "courses." + this.courseIndex + ".module." + this.moduleIndex + ".quizReference";
              var key3 = "courses." + this.courseIndex + ".module." + this.moduleIndex + ".quizScore";
              var key4 = "courses." + this.courseIndex + ".module." + this.moduleIndex + ".examTime";
              var obj = { [key1]: true, [key2]: quizS.data._id, [key3]: per, [key4]: examTime, [key5]: true };
              const pData = JSON.stringify(obj);
              this.apiS.updateProgramsWatchForModule(pData, this.program._id, this.course.courseId?._id, this.module.moduleId?._id).subscribe(result => {
                this.module.isWatch = true;
                this.module.quizAttended = true;
                this.module.quizReference = quizS.data;
                this.module.quizScore = per;
                this.module.examTime = examTime;
              });
              if ((this.course.module.length - 1) != this.moduleIndex) {
                let index = (this.moduleIndex * 1) + (1 * 1);
                var key1 = "courses." + this.courseIndex + ".module." + (index) + ".unlock";
                var obj1 = { [key1]: true };
                const pdata = JSON.stringify(obj1);
                console.log(pdata)
                this.apiS.updateProgramsWatchForModule(pdata, this.program._id, this.course.courseId?._id, this.course.module[index].moduleId?._id).subscribe(result => {
                  this.course.module[index].unlock = true;
                  localStorage.setItem("refresh", "true");
                });
              } else {
                const cdata = JSON.stringify({
                  "courses.$.isWatch": true
                });
                this.apiS.updateProgramsWatchForCourse(cdata, this.program._id, this.course.courseId?._id).subscribe(result => {
                  this.course.isWatch = true;
                });
                if ((this.program.courses.length - 1) != this.courseIndex) {
                  let index1 = (this.courseIndex * 1) + (1 * 1);
                  const pdata1 = JSON.stringify({
                    "courses.$.unlock": true
                  });
                  this.apiS.updateProgramsWatchForC(pdata1, this.program._id, this.program.courses[index1].courseId?._id).subscribe(result => {
                    this.program.courses[index1].isWatch = true;
                    var key1 = "courses." + index1 + ".module." + (0) + ".unlock";
                    var obj = { [key1]: true };
                    const cdata = JSON.stringify(obj);
                    this.apiS.updateProgramsWatchForModule(cdata, this.program._id, this.program.courses[index1].courseId?._id, this.program.courses[index1].module[0].moduleId?._id).subscribe(result => {
                      this.program.courses[index1].module[0].unlock = true;
                      localStorage.setItem("refresh", "true");
                    });
                  });
                } else {
                  const pdata = JSON.stringify({
                    "isWatch": true
                  });
                  this.apiS.updateProgramsWatchForProgram(pdata, this.program._id).subscribe(result => {
                    this.program.isWatch = true;
                    this.dataService.getMyProgramsData().subscribe(prgData => {
                      if ((prgData.data.length - 1) != this.index) {
                        const cdata = JSON.stringify({
                          "unlock": true
                        });
                        this.apiS.updateProgramsWatch(cdata, prgData.data[((this.index * 1) + (1 * 1))]._id).subscribe(result => {
                          prgData.data[((this.index * 1) + (1 * 1))].unlock = true;
                          localStorage.setItem("refresh", "true");
                        });
                      }
                    })

                  });
                }
              }
              console.log(this.program.programId?.isCertificate);
              if (this.program.programId?.isCertificate) {
                this.apiS.createCertificateData(this.quizId, quizS.data._id, this.authS.currentUserValue.id).subscribe(cerData => {
                  console.log(cerData);
                })
              }
              break;
            case "course":
              const cdata = JSON.stringify({
                "modules.$.quizAttended": true,
                "modules.$.quizReference": quizS.data._id,
                "modules.$.quizScore": per,
                "modules.$.examTime": examTime,
                "modules.$.isWatch": true,
              });
              this.apiS.updateCoursesWatchForModule(cdata, this.course._id, this.module.moduleId?._id).subscribe(result => {
                this.module.isWatch = true;
                this.module.quizAttended = true;
                this.module.quizReference = quizS.data;
                this.module.quizScore = per;
                this.module.examTime = examTime;
              });
              if ((this.course.modules.length - 1) != this.moduleIndex) {
                const cData = JSON.stringify({
                  "modules.$.unlock": true
                });
                console.log(this.moduleIndex)
                console.log(((this.moduleIndex * 1) + (1 * 1)))
                console.log(this.course.modules);
                this.apiS.updateCoursesWatchForModule(cData, this.course._id, this.course.modules[((this.moduleIndex * 1) + (1 * 1))].moduleId?._id).subscribe(result => {
                  this.course.modules[((this.moduleIndex * 1) + (1 * 1))].unlock = true;
                  localStorage.setItem("refresh", "true");
                });
              } else {
                const sdata = JSON.stringify({
                  "isWatch": true
                });
                this.apiS.updateCoursesWatchForCourse(sdata, this.module._id).subscribe(result => {
                  this.module.isWatch = true;
                });
                this.dataService.getMyCoursesData().subscribe(courdata => {
                  if ((courdata.data.length - 1) != this.index) {
                    const cdata = JSON.stringify({
                      "unlock": true
                    });
                    this.apiS.updateCoursesWatch(cdata, courdata.data[((this.index * 1) + (1 * 1))]._id).subscribe(result => {
                      courdata.data[((this.index * 1) + (1 * 1))].unlock = true;
                      localStorage.setItem("refresh", "true");
                    });
                  }
                })
              }
              break;
            case "module":
              const mdata = JSON.stringify({
                "quizAttended": true,
                "quizReference": quizS.data._id,
                "quizScore": per,
                "examTime": examTime,
                "isWatch": true
              });
              this.apiS.updateModulesWatchIsWatch(mdata, this.module._id).subscribe(result => {
                this.module.isWatch = true;
                this.module.quizAttended = true;
                this.module.quizReference = quizS.data;
                this.module.quizScore = per;
                this.module.examTime = examTime;
                this.dataService.getMyModulesData().subscribe(moddata => {
                  moddata.data[((this.index * 1) + (1 * 1))].unlock = true;
                });
                localStorage.setItem("refresh", "true");
              });
              break;
          }
          this.scoreResult = true;
          this.quizScoreId = quizS.data._id;
          this.quizScoreData = quizS.data;
          this.quizScoreData.rating = 0;
          this.submitRating = false;
          this.loader = false;
          this.closeSeconds = 5;
          this.closeInitTimer();
          this.closeStartTimer();
          
          
        } else {
          this.toast.error(quizS.message);
          this.loader = false;
        }
      })
    } else {
      this.scoreResult = false;
      this.dummyQuizScoreData = {
        totalQuestion: this.questionsCount,
        skipAnswer: (this.skipAns - (this.wrongAns + this.anscal)),
        correctAnswer: this.anscal,
        wrongAnswer: this.wrongAns,
        per: per
      }
      this.modalService.open(this.dataModal, {
        centered: true, backdrop: 'static',
        keyboard: false
      });
      this.loader = false;
    }


  }

  inputRadioChange(event: any, index: number) {
    this.userQuestions[index]['marked'] = true;
    if (this.questions[index].answer === this.questions[index].Act_Answer) {
      this.userQuestions[index]['Act_Answer'] = this.questions[index].Act_Answer;
      this.userQuestions[index]['status'] = true;
    } else {
      this.userQuestions[index]['Act_Answer'] = this.questions[index].Act_Answer;
      this.userQuestions[index]['status'] = false;
    }

  }

  submitRatingData(rating: any) {
    this.quizScoreData.rating = rating;
    this.apiS.updateRating(rating, this.quizScoreId).subscribe(data => {
      if (data.status) {
        this.submitRating = true;
        this.scoreResult = true;
        this.knowAnswer = false;
      } else {
      }
    })
  }

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

  getPlatform(): String{
    return Capacitor.getPlatform();
  }

  openFullScreenModal(content:any, path:any){
    this.modalService.open(content,{size:'fullscreen'});
    this.path = path;
  }

  closeTimerTick() {
    setTimeout(() => {
      if (!this.closeRunTimer) { return; }
      if (this.closeSeconds > 0) {
        this.closeSeconds--;
        this.displaySeconds = this.closeGetSecondsAsDigitalClock(this.closeSeconds);
        this.closeTimerTick();
      }
      else {
        this.closeHasFinished = true;
        this.displayTime = "0";
        console.log(this.type)
        switch(this.type){
          case 'program':
            console.log(this.allData);
            console.log(this.index);
            if((this.course.module.length - 1) != this.moduleIndex){
              this.router.navigate(['/pages/my-programmes/module-details', this.index, this.courseIndex, ((this.moduleIndex*1)+(1*1))])
              return;
            }else{
              if((this.program.courses.length - 1) != this.courseIndex){
                this.router.navigate(['/pages/my-programmes/module-details', this.index, ((this.courseIndex*1)+(1*1)), 0])
                return;
              }else{
                if((this.allData.length-1) != this.index){
                  this.router.navigate(['/pages/my-programmes/module-details', ((this.index*1)+(1*1)), 0, 0])
                  return;
                }
              }

            }
            break;
          case 'course':
            if((this.course.modules.length - 1) != this.moduleIndex){
              this.router.navigate(['/pages/my-courses/module-details', this.index, ((this.moduleIndex*1)+(1*1))])
              return;
            }else{
              if((this.allData.length-1) != this.index){
                this.router.navigate(['/pages/my-courses/module-details', ((this.index*1)+(1*1)), 0])
                return;
              }
            }
            break;
          case 'module':
            if((this.allData.length-1) != this.index){
              this.router.navigate(['/pages/my-modules/module-details', ((this.index*1)+(1*1))])
              return;
            }
            break;
        }
      }
    }, 1000);
  }



  cancelRedirect(){
   this.closePauseTimer1();
   this.closeHasFinished = true;
  }

  closeInitTimer() {
    this.closeRunTimer = false;
    this.closeHasStarted = false;
    this.closeHasFinished = false;
    this.displaySeconds = this.closeGetSecondsAsDigitalClock(this.closeSeconds);
  }

  closeStartTimer() {
    this.closeRunTimer = true;
    this.closeHasStarted = true;
    this.closeTimerTick();
  }

  closePauseTimer1() {
    this.closeRunTimer = false;
  }

  closeResumeTimer1() {
    this.closeStartTimer();
  }


  closeGetSecondsAsDigitalClock(inputSeconds: number) {
    var hours = Math.floor(inputSeconds / 3600);
    var minutes = Math.floor((inputSeconds - (hours * 3600)) / 60);
    var seconds = inputSeconds - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = seconds.toString();
    return secondsString;
  }

}
