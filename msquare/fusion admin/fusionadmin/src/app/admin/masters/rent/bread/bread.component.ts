import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  @ViewChild('panOwnerChild') panOwnerChild!: ElementRef;
  @ViewChild('premiseImageChild') premiseImageChild!: ElementRef;
  @ViewChild('notaryChild') notaryChild!: ElementRef;
  @ViewChild('authorityChild') authorityChild!: ElementRef;
  @ViewChild('aadharChild') aadharChild!: ElementRef;
  @ViewChild('bankAccDetailsChild') bankAccDetailsChild!: ElementRef;
  @ViewChild('branchEleBillChild') branchEleBillChild!: ElementRef;
  @ViewChild('addressProofChild') addressProofChild!: ElementRef;
  @ViewChild('sneCertificateChild') sneCertificateChild!: ElementRef;
  @ViewChild('agreementChild') agreementChild!: ElementRef;
  
  breadCrumbItems!: Array<{}>;
  pageTitle = "Create Rent Master";
  statusList = [
    'Active',
    'Inactive'
  ];
  premisesType:any ="";
  propertyType:any="";
  date:any="";
  branchCode:any="";
  branchName:any="";
  securityDeposit:any="";
  monthlyRent = 0;
  totalMonthlyRent = 0;
  annualIncrementTerm:any="";
  noticePeriod:any="";
  agreementTerm:any="";
  lockinperiod:any="";
  maintenanceAmount = 0;
  areasqfeet:any="";
  isfurnished:any="";
  propertydetail:any="";
  address:any="";
  state:any="";
  division:any="";
  cluster:any="";
  city:any="";
  pincode:any="";
  zone:any="";
  landlordname:any="";
  mobileno:any="";
  pancardnumberlandlord:any="";
  landlordgstno:any="";
  bankaccountno:any="";
  ifsccode:any="";
  accountname:any="";
  stamppapervalue:any="";
  executeddate:any="";
  effectivedate:any="";
  expirydate:any="";
  lessorsignature:any="";
  lessossignature:any="";
  witnesssignature:any="";
  notaryDone:any="";
  notary:any="";
  agreementcopy:any="";
  panowner:any="";
  aadharowner:any="";
  bankaccountowner:any="";
  premiseimages:any="";
  electricityBill:any="";
  addressProof:any = "";
  authoritycopy:any="";
  room:any=false;
  hall:any=false;
  kitchen:any=false;
  bathroom:any=false;
  storeroom:any=false;
  parkingSpace:any=false;
  rentStartDate:any="";
  rentCycle:any="";
  agreement:any=[];
  fileNo:any="";
  year:any="";
  isTradeLicence:any=false;
  executedDateOfRentAgreement:any="";
  tradeLicenceFromDate:any="";
  tradeLicenceToDate:any="";
  tradeLicenceExpiryDate:any="";
  noOfManpower:any="";
  isAddressMatched:any="";
  sneCertificate:any="";

  item:any=[];
  edit=false;

  clusterList =[
    'Cluster 1',
    'Cluster 2'
  ];
  zoneList =[
    'Zone 1',
    'Zone 2'
  ];
  utilityList =[
    'Utility 1',
    'Utility 2'
  ];

  baseURL =environment.baseURL;
  id="";
  label = '';
  loader = false;
  action = 1;
  cityList:any = [
    'Pune',
    'Mumbai',
  ];
  stateList:any = [
    'Maharashtra'
  ];
  genderList:any = [];
  branches:any=[];
  zones:any=[];
  clusters:any=[];
  divisions:any=[];
  states:any=[];
  branch:any="";

  utilityMasters:any=[];
  constructor(public _location: Location,public apiS:ApiService,public toastr:ToastrService,public router:Router,public route:ActivatedRoute,public titleS:Title,
    public appC:AppComponent,public authS:AuthenticationService,public modalService:NgbModal) {}

  ngOnInit(): void {
    this.apiS.getAllBranchForSuperAdmin().subscribe(data=>{
      this.branches = data.data;
    })
    this.apiS.getAllZone().subscribe(data=>{
      this.zones = data.data;
    })

    this.apiS.getAllCluster().subscribe(data=>{
      this.clusters = data.data;
    })

    this.apiS.getAllDivision().subscribe(data=>{
      this.divisions = data.data;
    })

    this.apiS.getAllState().subscribe(data=>{
      this.states = data.data;
    })

    this.apiS.getAllUtilityMaster().subscribe(data=>{
      this.utilityMasters = data.data;
    })

    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.breadCrumbItems = [
          { label: 'Rent' },
          { label: 'Create Rent', active: true }
        ];
        this.label= "Create Rent Master";
          this.titleS.setTitle("Create Rent Master - "+this.appC.title);
      }else{
        this.edit=true;
        this.agreement = [];
        this.breadCrumbItems = [
          { label: 'Rent' },
          { label: 'Edit Rent', active: true }
        ];
        this.label= "Edit Rent Master";
          this.titleS.setTitle("Edit Rent Master - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleRent(editParam.id).subscribe(res=>{
            this.item = res.data;
            this.date =new Date(res.data.date).getFullYear()+"-"+("0"+((new Date(res.data.date).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.date).getDate()).slice(-2);
            this.branch = res.data.branch?._id;
            this.premisesType =res.data.premisesType;
            this.propertyType =res.data.propertyType;
            this.branchCode=res.data.branchCode;
            this.branchName=res.data.branchName;
            this.securityDeposit=res.data.securityDeposit;
            this.monthlyRent=res.data.monthlyRent;
            this.annualIncrementTerm=res.data.annualIncrementTerm;
            this.noticePeriod=res.data.noticePeriod;
            this.agreementTerm=res.data.agreementTerm;
            this.lockinperiod=res.data.lockInPeriod;
            this.maintenanceAmount = res.data.maintenanceAmount;
            this.totalMonthlyRent = res.data.totalMonthlyRent;
            this.areasqfeet=res.data.areaSqft;
            this.isfurnished=res.data.isFurnished;
            this.room=res.data.room;
            this.hall=res.data.hall;
            this.kitchen=res.data.kitchen;
            this.bathroom=res.data.bathroom;
            this.storeroom=res.data.storeroom;
            this.parkingSpace=res.data.parkingSpace;
            this.address=res.data.address;
            this.electricityBill = res.data.electricityBill;
            this.addressProof = res.data.addressProof;
            this.cluster=res.data.cluster;
            this.division=res.data.division;
            this.state=res.data.state;
            this.city=res.data.city;
            this.pincode=res.data.pincode;
            this.zone=res.data.zone;
            this.landlordname=res.data.landlordName;
            this.mobileno=res.data.mobileNo;
            this.pancardnumberlandlord=res.data.panLandlord;
            this.landlordgstno=res.data.gstNo;
            this.bankaccountno=res.data.bankAccNo;
            this.ifsccode=res.data.ifscCode;
            this.accountname=res.data.accName;
            this.stamppapervalue=res.data.stampPaperValue;
            this.executeddate=new Date(res.data.executedDate).getFullYear()+"-"+("0"+((new Date(res.data.executedDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.executedDate).getDate()).slice(-2);
            this.effectivedate=new Date(res.data.effectiveDate).getFullYear()+"-"+("0"+((new Date(res.data.effectiveDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.effectiveDate).getDate()).slice(-2);
            this.expirydate=new Date(res.data.expiryDate).getFullYear()+"-"+("0"+((new Date(res.data.expiryDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.expiryDate).getDate()).slice(-2);
            this.lessorsignature=res.data.lessorSignature;
            this.lessossignature=res.data.lessosSignature;
            this.witnesssignature=res.data.witnessSignature;
            this.notaryDone=res.data.notaryDone;
            this.notary=res.data.notary;
            this.agreement=res.data.agreement;
            this.panowner=res.data.panOwner;
            this.aadharowner=res.data.aadharOwner;
            this.bankaccountowner=res.data.bankAccDetailsOwner;
            this.premiseimages=res.data.premiseImage;
            this.authoritycopy=res.data.authorityCopy;
            this.rentCycle=res.data.rentCycle;
            this.rentStartDate =new Date(res.data.rentStartDate).getFullYear()+"-"+("0"+((new Date(res.data.rentStartDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.rentStartDate).getDate()).slice(-2);
            this.isTradeLicence=res.data.isTradeLicence;
            this.executedDateOfRentAgreement=new Date(res.data.executedDateOfRentAgreement).getFullYear()+"-"+("0"+((new Date(res.data.executedDateOfRentAgreement).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.executedDateOfRentAgreement).getDate()).slice(-2);
            this.tradeLicenceFromDate=new Date(res.data.tradeLicenceFromDate).getFullYear()+"-"+("0"+((new Date(res.data.tradeLicenceFromDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.tradeLicenceFromDate).getDate()).slice(-2);
            this.tradeLicenceToDate=new Date(res.data.tradeLicenceToDate).getFullYear()+"-"+("0"+((new Date(res.data.tradeLicenceToDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.tradeLicenceToDate).getDate()).slice(-2);
            this.tradeLicenceExpiryDate=new Date(res.data.tradeLicenceExpiryDate).getFullYear()+"-"+("0"+((new Date(res.data.tradeLicenceExpiryDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.tradeLicenceExpiryDate).getDate()).slice(-2);
            this.noOfManpower=res.data.noOfManpower;
            this.isAddressMatched=res.data.isAddressMatched;
            this.sneCertificate=res.data.sneCertificate;
            this.calculateMonthlyRent();
            for(let i = 0;i<this.utilityMasters.length;i++){
              if(res.data?.facility.some((code:any) =>code._id === this.utilityMasters[i]._id)){
                this.utilityMasters[i].checked = true;
              }
            }
          })
        });
      }
    });
  }

  getBranch(event:any){
    this.branch = this.branches[event]._id;
    this.premisesType = this.branches[event].premisesType;
    this.propertyType = this.branches[event].propertyType;
    this.branchCode = this.branches[event].code;
    this.branchName = this.branches[event].name;
    this.address = this.branches[event].address;
    this.zone = this.branches[event].zone;
    this.cluster=this.branches[event].cluster;
    this.division=this.branches[event].division;
    this.state=this.branches[event].state;

  }

  uploadLessorSignature(event: any): void {
    this.lessorsignature = event.target.value;
  }

  uploadLessosSignature(event: any): void {
    this.lessossignature = event.target.value;
  }

  uploadisTradeLicence(event: any): void {
    this.isTradeLicence = event.target.value;
  }

  uploadWitnessSignature(event: any): void {
    this.witnesssignature = event.target.value;
  }

  uploadNotaryDone(event: any): void {
    this.notaryDone = event.target.value;
  }

  getFacility(i:any){
    this.utilityMasters[i].checked = true;
  }
  uploadNotary(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.notaryChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.notary =res.data.url;
          }
        });
       
      
    }
  }

  uploadElectricityBill(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.branchEleBillChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.electricityBill =res.data.url;
          }
        });
      
    }
  }

  uploadAddressProof(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.addressProofChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.addressProof =res.data.url;
          }
        });
      
    }
  }

  uploadAgreementCopy(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.agreementChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.agreementcopy =res.data.url;
          }
        });
      
    }
  }

  uploadSneCertificate(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.sneCertificateChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.sneCertificate =res.data.url;
          }
        });
      
    }
  }

  deleteData(index:any){
    this.agreement.splice(index,1);
  }

  addAgreement(){
    this.agreement.push({file:this.agreement,fileNo:this.fileNo,year:this.year});
    this.modalService.dismissAll();
  }
  add(){
    this.agreement.push({file:'',fileNo:'',year:''});
  }

  openModal(content:any){
    this.modalService.open(content, { size: 'md', centered: true });
  }

  uploadPanOwner(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.panOwnerChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.panowner =res.data.url;
          }
        });
      
    }
  }

  uploadAadharOwner(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.aadharChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.aadharowner =res.data.url;
          }
        });
      
    }
  }

  uploadBankAccDetails(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.bankAccDetailsChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.bankaccountowner =res.data.url;
          }
        });
      
    }
  }

  uploadPremiseImage(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.premiseImageChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.premiseimages =res.data.url;
          }
        });
      
    }
  }

  uploadAuthorityCopy(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.authorityChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.authoritycopy =res.data.url;
          }
        });
      
    }
  }


  changeRoomProperty(event:any){
    this.room = true;
    if(!event.target.checked){
      this.room = false;
    }
  }

  changeHallProperty(event:any){
    this.hall = true;
    if(!event.target.checked){
      this.hall = false;
    }
  }
  
  changeKitchenProperty(event:any){
    this.kitchen = true;
    if(!event.target.checked){
      this.kitchen = false;
    }
  }

  changeBathroomProperty(event:any){
    this.bathroom = true;
    if(!event.target.checked){
      this.bathroom = false;
    }
  }

  changeStoreroomProperty(event:any){
    this.storeroom = true;
    if(!event.target.checked){
      this.storeroom = false;
    }
  }

  changeParkingSpaceProperty(event:any){
    this.parkingSpace = true;
    if(!event.target.checked){
      this.parkingSpace = false;
    }
  }

  save(){
    this.loader=true;


    if(this.landlordname == ''){
      this.toastr.error("Please enter landlord name");
      this.loader = false;
      return;
    }

    if(this.bankaccountno == ''){
      this.toastr.error("Please enter bank account no.");
      this.loader = false;
      return;
    }

    if(this.ifsccode == ''){
      this.toastr.error("Please enter ifsc code");
      this.loader = false;
      return;
    }

    if(this.accountname == ''){
      this.toastr.error("Please enter account name");
      this.loader = false;
      return;
    }


    if(this.panowner == ''){
      this.toastr.error("Please upload pan card of owner");
      this.loader = false;
      return;
    }

    if(this.aadharowner == ''){
      this.toastr.error("Please upload aadhar card of owner");
      this.loader = false;
      return;
    }

    if(this.bankaccountowner == ''){
      this.toastr.error("Please upload bank account details of owner");
      this.loader = false;
      return;
    }

    if(this.premiseimages == ''){
      this.toastr.error("Please upload premise image");
      this.loader = false;
      return;
    }


    if(this.notary == ''){
      this.toastr.error("Please upload notary");
      this.loader = false;
      return;
    }

    let finalData:any=[];
    this.utilityMasters.map((res:any)=>{
      if(res.checked){
        finalData.push(res._id);
      }
    })

    if(this.edit){
      let updatedData = {
        "premisesType":this.premisesType,
        "propertyType":this.propertyType,
        "date":this.date,
        "branch":this.branch,
        "branchCode":this.branchCode,
        "branchName":this.branchName,
        "securityDeposit":this.securityDeposit,
        "monthlyRent":this.monthlyRent,
        "annualIncrementTerm":this.annualIncrementTerm,
        "noticePeriod":this.noticePeriod,
        "agreementTerm":this.agreementTerm,
        "lockInPeriod":this.lockinperiod,
        "maintenanceAmount":this.maintenanceAmount,
        "totalMonthlyRent":this.totalMonthlyRent,
        "areaSqft":this.areasqfeet,
        "isFurnished":this.isfurnished,
        "room":this.room,
        "hall":this.hall,
        "kitchen":this.kitchen,
        "bathroom":this.bathroom,
        "storeroom":this.storeroom,
        "parkingSpace":this.parkingSpace,
        "address":this.address,
        "state":this.state,
        "cluster":this.cluster,
        "facility":finalData,
        "division":this.division,
        "city":this.city,
        "pincode":this.pincode,
        "zone":this.zone,
        "landlordName":this.landlordname,
        "mobileNo":this.mobileno,
        "panLandlord":this.pancardnumberlandlord,
        "gstNo":this.landlordgstno,
        "bankAccNo":this.bankaccountno,
        "ifscCode":this.ifsccode,
        "accName":this.accountname,
        "stampPaperValue":this.stamppapervalue,
        "executedDate":this.executeddate,
        "effectiveDate":this.effectivedate,
        "expiryDate":this.expirydate,
        "lessorSignature":this.lessorsignature,
        "lessosSignature":this.lessossignature,
        "witnessSignature":this.witnesssignature,
        "notaryDone":this.notaryDone,
        "notary":this.notary,
        "agreementCopy":this.agreementcopy,
        "agreement":this.agreement,
        "panOwner":this.panowner,
        "aadharOwner":this.aadharowner,
        "electricityBill":this.electricityBill,
        "addressProof":this.addressProof,
        "bankAccDetailsOwner":this.bankaccountowner,
        "premiseImage":this.premiseimages,
        "authorityCopy":this.authoritycopy,
        "rentCycle":this.rentCycle,
        "rentStartDate":this.rentStartDate,
        "isTradeLicence":this.isTradeLicence,
        "executedDateOfRentAgreement":this.executedDateOfRentAgreement,
        "tradeLicenceFromDate":this.tradeLicenceFromDate,
        "tradeLicenceToDate":this.tradeLicenceToDate,
        "tradeLicenceExpiryDate":this.tradeLicenceExpiryDate,
        "noOfManpower":this.noOfManpower,
        "isAddressMatched":this.isAddressMatched,
        "sneCertificate":this.sneCertificate
      };
      const data = JSON.stringify(updatedData);
      this.apiS.updateRent(data,this.id).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          const aData = JSON.stringify({
            "user": this.authS.currentUserValue.id,
            "rent":this.id,
            "currentData":this.item,
            "updatedData":updatedData
          })
          this.apiS.createActivity(aData).subscribe(uResult => {
            if (uResult.status === 'error') {
              this.toastr.error(uResult.message);
              this.loader = false;
            } else {
              this.toastr.success("New Record Updated Successfully");
              this.loader = false;
            }
          },error=>{
            this.toastr.error(error.message);
            this.loader = false;
          });
          
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }else{
      const data = JSON.stringify({
        "premisesType":this.premisesType,
        "propertyType":this.propertyType,
        "date":this.date,
        "branch":this.branch,
        "branchCode":this.branchCode,
        "branchName":this.branchName,
        "securityDeposit":this.securityDeposit,
        "monthlyRent":this.monthlyRent,
        "annualIncrementTerm":this.annualIncrementTerm,
        "noticePeriod":this.noticePeriod,
        "agreementTerm":this.agreementTerm,
        "lockInPeriod":this.lockinperiod,
        "maintenanceAmount":this.maintenanceAmount,
        "totalMonthlyRent":this.totalMonthlyRent,
        "areaSqft":this.areasqfeet,
        "isFurnished":this.isfurnished,
        "room":this.room,
        "hall":this.hall,
        "kitchen":this.kitchen,
        "bathroom":this.bathroom,
        "storeroom":this.storeroom,
        "parkingSpace":this.parkingSpace,
        "address":this.address,
        "state":this.state,
        "cluster":this.cluster,
        "division":this.division,
        "agreement":this.agreement,
        "city":this.city,
        "facility":finalData,
        "pincode":this.pincode,
        "zone":this.zone,
        "landlordName":this.landlordname,
        "mobileNo":this.mobileno,
        "panLandlord":this.pancardnumberlandlord,
        "gstNo":this.landlordgstno,
        "bankAccNo":this.bankaccountno,
        "ifscCode":this.ifsccode,
        "accName":this.accountname,
        "stampPaperValue":this.stamppapervalue,
        "executedDate":this.executeddate,
        "effectiveDate":this.effectivedate,
        "expiryDate":this.expirydate,
        "lessorSignature":this.lessorsignature,
        "lessosSignature":this.lessossignature,
        "witnessSignature":this.witnesssignature,
        "notaryDone":this.notaryDone,
        "notary":this.notary,
        "agreementCopy":this.agreementcopy,
        "panOwner":this.panowner,
        "aadharOwner":this.aadharowner,
        "electricityBill":this.electricityBill,
        "addressProof":this.addressProof,
        "bankAccDetailsOwner":this.bankaccountowner,
        "premiseImage":this.premiseimages,
        "authorityCopy":this.authoritycopy,
        "rentCycle":this.rentCycle,
        "rentStartDate":this.rentStartDate,
        "isTradeLicence":this.isTradeLicence,
        "executedDateOfRentAgreement":this.executedDateOfRentAgreement,
        "tradeLicenceFromDate":this.tradeLicenceFromDate,
        "tradeLicenceToDate":this.tradeLicenceToDate,
        "tradeLicenceExpiryDate":this.tradeLicenceExpiryDate,
        "noOfManpower":this.noOfManpower,
        "isAddressMatched":this.isAddressMatched,
        "sneCertificate":this.sneCertificate
      });
      this.apiS.createRent(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          const bData= JSON.stringify({
            "isRent":true
          })
          this.apiS.updateBranch(bData,this.branch).subscribe(uResult => {
            if (uResult.status === 'error') {
              this.toastr.error(uResult.message);
              this.loader = false;
            } else {
              this.toastr.success("New Record Created Successfully");
              this.loader = false;
              this.clearFilter();
              this.router.navigate(['/admin/masters/rent']);
            }
          },error=>{
            this.toastr.error(error.message);
            this.loader = false;
          });
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }
   
  }

  calculateMonthlyRent(){
    this.totalMonthlyRent = (this.monthlyRent * 1) + (this.maintenanceAmount * 1);
  }

  clearFilter(){
    this.premisesType ="";
    this.propertyType ="";
    this.date="";
    this.branchCode="";
    this.branchName="";
    this.securityDeposit="";
    this.monthlyRent=0;
    this.annualIncrementTerm="";
    this.noticePeriod="";
    this.agreementTerm="";
    this.lockinperiod="";
    this.maintenanceAmount = 0;
    this.totalMonthlyRent = 0;
    this.areasqfeet="";
    this.isfurnished="";
    this.room=false;
    this.hall = false;
    this.kitchen =false;
    this.bathroom =false;
    this.storeroom =false;
    this.parkingSpace =false;
    this.address="";
    this.state="";
    this.cluster = "";
    this.division = "";
    this.city="";
    this.pincode="";
    this.zone="";
    this.landlordname="";
    this.mobileno="";
    this.pancardnumberlandlord="";
    this.landlordgstno="";
    this.bankaccountno="";
    this.ifsccode="";
    this.accountname="";
    this.stamppapervalue="";
    this.executeddate="";
    this.effectivedate="";
    this.agreement=[];
    this.expirydate="";
    this.lessorsignature="";
    this.lessossignature="";
    this.notaryDone="";
    this.witnesssignature="";
    this.electricityBill = "";
    this.addressProof = "";
    this.notary="";
    this.branch="";
    this.agreementcopy="";
    this.panowner="";
    this.aadharowner="";
    this.bankaccountowner="";
    this.premiseimages="";
    this.authoritycopy="";
    this.isTradeLicence=false,
    this.executedDateOfRentAgreement="";
    this.tradeLicenceFromDate="";
    this.tradeLicenceToDate="";
    this.tradeLicenceExpiryDate="";
    this.noOfManpower="";
    this.isAddressMatched="";
    this.sneCertificate="";
    this.utilityMasters.map((res:any)=>{
      if(res.checked){
        res.checked = false;
      }
    })
  }

  changeTab(tabNo : number){
    
  }

}
