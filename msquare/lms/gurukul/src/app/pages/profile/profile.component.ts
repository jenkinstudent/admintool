import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dimensions, ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild("profilePhotoFile") profilePhotoFile!: ElementRef;
  user:any="";
  baseURL=environment.baseURL;
  currentPassword:any = "";
  newPassword:any = "";
  confirmPassword:any = "";
  profileCount:any= 0;
  department:any = "";
  designation:any = "";
  departmentCount:any = 0;
  designationCount:any = 0;
  mobile:any=this.authS.currentUserValue.mobile;
  whatsapp:any=this.authS.currentUserValue.whatsappNo;
  email:any=this.authS.currentUserValue.email;


  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  croppedImageFile:any;

  capturePhotoS =false;


  constructor(public authS:AuthenticationService,public apiS:ApiService,public toastr:ToastrService,public userService:UserProfileService,public modal: NgbModal) { }

  ngOnInit(): void {
    this.apiS.singleUser(this.authS.currentUserValue.id).subscribe(data=>{
      this.profileCount = (data.data.profileCount == undefined)?0:data.data.profileCount;
      this.user = data.data;
      console.log(this.user);
      this.department = data.data.department;
      this.designation = data.data.designation;
      this.departmentCount = (data.data.departmentCount == undefined)?0:data.data.departmentCount;
      this.designationCount = (data.data.designationCount == undefined)?0:data.data.designationCount;
    })
  }

  async base64toFile(base64:any, filename:any, mimeType:any) {
    const response = await fetch(base64);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: mimeType });
    return file;
  }

  async capturePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
  
      // Do something with the captured image (e.g., display it)\
      this.imageChangedEvent  = image.dataUrl;
      this.capturePhotoS = true;
        console.log(this.imageChangedEvent)
      // const file = this.base64toFile(image.dataUrl, "image.jpg", "image/jpeg");
      // file.then((value:any)=>{
      //   console.log(value);
      //   this.imageChangedEvent =  value;
        
      // });
      // const blob = this.dataURItoBlob(image.dataUrl);
      // console.log(blob)
      // let fileData = new FormData();
      // fileData.append('file', blob);
      // this.apiS.uploadFile(fileData).subscribe(res => {
      //   if (res.data) {
      //     const data =JSON.stringify({
      //       "dummyphoto":res.data.url,
      //       "photoStatus":"Pending",
      //       "profileUpdate":true
      //     })
      //     this.apiS.updateSingleUser(data,this.authS.currentUserValue.id).subscribe(data=>{
      //       if(data.status){
      //         this.toastr.success("Profile Photo Updated Successfully");
      //         this.user.photoStatus = "Pending";
      //         this.user.dummyphoto = res.data.url;
      //         this.closeModal();
      //       }else{
      //         this.toastr.error(data.message);
      //       }
      //     });
      //   }
      // });
    } catch (error) {
      console.log('Error capturing photo', error);
    }
  }

  inputFileClick() {
    document.getElementById('choosefile')?.click();
}

  dataURItoBlob(dataURI:any) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mimeString });
  }

  saveChanges(){
    if(this.email != '' && this.mobile != ''){
      const data =JSON.stringify({
        "email":this.email,
        "mobile":this.mobile,
        "whatsappNo": this.whatsapp,
        "department":this.department,
        "designation":this.designation,
        "departmentCount":(this.departmentCount*1 + 1*1),
        "designationCount":(this.designationCount*1 + 1*1)
      })
      this.apiS.updateSingleUser(data,this.authS.currentUserValue.id).subscribe(data=>{
        if(data.status){
          let localData = {
            "id": this.authS.currentUserValue.id, 
            "email": this.email,
            "salutation": this.user.salutation,
            "firstName": this.user.firstName,
            "lastName": this.user.lastName,
            "mobile": this.mobile,
            "whatsappNo": this.whatsapp,
            "dob": this.user.dob,
            "gender": this.user.gender,
            "photo": this.user.profilephoto,
            "accessToken": this.authS.currentUserValue.accessToken,
            "refreshToken": this.authS.currentUserValue.refreshToken,
            "lastLoginOn": this.authS.currentUserValue.lastLoginOn
          }
          localStorage.setItem('currentUser', JSON.stringify(localData));
          this.authS.updateData(localData);
          if(this.departmentCount == 0 && this.designationCount == 0){
            this.user.department = this.department;
            this.user.designation = this.designation;
            this.designationCount = (this.designationCount*1 + 1*1);
            this.departmentCount = (this.departmentCount*1 + 1*1);
          }
        }else{
          this.toastr.error(data.message);
        }
      })
    }else{
      this.toastr.error("Please fill all details");
    }
   
  
  }

  uploadDoc(): void {
    let fileData: FormData = new FormData();
        fileData.append('file', this.croppedImageFile);
        
        this.apiS.uploadFile(fileData).subscribe(res => {
          console.log(res);
          if (res.data) {
            const data =JSON.stringify({
              "dummyphoto":res.data.url,
              "photoStatus":"Pending",
              "profileUpdate":true
            })
            this.apiS.updateSingleUser(data,this.authS.currentUserValue.id).subscribe(data=>{
              if(data.status){
                this.toastr.success("Profile Photo Updated Successfully");
                this.user.photoStatus = "Pending";
                this.user.dummyphoto = res.data.url;
                this.closeModal();
              }else{
                this.toastr.error(data.message);
              }
            });
          }
        });
    
  }

  changePassword(){
    if(this.currentPassword == ""){
      this.toastr.error("Enter Current Passowrd")
      return;
    }

    if(this.newPassword == ""){
      this.toastr.error("Enter New Passowrd")
      return;
    }

    if(this.confirmPassword == ""){
      this.toastr.error("Enter Confirm Passowrd")
      return;
    }

    if(this.confirmPassword != this.newPassword){
      this.toastr.error("Enter Same New and Confirm Passowrd")
      return;
    }

    this.userService.changePassword(this.authS.currentUserValue.id,this.currentPassword,this.newPassword).subscribe(res=>{
      if(res.status == "success"){
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });


  }

  closeModal(){
    this.croppedImage = "";
    this.croppedImageFile = "";
    this.imageChangedEvent = "";
    this.modal.dismissAll();
  }

  openModal(content:any){
    
    this.modal.open(content, {
      centered: true,
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.capturePhotoS = false;
    this.profilePhotoFile.nativeElement.value = "";
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.croppedImageFile = base64ToFile(this.croppedImage);
      // console.log(event, base64ToFile(this.croppedImage));
  }

  imageLoaded() {
    this.showCropper = true;
    // console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      // console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      // console.log('Load failed');
  }

  getPlatform(): String{
    return Capacitor.getPlatform();
  }
  
}
