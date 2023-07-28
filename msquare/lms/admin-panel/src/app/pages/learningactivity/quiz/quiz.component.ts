import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit{

  @ViewChild('table') table: any;
  dataTable:any;
  printData:any=[];
  data:any=[];
  searchTerm:any="";
  page:any="";
  totalPages:any="";
  hasMore:boolean = false;
  importLoader=false;

  statusFilter:any = 1;
  breadCrumbItems!: Array<{}>;
  emp:any=[];
  loading = false;

  courseCount=0;
  programCount=0;
  moduleCount=0;
  qbCount=0;
  
  imageModal:any = "";
  
  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: AuthenticationService,
    public modalService:NgbModal) {
    this.title.setTitle("Quiz - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.getData();
    this.breadCrumbItems = [
      { label: 'Learning Activity' },
      { label: 'Quiz' , active: true }
    ];
  }

  getData(){
    this.loading = true;
    this.api.getAllQuestionBankLearningActivity().subscribe(data=>{
      this.data = data.data;
    });

    this.api.getOverallSnapshotLearning().subscribe(data=>{
      this.courseCount = data.course;
      this.programCount = data.program;
      this.moduleCount = data.module;
      this.qbCount = data.qb;
    })
  }

  openModal(content:any,image:any){
    this.modalService.open(content, {
      centered: true,
    });
    this.imageModal=image;
  }

  editQuiz(id:String){
    this.router.navigate(['/pages/learning-activity/quiz/activity/edit'],{
      queryParams:{id:id}
    });
  }

  deleteQuiz(id:any){
    this.api.deleteQuestionBank(id).subscribe(data=>{
      if(data.status){
          this.toast.success(data.message);
          this.getData();
      } else {
        this.toast.error(data.message);
      }
    })
  }

  confirm(id:any) {
    Swal.fire({
      title: 'You are about to delete a quiz ?',
      text: 'Deleting your quiz will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.deleteQuiz(id);
      }
    });
  }


  changeQuizStatus(item:any,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusQuestioBank(item._id,status).subscribe(data=>{
      if(status == "0"){
        item.status = "0";
        this.toast.error("Quiz Status Updated");
      }else if(status == "1"){
        item.status = "1";
        this.toast.success("Quiz Status Updated");
      }
    });
  }


}
