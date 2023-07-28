import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild, OnDestroy, Input, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as moment from 'moment-timezone';
import { DataService } from 'src/app/core/services/data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-learning-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('dataModal') dataModal !: any;
  module: any = [];
  program: any = [];
  course: any = [];
  element: any;
  questions: any = [];
  userQuestions: any = [];
  public scnt = 1;
  public anscal = 0;
  public wrongAns = 0;
  public skipAns = 0;
  questionsCount = 0;

  zoom: number = 1;
  zoomM: number = 1;
  @Input() index: any | undefined;
  @Input() courseIndex: any | undefined;
  @Input() moduleIndex: any | undefined;
  quizId: any = "";
  moduleTime: any = "";
  baseURL = environment.baseURL;

  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  statePieChart: any;
  departmentPieChart: any;
  scorePieChart: any;

  timeInSeconds = 0;
  time: any;
  runTimer: boolean = false;
  hasStarted: boolean = false;
  hasFinished: boolean = false;
  remainingTime: any;
  displayTime: any;
  startTestS = false;
  interval: any;

  timeInSeconds1 = 0;
  time1: any;
  runTimer1: boolean = false;
  hasStarted1: boolean = false;
  hasFinished1: boolean = false;
  remainingTime1: any;
  displayTime1: any = '00.00';
  startTestS1 = false;
  interval1: any;
  activeId: any = "0";
  dept: any = "";
  quizTime: any = "";
  effectiveDate: any = "";
  effectiveTime: any = "";
  openingDate: any = "";

  icon: any = "";
  path: any = "";

  rating: any = 0;
  submitRating: boolean = false;
  quizScoreId: any = "";
  quizScoreData: any = [];
  dummyQuizScoreData: any = [];
  certified: any = [];
  youtubes: any = [];
  quizEnabled: boolean = false;
  scoreResult: boolean = false;
  knowAnswer: boolean = false;
  quizStart: boolean = false;
  questionBankTitle: any = "";
  expired: boolean = false;
  winners: boolean = false;
  analytics: boolean = false;
  loader: boolean = false;

  stateLength: any;
  stateArray: any;
  stateColor: any;

  deptLength: any;
  deptArray: any;
  deptColor: any;

  scoreLength: any;
  scoreArray: any;
  scoreColor: any;

  pdfUrl!: SafeResourceUrl;
  constructor(@Inject(DOCUMENT) private document: any, public apiS: ApiService, public modalService: NgbModal, public authS: AuthenticationService, public route: ActivatedRoute, public toast: ToastrService,
    private dataService: DataService, public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.element = document.documentElement;
    this.apiS.singleUser(this.authS.currentUserValue.id).subscribe(data => {
      this.dept = data.data.department;
    })
  }

  ngOnChanges() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this._fetchData();
  }

  ngAfterViewInit() {
    
  }

  viewPdf(path:any){
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(path)
    return this.pdfUrl;
  }

  preprocessPDFUrls() {
    if (this.module?.moduleId?.documents) {
      this.module.moduleId.documents.forEach((item: any) => {
        const pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.path);
        item.pdfUrl = pdfUrl;
      });
    }
  }

  _fetchData() {
    this.quizScoreData = [];
      this.dataService.getMyLearningActivityData().subscribe(res => {
        this.module = res.data[this.index].programId?.courses[this.courseIndex].courseId?.modules[this.moduleIndex];
        this.course = res.data[this.index].programId?.courses[this.courseIndex];
        this.program = res.data[this.index];
        this.preprocessPDFUrls();
        this.isLoaded = true;
        this.activeId = 1;
        $('.ngb-nav-0').css("display", "block");
        $('.ngb-nav-1').css("display", "block");
        $('.ngb-nav-2').css("display", "block");
        $('.ngb-nav-3').css("display", "block");
        $('.ngb-nav-4').css("display", "block");
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
        this.questionsCount = this.module.moduleId?.questionbank.questionsCount;
        this.questionBankTitle = this.module.moduleId?.questionbank.title;
        this.openingDate = this.module.moduleId?.questionbank.learningLiveDate;
        if (this.module.moduleId?.questionbank?.learningLiveDate == undefined || this.module.moduleId?.questionbank?.learningLiveDate == '' || this.module.moduleId?.questionbank?.learningLiveDate == null) {
          this.effectiveDate = undefined;
        } else {
          this.effectiveDate = moment(this.module.moduleId?.questionbank?.learningLiveDate).tz('Asia/Kolkata')
        }
        this.quizId = this.module.moduleId?.questionbank._id;
        this.dataService.getTop100Winners(this.program.programId?._id, this.quizId).subscribe(async data => {
          if (data.data != undefined) {
            await Promise.all(data.data.winners.map((examT: any) => {
              const date = moment(examT.quizScoreId.createdAt).tz('Asia/Kolkata');
              const split = examT.examTime.split(".");
              date.subtract(split[0], 'minutes');
              date.subtract(split[1], 'seconds');
              examT.examStartTime = date.toISOString();
            }));
            this.certified = data.data;
          }

        })
        this.quizTime = this.module.moduleId?.questionbank?.quizTime;
        this.apiS.singleLearningActivityWatchForModuleDetails(this.program.programId?._id, this.course.courseId?._id, this.module.moduleId?._id).subscribe(res => {
          const date = moment().tz('Asia/Kolkata');
          if (res.data.length > 0) {
            this.quizStart = true;
            this.scoreResult = true;
            this.quizScoreId = res.data[0].quizReference;
            this.questions = [];
            this.userQuestions = [];
            this.apiS.singleQuizScore(res.data[0].quizReference).subscribe(data => {
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
            this.quizScoreData = [];
            if (this.effectiveDate <= date) {
              this.quizStart = true;
              this.quizEnabled = true;
              this.startTestS = true;
              this.questions = [];
              this.userQuestions = [];

            } else if (this.effectiveDate == undefined || this.effectiveDate == '' || this.effectiveDate == null) {
              this.quizStart = true;
              this.quizEnabled = true;
              this.startTestS = true;
              this.questions = [];
              this.userQuestions = [];
            } else {
              this.quizEnabled = false;
              this.quizStart = false;
            }
          }


        })
      })

      // this.apiS.stateWiseWinners(this.quizId).subscribe(data => {
      //   this.stateLength = data.data.lengthArray;
      //   this.stateArray = data.data.array;
      //   this.stateColor = data.data.colorArray;
      // })
      // this.apiS.departmentWiseWinners(this.quizId).subscribe(data => {
      //   this.deptLength = data.data.lengthArray;
      //   this.deptArray = data.data.array;
      //   this.deptColor = data.data.colorArray;
      // })
      // this.apiS.scoreWiseWinners(this.quizId).subscribe(data => {
      //   this.scoreLength = data.data.lengthArray;
      //   this.scoreArray = data.data.array;
      //   this.scoreColor = data.data.colorArray;
      // })

  }

  knowAnalytics() {
      this.statePieChart = {
        series: this.stateLength,
        chart: {
          height: 300,
          type: "pie",
        },
        labels: this.stateArray,
        legend: {
          show: false,
        },
        dataLabels: {
          formatter: function (val: any, opt: any) {
            return opt.w.globals.series[opt.seriesIndex]
          },
          dropShadow: {
            enabled: false,
          },
        },
        colors: this.stateColor,
      };

      this.scorePieChart = {
        series: this.scoreLength,
        chart: {
          height: 300,
          type: "pie",
        },
        labels: this.scoreArray,
        legend: {
          show: false,
        },
        dataLabels: {
          formatter: function (val: any, opt: any) {
            return opt.w.globals.series[opt.seriesIndex]
          },
          dropShadow: {
            enabled: false,
          },
        },
        colors: this.scoreColor,
      };

      this.departmentPieChart = {
        series: this.deptLength,
        chart: {
          height: 300,
          type: "pie",
        },
        labels: this.deptArray,
        legend: {
          show: false,
        },
        dataLabels: {
          formatter: function (val: any, opt: any) {
            return opt.w.globals.series[opt.seriesIndex]
          },
          dropShadow: {
            enabled: false,
          },
        },
        colors: this.deptColor,
      };
    }


  ngOnDestroy() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  startTest() {
    this.timeInSeconds1 = this.quizTime * 60;
    this.initTimer1();
    this.startTimer1();
    this.quizEnabled = false;

  }




  isInThePast(date: any) {
    const today = moment().tz('Asia/Kolkata').startOf('day');
    return date < today;
  }

  changeTab(id: any) {
    if (id == 4) {
      this.activeId = 4;
      this.winners = false;
      this.analytics = false;
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


  initTimer1() {
    this.time1 = this.timeInSeconds1;
    this.runTimer1 = false;
    this.hasStarted1 = false;
    this.hasFinished1 = false;
    this.remainingTime1 = this.timeInSeconds1;

    this.displayTime1 = this.getSecondsAsDigitalClock1(this.remainingTime1);
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
      this.remainingTime1--;
      this.displayTime1 = this.getSecondsAsDigitalClock1(this.remainingTime1);
      if (this.remainingTime1 > 0) {
        this.timerTick1();
      }
      else {
        this.hasFinished1 = true;
        this.startTestS1 = true;
        this.submitAns();
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
    this.zoom = 1
  }

  onError(error:any){
    console.log(error)
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
    if (this.hasFinished1) {
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
    } else {
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

          const cdata = JSON.stringify({
            quizAttended: true,
            quizReference: quizS.data._id,
            quizScore: per,
            examTime: examTime,
            programId: this.program.programId?._id,
            courseId: this.course.courseId?._id,
            moduleId: this.module.moduleId?._id,
            questionbank: this.quizId,
            employeeId: this.authS.currentUserValue.id,
          });
          console.log(cdata);
          this.apiS.createLearningActivityModule(cdata).subscribe(result => {
          });

          this.scoreResult = true;
          this.quizScoreId = quizS.data._id;
          this.quizScoreData = quizS.data;
          this.quizScoreData.rating = 0;
          this.submitRating = false;
          this.loader = false;
        }
      })

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
        this.knowAnswer = true;
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
}
