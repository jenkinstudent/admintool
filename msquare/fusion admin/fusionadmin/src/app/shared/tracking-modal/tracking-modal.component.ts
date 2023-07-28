import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tracking-modal',
  templateUrl: './tracking-modal.component.html',
  styleUrls: ['./tracking-modal.component.scss']
})
export class TrackingModalComponent implements OnInit {

  @Input() id: string | undefined;
  @Input() type: string | undefined;
  
  data:any=[];
  fdata:any=[];
  item:any=[];
  
  baseURL = environment.baseURL;
  constructor(public modalService:NgbModal,public apiS:ApiService,public authS:AuthenticationService) { }

  ngOnInit(): void {
    if(this.type == 'utility'){
      this.apiS.getSingleUtilityBill(this.id).subscribe(data=>{
        this.data = data.data.verifyStatus;
        this.fdata = data.data.fverifyStatus;
        this.item = data.data;
      })
    }else if(this.type == 'courier'){
      this.apiS.getSingleCourier(this.id).subscribe(data=>{
        this.data = data.data.verifyStatus;
        this.fdata = data.data.fverifyStatus;
        this.item = data.data;
      })
    }else if(this.type == 'rent'){
      this.apiS.getSingleRentBill(this.id).subscribe(data=>{
        this.data = data.data.verifyStatus;
        this.fdata = data.data.fverifyStatus;
        this.item = data.data;
      })
    }
    
  }


  close(){
    this.modalService.dismissAll();
  }
}
