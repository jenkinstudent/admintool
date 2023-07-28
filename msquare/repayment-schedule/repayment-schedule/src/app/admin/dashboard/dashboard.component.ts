import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader=false;
  kpi :any= {
    total: 0,
    paid: 0,
    unpaid: 0,
    cancel:0,
    totalAmt:0,
    paidAmt:0,
    unpaidAmt:0,
    cancelAmt:0
  }

  statusTerm:any="";
  searchTerm:any="";
  baseUrl = environment.baseURL;
  date1:any="";
  date2:any="";

  constructor(public apiS:ApiService,
    public toast:ToastrService,public router:Router,public titleS:Title,public appC:AppComponent,public modalService:NgbModal,
    public toastr:ToastrService) {
      this.titleS.setTitle("Dashboard - "+appC.title);

  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Dashboard' , active: true}
    ];

    /**
     * fetches data
     */
     this._fetchData();
  }

  /**
 * User grid data fetches
 */
   private _fetchData() {
    this.data = [];
    this.apiS.getAllMT().subscribe(data => {
      this.data = data.data;
      setTimeout(() => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable({
          "searching":   false,
          "lengthChange": false,
          "info":     false
      });
      }, 500);
    }, error => {
      this.toast.error(error.message);
    });
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }

  view(id:any){
    this.router.navigate(['/admin/action/view'],{
      queryParams:{id: id}
    })
}

changeDate(event:any){
  var date = event.target.value.split(' to ');
  if(date.length == 2){
    this.date1 = date[0];
    this.date2 = date[1];
  }
}

download(){
  this.loader = true;
  const data = JSON.stringify({
    "date1" : this.date1,
    "date2" : this.date2
  })
  this.apiS.downloadMT(data).subscribe(result => {
    this.toastr.success("File Download Success");
    let link = environment.baseURL+'download/'+result.data;
    console.log(link);
    window.open(link, "_blank");
    this.loader = false;
    this.modalService.dismissAll();
  },error=>{
    this.toastr.error(error.message);
    this.loader = false;
  });

}

}
