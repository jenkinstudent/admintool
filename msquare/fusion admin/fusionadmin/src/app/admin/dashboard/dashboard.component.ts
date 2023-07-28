import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import * as $ from 'jquery'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardType:any="";



  constructor(public authService:AuthenticationService,public apiS:ApiService,public toastr:ToastrService) {

   }

  ngOnInit(): void {
    if(this.authService.currentUserValue.designation.id == 'Business'){
      this.dashboardType = 'Utility';
    }else{
      this.dashboardType = 'Utility';
    }
  }

  changeDashboard(event:any) {

    if(event.target.checked){
      this.dashboardType = 'Rent';
    } else {
      this.dashboardType = 'Utility';
    }
  }

}
