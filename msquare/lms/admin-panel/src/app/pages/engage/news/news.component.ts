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
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  searchTerm = "";
  breadCrumbItems!: Array<{}>;
  imageModal = "";
  news:any=[];

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService,
    public modalService:NgbModal) {
    this.title.setTitle("News - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Engage' },
      { label: 'News' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.news=[];
    this.api.allNews().subscribe(data=>{
      this.news=data.data;
    
    })
  }


  editData(id:any){
    this.router.navigate(['/pages/engage/news/action/edit'],{
      queryParams:{id:id}
    });
  }

  deleteData(id:any){
    this.api.deleteNews(id).subscribe(data=>{
      if(data.status){
          this.toast.success(data.message);
          this.getData();
      } else {
        this.toast.error(data.message);
      }
    })
  }

  showModal(content:any, image:any){
    this.modalService.open(content,{'centered':true})
    this.imageModal=image;
  }

}
