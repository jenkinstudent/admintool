import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  items:any=[];
  billType:any ="";
  constructor(public _location:Location,public apiS:ApiService,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Utility' },
      { label: 'Utility Master' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.apiS.getAllUtilityMaster().subscribe(data=>{
      this.items=data.data;
      
    });

  }

  addBillType(item:any){
    item.billTypes.push(item.billType);
    item.billType = "";
  }

  deleteBillType(index:any,item:any){
    item.billTypes.splice(index,1);
  }

  add(){
    
    this.items.push({_id:'',name:'',isElectricity:false,billTypes:[]});
  }

  
  delete(i:any){
    this.apiS.deleteUtilityMaster(this.items[i]._id).subscribe(data=>{
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.toastr.success("Utility Master Deleted Successfully");
        this.items.splice(i,1);
      }
    },error=>{
      this.toastr.error(error.message);
    });
  }

  changeElectricity(event:any,i:any){
    this.items[i].isElectricity = true;
    if(!event.target.checked){
      this.items[i].isElectricity = false;
    }
  }

  save(i:any){
    if(this.items[i]._id == undefined){
      const data = JSON.stringify({
        "name": this.items[i].name,
        "isElectricity": this.items[i].isElectricity,
        "billTypes":this.items[i].billTypes
      });
      this.apiS.createUtilityMaster(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
        } else {
          this.toastr.success("Utility Master Created Successfully");
          this.items[i]._id =  result.data._id;
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }else{
      const data = JSON.stringify({
        "name": this.items[i].name,
        "isElectricity": this.items[i].isElectricity,
        "billTypes":this.items[i].billTypes
      });
      this.apiS.updateUtilityMaster(data,this.items[i]._id).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
        } else {
          this.toastr.success("Utility Master Updated Successfully");
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
  
  }
}
