import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as jqeury from 'jquery';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/core/services/excel.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit{
  @ViewChild('importQuestions') importQuestions!: ElementRef;
  @ViewChild('thumbnailChild') thumbnailChild!: ElementRef;

  dataTable: any;
  add: boolean = false;
  baseURL = environment.baseURL;
  question = '';
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  optionE = '';
  optionF = '';
  optionG = '';
  optionH = '';
  optionI = '';
  optionJ = '';
  expiryDate: any;
  learningLiveDate: any;
  learningLiveTime: any;
  answer = '';

  searchTerm:any = "";
  jsondatadisplay = "";

  arrayBuffer: any = [];

  rowIdxaddBtnQuestion = 0;
  questionBankCode = "";
  keywords = "";
  quizTitle = "";
  questionsCount = 0;
  quizTime = 0;
  description = "";
  uploadfilename = "";
  uploadthumbnailname = "";
  uploadthumbnail: boolean = false;
  fusionLearningBank: boolean = false;
  selectfiles: any;
  keywordsError = "";
  titleError = "";
  descriptionError = "";
  questionsCountError = "";
  answerError = "";
  thumbnailError = "";
  quizTimeError = "";
  questionError = "";
  uploadfile: boolean = false;
  edit: boolean = false;
  update: boolean = false;
  isLearningActivity: boolean = false;
  qbId = "";
  questionId = "";
  targetFiles: any;
  questions: any = [];
  printData: any = [];
  status: any = "";
  thumbnailLink = "";
  remark: any = "";
  item: any = { question: '', optionA: '', optionB: '', optionC: '', optionD: '', optionE: '', optionF: '', optionG: '', optionH: '', optionI: '', optionJ: '', answer: '' };
  public records: any = [];
  @ViewChild('csvReader') csvReader: any;

  label = '';

  loader = false;

  constructor(public _location: Location, public apiS: ApiService, public toastr: ToastrService, public route: ActivatedRoute, public titleS: Title, public appC: AppComponent, public router: Router,
    public authS: AuthenticationService, public datepipe: DatePipe,public excelS:ExcelService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      if (data.action == 'create') {
        this.label = "Create Question Bank";
        this.titleS.setTitle("Create Question Bank - " + this.appC.title);
        this.getIncrementalCode();
      } else {
        this.edit = true;
        this.label = "Edit Question Bank";
        this.titleS.setTitle("Edit Question Bank - " + this.appC.title);
        this.route.queryParams.subscribe((data: any) => {
          this.qbId = data.id;
          this.getQbById(data.id);
          this.getAllQuestionById();
        })
      }
    });
  }

  getQbById(id: any) {
    this.apiS.getSingleQuestionBank(id).subscribe(data => {
      this.questionBankCode = data.data.code;
      this.keywords = data.data.keywords;
      this.quizTitle = data.data.title;
      this.description = data.data.description;
      this.quizTime = data.data.quizTime;
      this.fusionLearningBank = data.data.fusionBank;
      this.thumbnailLink = data.data.thumbnail;
      this.status = data.data.status;
      this.expiryDate = this.datepipe.transform(data.data.expiryDate, 'yyyy-MM-dd','IST');
      this.learningLiveDate = this.datepipe.transform(data.data.learningLiveDate, 'yyyy-MM-ddTHH:mm','IST');
      console.log(this.learningLiveDate)
      this.learningLiveTime = data.data.learningLiveTime;
      this.questionsCount = data.data.questionsCount;
    })
  }

  getAllQuestionById() {
    this.questions = [];
    this.printData = [];
    this.apiS.getAllQuestion(this.qbId).subscribe(data => {

      this.questions = data.data;
      for (let i = 0; i < this.questions.length; i++) {
        this.printData.push({
          "question": this.questions[i]['question'],
          "optionA": this.questions[i]['optionA'],
          "optionB": this.questions[i]['optionB'],
          "optionC": this.questions[i]['optionC'],
          "optionD": this.questions[i]['optionD'],
          "optionE": this.questions[i]['optionE'],
          "optionF": this.questions[i]['optionF'],
          "optionG": this.questions[i]['optionG'],
          "optionH": this.questions[i]['optionH'],
          "optionI": this.questions[i]['optionI'],
          "optionJ": this.questions[i]['optionJ'],
          "answer": this.questions[i]['answer'],
          "remark": this.questions[i]['remark'],
        })
      }
    })
  }

  getIncrementalCode() {
    this.apiS.getIncrementalCodeQuestionBank().subscribe(data => {
      this.questionBankCode = data.data.code;
    });
  }

  checkQuiz(index: any) {
    this.questions[index].checked = true;
  }

  addQuestion() {
    if (this.question == "") {
      this.questionError = "has-error";
      return;
    }
    if (this.answer == "") {
      this.answerError = "has-error";
      return;
    }
    this.apiS.createQuestion(this.qbId, this.question, this.optionA, this.optionB, this.optionC, this.optionD, this.optionE, this.optionF, this.optionG, this.optionH, this.optionI, this.optionJ, this.answer, this.remark).subscribe(result => {
      if (result.status) {
        this.toastr.success(result.message);
        this.clearQuestionForm();
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  editQuestionById() {
    if (this.question == "") {
      this.questionError = "has-error";
      return;
    }
    if (this.answer == "") {
      this.answerError = "has-error";
      return;
    }
    this.apiS.updateQuestion(this.qbId, this.question, this.optionA, this.optionB, this.optionC, this.optionD, this.optionE, this.optionF, this.optionG, this.optionH, this.optionI, this.optionJ, this.answer, this.remark, this.questionId).subscribe(result => {
      if (result.status) {
        this.toastr.success(result.message);
        this.clearQuestionForm();
        this.getAllQuestionById();

      } else {
        this.toastr.error(result.message);
      }
    });
  }

  deleteQuestions() {
    for (let emp = 0; emp < this.questions.length; emp++) {
      if (this.questions[emp].checked == true) {
        this.apiS.deleteQuestion(this.questions[emp]._id).subscribe(() => {
        })
      }
    }
    setTimeout(() => {
      this.getAllQuestionById();
    }, 300);
  }

  editQuestion(id: any) {
    this.add = true;
    this.update = true;
    this.apiS.singleQuestion(id).subscribe(data => {
      this.questionId = id;
      this.question = data.data.question;
      this.optionA = data.data.optionA;
      this.optionB = data.data.optionB;
      this.optionC = data.data.optionC;
      this.optionD = data.data.optionD;
      this.optionE = data.data.optionE;
      this.optionF = data.data.optionF;
      this.optionG = data.data.optionG;
      this.optionH = data.data.optionH;
      this.optionI = data.data.optionI;
      this.optionJ = data.data.optionJ;
      this.answer = data.data.answer;
      this.remark = data.data.remark;
      if (this.answer == "A") {
        jqeury("input[id=A][value=A]").prop('checked', true);
      } else if (this.answer == "B") {
        jqeury("input[id=B][value=B]").prop('checked', true);
      } else if (this.answer == "C") {
        jqeury("input[id=C][value=C]").prop('checked', true);
      } else {
        jqeury("input[id=D][value=D]").prop('checked', true);
      }

    })
  }

  close() {
    this.add = false;
    this.clearQuestionForm();
  }

  addQ() {
    this.add = true;
  }

  exportAsXLSX() {
    this.excelS.exportAsExcelFile(this.printData, 'Questions');
  }

  importFile(){
    const selectedFile = this.targetFiles.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      this.records = XLSX.utils.sheet_to_json(worksheet);
      for (let i = 0; i < this.records.length; i++) {
        this.records[i].questionBankId = this.qbId;
        this.records[i].question = (this.records[i]?.question.toString() == '' || this.records[i]?.question.toString() == ' ') ? '' : this.records[i]?.question.toString();
        this.records[i].optionA = (this.records[i].optionA.toString() == '' || this.records[i].optionA.toString() == ' ') ? '' : this.records[i].optionA.toString();
        this.records[i].optionB = (this.records[i].optionB.toString() == '' || this.records[i].optionB.toString() == ' ') ? '' : this.records[i].optionB.toString();
        this.records[i].optionC = (this.records[i].optionC == undefined)?'':(this.records[i].optionC.toString() == '' || this.records[i].optionC.toString() == ' ') ? '' : this.records[i].optionC.toString();
        this.records[i].optionD = (this.records[i].optionD == undefined)?'':(this.records[i].optionD.toString() == '' || this.records[i].optionD.toString() == ' ') ? '' : this.records[i].optionD.toString();
        this.records[i].optionE = (this.records[i].optionE == undefined)?'':(this.records[i].optionE.toString() == '' || this.records[i].optionE.toString() == ' ') ? '' : this.records[i].optionE.toString();
        this.records[i].optionF = (this.records[i].optionF == undefined)?'':(this.records[i].optionF.toString() == '' || this.records[i].optionF.toString() == ' ') ? '' : this.records[i].optionF.toString();
        this.records[i].optionG = (this.records[i].optionG == undefined)?'':(this.records[i].optionG.toString() == '' || this.records[i].optionG.toString() == ' ') ? '' : this.records[i].optionG.toString();
        this.records[i].optionH = (this.records[i].optionH == undefined)?'':(this.records[i].optionH.toString() == '' || this.records[i].optionH.toString() == ' ') ? '' : this.records[i].optionH.toString();
        this.records[i].optionI = (this.records[i].optionI == undefined)?'':(this.records[i].optionI.toString() == '' || this.records[i].optionI.toString() == ' ') ? '' : this.records[i].optionI.toString();
        this.records[i].optionJ = (this.records[i].optionJ == undefined)?'':(this.records[i].optionJ.toString() == '' || this.records[i].optionJ.toString() == ' ') ? '' : this.records[i].optionJ.toString();
        if (i == (this.records.length - 1)) {
          if (this.records.length > 0) {
            this.apiS.createBulkQuestion(this.records).subscribe(res => {
              if (res.status) {
                this.toastr.success(res.message);
                this.clearQuestionForm();
                this.importQuestions.nativeElement.value = "";
              } else {
                this.toastr.error(res.message);
              }
            });
          } else {
            this.toastr.error("Excel contains 0 data.");
          }
        }
      }
    };
  }

  uploadThumbnail(event: any) {
    let fileData: FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    img.onload = () => {
      if (img.width == 300 && img.height == 200) {
        this.apiS.uploadFile(fileData).subscribe(data => {
          if (data.status) {
            this.thumbnailLink = data.data.url;
            this.thumbnailChild.nativeElement.value = "";
          }
        });
        return true;
      }
      this.toastr.error("Please upload file in 300px x 200px");
      this.thumbnailChild.nativeElement.value = "";
      return true;
    }
  }

  selectImportFile(event: any) {
    this.uploadfile = true;
    this.uploadfilename = event.target.files[0].name;
    this.selectfiles = event.srcElement.files;
    this.targetFiles = event.target;
  }

  allQuestionSelection(event:any){
    if(event.target.checked){
      for(let emp = 0; emp < this.questions.length; emp++){
          this.questions[emp].checked = true;
      }
    }else{
      for(let emp = 0; emp < this.questions.length; emp++){
        this.questions[emp].checked = false;
    }
    }
  }

  save(needEdit: boolean) {
    console.log(this.learningLiveDate);
    // let learningLiveDate = new Date(this.learningLiveDate).toLocaleString();
    
    this.loader = true;
    if (this.questionBankCode == "" || this.questionBankCode == undefined || this.questionBankCode == null) {
      this.toastr.error("Question Bank Code Not Generated");
      this.loader = false;
      return;
    }
    if (this.quizTitle == "") {
      this.toastr.error("Enter Quiz Title");
      this.loader = false;
      return;
    }

    if (this.keywords == "") {
      this.toastr.error("Enter Keywords, Description, Tags");
      this.loader = false;
      return;
    }

    if (this.questionsCount == 0) {
      this.toastr.error("Enter Questions Count");
      this.loader = false;
      return;
    }

    if (this.quizTime == 0) {
      this.toastr.error("Enter Quiz Time in Minutes");
      this.loader = false;
      return;
    }

    if (this.description == "") {
      this.toastr.error("Enter Quiz Description");
      this.loader = false;
      return;
    }
    const curDate = moment().tz('Asia/Kolkata').add(45, 'minutes');
    const date = moment(this.learningLiveDate).tz('Asia/Kolkata');
    
    if(curDate > date){
      this.toastr.error("Quiz opening time must be greater than 45 minutes from now");
      this.loader = false;
      return;
    }
    

    if (this.edit) {
      this.apiS.updateQuestioBank(this.quizTitle, this.keywords, this.description, this.questionsCount, this.quizTime, this.fusionLearningBank, true, this.expiryDate, this.learningLiveDate, this.learningLiveTime, this.thumbnailLink, 1, this.qbId).subscribe(result => {
        if (result.status) {
          this.toastr.success(result.message);
          this.clearFilter();
        } else {
          this.toastr.error(result.message);
        }
      });
    } else {
      this.apiS.createQuestioBank(this.questionBankCode, this.quizTitle, this.keywords, this.description, this.questionsCount, this.quizTime, this.fusionLearningBank, true, this.expiryDate, this.learningLiveDate, this.learningLiveTime, this.thumbnailLink, 0).subscribe(result => {
        if (result.status) {
          this.toastr.success(result.message);
          this.clearFilter();
          if (needEdit) {
            this.router.navigate(["/pages/learning-activity/quiz/activity/edit"], { queryParams: { id: result.data._id } });
          }
        } else {
          this.toastr.error(result.message);
        }
      });
    }

  }

  clearFilter() {
    this.questionBankCode = "";
    this.keywords = "";
    this.expiryDate = "";
    this.quizTitle = "";
    this.description = "";
    this.learningLiveDate = "";
    this.learningLiveTime = "";
    this.loader = false;
    this.getIncrementalCode();
    jqeury('#tbodyAddQuestion').empty();
    this.rowIdxaddBtnQuestion = 0;
    this.router.navigate(['/pages/learning-activity/quiz']);
  }

  clearQuestionForm() {
    this.question = "";
    this.optionA = "";
    this.optionB = "";
    this.optionC = "";
    this.optionD = "";
    this.optionE = "";
    this.optionF = "";
    this.optionG = "";
    this.optionH = "";
    this.optionI = "";
    this.optionJ = "";
    this.questionId = "";
    this.answer = "";
    this.remark = "";
    this.update = false;
    this.add = false;
    this.getAllQuestionById();
  }

  getCurrentDateTime(): string {
    const now = moment().tz('Asia/Kolkata');
    const isoDateTime = now.format('YYYY-MM-DDTHH:mm');
    return isoDateTime;
  }

}
