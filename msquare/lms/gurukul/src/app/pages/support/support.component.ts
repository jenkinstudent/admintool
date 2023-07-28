import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  writeUsOpen = false;

  subject = "";
  message = "";
  file = "";
  imageModal:any="";

  baseURL=environment.baseURL;
  supportData:any = [];

  constructor(public toast: ToastrService,public modalService:NgbModal, public api:ApiService,public auth: AuthenticationService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.supportData = [];
    this.dataService.getSupports().subscribe(res=>{
      this.supportData = res.data;
    })
  }

  openModal(content:any,image:any){
    this.modalService.open(content, {
      centered: true,
    });
    this.imageModal=image;
  }

  uploadDoc(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        
        this.api.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.file = res.data.url;
          }
        });
      
    }
    
  }

  submitQuery(){
    if(this.subject != "" && this.message != ""){
      const data = JSON.stringify({
        "subject": this.subject,
        "message": this.message,
        "file": this.file,
        "employeeId": this.auth.currentUserValue.id
      });

      this.api.createSupport(data).subscribe(res=>{
        this.toast.success("Support Request Created");
        this.clear();
        this.supportData.push({subject:this.subject,message:this.message,file:this.file,status:"Pending",createdAt:new Date()})
      },error=>{
        this.toast.error(error.message);  
      });
    } else {
      this.toast.error("Enter valid Subject and Message");
    }
  }

  clear(){
    this.subject = "";
    this.file = "";
    this.message = "";
    $("#formFile").val('');
  }

}
