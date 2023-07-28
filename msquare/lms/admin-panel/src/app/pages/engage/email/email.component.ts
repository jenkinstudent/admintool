import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from 'src/app/core/services/api.service';
// import { Email } from './mailbox.model';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public Editor = ClassicEditor;
  breadCrumbItems!: Array<{}>;

  searchTerm:any = [];

  type= "Individual";
  mails: any = [];
  users:any = [];
  constructor(private modalService: NgbModal,public apiS:ApiService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Engage' },
      { label: 'Email', active: true }
    ];
    this.getData();
  }

  getData() {
    this.apiS.getAllMail().subscribe(data=>{
      this.mails = data.data;
    })
  }

  getUsersData(item:any){
    this.users = [];
    this.users = item.to;
  }

  changeData(type:any){
    this.type = type;
    this.mails = [];
    this.apiS.getAllMailByType(this.type).subscribe(data=>{
      this.mails = data.data;
    })
  }


  open(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  onSettingsButtonClicked() {
    document.body.classList.toggle('email-detail-show');
  }

  public hide() {
    document.body.classList.remove('email-detail-show');
  }



}
