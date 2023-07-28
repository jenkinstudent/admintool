import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meter-master',
  templateUrl: './meter-master.component.html',
  styleUrls: ['./meter-master.component.scss']
})
export class MeterMasterComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  data:any = [];

  constructor(public api:ApiService,public router:Router,public toastr:ToastrService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Meter' , active: true }
    ];

    this.getData();
  }

  getData(){
    this.api.getAllMeter().subscribe(res=>{
      this.data = res.data;
    });
  }

  edit(id: any) {
    this.router.navigate(['/admin/masters/meter/action/edit'], {
      queryParams: {
        id: id
      }
    })
  }

  delete(id:any,i:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'You want to delete this meter!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          this.api.deleteMeter(id).subscribe(result => {
            if (result.status === 'error') {
              Swal.fire({
                title: 'Error!',
                text:result.message,
                confirmButtonColor: 'rgb(3, 142, 220)',
                icon:'success',
              }
              );
            } else {
              this.data.splice(i,1);
              Swal.fire({
                title: 'Deleted!',
                text:'Meter deleted successfully.',
                confirmButtonColor: 'rgb(3, 142, 220)',
                icon:'success',
              }
              );
            }
          },error=>{
            Swal.fire({
              title: 'Error!',
              text:error.message,
              confirmButtonColor: 'rgb(3, 142, 220)',
              icon:'success',
            }
            );
          });
         
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          
        }
      });
   
  }
}
