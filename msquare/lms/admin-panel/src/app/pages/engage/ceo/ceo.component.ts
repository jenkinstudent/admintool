import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-ceo',
  templateUrl: './ceo.component.html',
  styleUrls: ['./ceo.component.scss']
})
export class CeoComponent {
  searchTerm = "";
  breadCrumbItems!: Array<{}>;
  ceos:any = [];
  imageModal = "";

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService,
    public modalService:NgbModal) {
    this.title.setTitle("CEO Message - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Engage' },
      { label: 'CEO Message' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.ceos=[];
    this.api.allCEOs().subscribe(data=>{
      this.ceos=data.data;
    })
  }

  showModal(content:any,image:any){
    this.modalService.open(content,{centered:true})
    this.imageModal=image;
  }

  editData(id:any){
    this.router.navigate(['/pages/engage/ceo-message/action/edit'],{
      queryParams:{id:id}
    });
  }

  deleteData(id:any){
    this.api.deleteCEO(id).subscribe(res=>{
      this.toast.success("CEO Message Deleted");
      this.getData();
    });
  }
}
