import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable: any;
  printData: any = [];
  data: any = [];
  employeesData: any = [];
  programsData: any = [];
  coursesData: any = [];
  modulesData: any = [];
  quizsData: any = [];
  assignedProgram: any = [];

  employeesCheckData: any = [];
  programsCheckData: any = [];
  learningActivitiesCheckData: any = [];
  coursesCheckData: any = [];
  modulesCheckData: any = [];

  learningActivitiesData: any = [];
  groups: any = [];
  departments: any = [];
  searchTerm: any = "";
  page: any = "";
  totalPages: any = "";
  hasMore: boolean = false;
  importLoader = false;

  statusFilter: any = 1;
  breadCrumbItems!: Array<{}>;
  emp: any = [];
  loading = false;

  totalEmp = 0;
  assEmp = 0;
  pendingEmp = 0;
  deacEmp = 0;

  programsAct:any = [];
  coursesAct:any = [];
  modulesAct:any = [];
  learningAct:any = [];

  searchDept: any = "";
  searchGroup: any = "";
  searchProgram: any = "";
  searchLearningActivity: any = "";
  searchCourse: any = "";
  searchModule: any = "";
  type: any = "employee";

  imageModal: any = "";

  activeId: any = 1;

  loader:any = false;

  constructor(private title: Title, public http: HttpClient, public api: ApiService, public toast: ToastrService, public router: Router, public authS: AuthenticationService,
    public modalService: NgbModal) {
    this.title.setTitle("Manager - Fusion Microfinance");
  }

  ngOnInit(): void {
    this.getData();
    this.getDatas();
    this.breadCrumbItems = [
      { label: 'Allocation' },
      { label: 'Manager', active: true }
    ];
  }

  getData() {
    this.loading = true;
    this.api.getAllUsersByPagination(1, this.searchTerm, 1).subscribe(data => {
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
  }

  getDatas() {
    this.api.getTotalEmployeesCount().subscribe(data => {
      this.totalEmp = data.totalEmp;
      this.assEmp = data.assignedEmp;
      this.pendingEmp = data.pendingEmp;
      this.deacEmp = data.deactiveEmp;
    });
    this.api.allActiveProgram().subscribe(data => {
      this.programsData = data.data;
    });
    this.api.allGroupsByEmpCount().subscribe(data => {
      this.groups = data.data;
    })
    this.api.getAllDepartments().subscribe(data => {
      this.departments = data.data;
    })
    this.api.allActiveProgramLearningActivity().subscribe(data => {
      this.learningActivitiesData = data.data;
    });
    this.api.allActiveCourse().subscribe(data => {
      this.coursesData = data.data;
    });

    this.api.allActiveModules().subscribe(data => {
      this.modulesData = data.data;
    });
  }

  next() {
    this.page = (this.page * 1) + (1 * 1);
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(this.page, this.searchTerm, this.statusFilter).subscribe(data => {
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
  }

  previous() {
    this.page = (this.page * 1) - (1 * 1);
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(this.page, this.searchTerm, 1).subscribe(data => {
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
  }

  allDeptSelection(event: any) {
    if (event.target.checked) {
      for (let emp = 0; emp < this.departments.length; emp++) {
        this.departments[emp].checked = true;
      }
    } else {
      for (let emp = 0; emp < this.departments.length; emp++) {
        this.departments[emp].checked = false;
      }
    }
  }

  allGroupSelection(event: any) {
    if (event.target.checked) {
      for (let emp = 0; emp < this.groups.length; emp++) {
        this.groups[emp].checked = true;
      }
    } else {
      for (let emp = 0; emp < this.groups.length; emp++) {
        this.groups[emp].checked = false;
      }
    }
  }

  clear() {
    this.loader = false;
    for (let emp = 0; emp < this.employeesData.length; emp++) {
      this.employeesData[emp].checked = false;
    }
    for (let emp = 0; emp < this.groups.length; emp++) {
      this.groups[emp].checked = false;
    }
    for (let emp = 0; emp < this.departments.length; emp++) {
      this.departments[emp].checked = false;
    }
  }

  allEmployeeSelection(event: any) {
    if (event.target.checked) {
      for (let emp = 0; emp < this.employeesData.length; emp++) {
        this.employeesData[emp].checked = true;
        let empIndex = this.employeesCheckData.map((res:any)=> { return res.id; }).indexOf(this.employeesData[emp]._id);
        if(empIndex == -1){
          this.employeesCheckData.push({ id: this.employeesData[emp]._id });
        }
      }
    } else {
      for (let emp = 0; emp < this.employeesData.length; emp++) {
        this.employeesData[emp].checked = false;
        let empIndex = this.employeesCheckData.map((res:any)=> { return res.id; }).indexOf(this.employeesData[emp]._id);
        if(empIndex != -1){
          this.employeesCheckData.splice(empIndex,1);
        }
      }
    }
  }

  checkGroup(event:any, index: any) {
    if(event.target.checked){
      this.groups[index].checked = true;
    }else{
      this.groups[index].checked = false;
    }
  }

  checkDept(event:any, index: any) {
    if(event.target.checked){
      this.departments[index].checked = true;
    }else{
      this.departments[index].checked = false;
    }
  }

  checkEmployee(event:any,index: any) {
    if(event.target.checked){
      this.employeesData[index].checked = true;
      let empIndex = this.employeesCheckData.map((res:any)=> { return res.id; }).indexOf(this.employeesData[index]._id);
      if(empIndex == -1){
        this.employeesCheckData.push({ id: this.employeesData[index]._id });
      }
    }else{
      this.employeesData[index].checked = false;
      let empIndex = this.employeesCheckData.map((res:any)=> { return res.id; }).indexOf(this.employeesData[index]._id);
      if(empIndex != -1){
        this.employeesCheckData.splice(empIndex,1);
      }
    }
    
  }

  checkEmpCheck(id:any){
    let empIndex = this.employeesCheckData.map((res:any)=> { return res.id; }).indexOf(id);
    if(empIndex != -1){
      return true;
    }else{
      return false
    }
  }

  searchEmployee(event: any) {
    this.searchTerm = event.target.value;
    this.getData();
  }

  nextTab(activeId: any) {
    this.activeId = activeId;
    console.log(this.employeesCheckData);
    if (this.type == 'group') {
      this.groups.map((emp: any) => {
        if (emp.checked) {
          this.api.getAllUsersByGroup(emp.group?._id).subscribe(data => {
            data.data.map((res: any) => {
              this.employeesCheckData.push({ id: res._id });
            })
          })

        }
      });
    } else {
      this.departments.map((emp: any) => {
        if (emp.checked) {
          this.api.getAllUsersByDept(emp._id).subscribe(data => {
            data.data.map((res: any) => {
              this.employeesCheckData.push({ id: res._id });
            })
          })

        }
      });
    }
  }

  dropProgram(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.programsCheckData, event.previousIndex, event.currentIndex);
    this.programsCheckData[event.currentIndex].index = event.currentIndex;
    this.programsCheckData[event.previousIndex].index = event.previousIndex;
  }

  checkProgram(item: any) {
    let cindex = this.programsCheckData.map((res:any)=> { return res._id.toString(); }).indexOf(item._id.toString());
    if(cindex == -1){
      this.programsCheckData.push(item);
    }
  }

  deleteProgram(i: any) {
    this.programsCheckData.splice(i, 1);
  }

  dropLearningActivity(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.learningActivitiesCheckData, event.previousIndex, event.currentIndex);
    this.learningActivitiesCheckData[event.currentIndex].index = event.currentIndex;
    this.learningActivitiesCheckData[event.previousIndex].index = event.previousIndex;
  }

  checkLearningActivity(item: any) {
    let cindex = this.learningActivitiesCheckData.map((res:any)=> { return res._id.toString(); }).indexOf(item._id.toString());
    if(cindex == -1){
      this.learningActivitiesCheckData.push(item);
    }
  }

  deleteLearningActivity(i: any) {
    this.learningActivitiesCheckData.splice(i, 1);
  }

  dropCourse(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coursesCheckData, event.previousIndex, event.currentIndex);
    this.coursesCheckData[event.currentIndex].index = event.currentIndex;
    this.coursesCheckData[event.previousIndex].index = event.previousIndex;
  }

  checkCourse(item: any) {
    let cindex = this.coursesCheckData.map((res:any)=> { return res._id.toString(); }).indexOf(item._id.toString());
    if(cindex == -1){
      this.coursesCheckData.push(item);
    }
  }

  deleteCourse(i: any) {
    this.coursesCheckData.splice(i, 1);
  }

  dropModule(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.modulesCheckData, event.previousIndex, event.currentIndex);
    this.modulesCheckData[event.currentIndex].index = event.currentIndex;
    this.modulesCheckData[event.previousIndex].index = event.previousIndex;
  }

  checkModule(item: any) {
    let cindex = this.modulesCheckData.map((res:any)=> { return res._id.toString(); }).indexOf(item._id.toString());
    if(cindex == -1){
      this.modulesCheckData.push(item);
    }
  }

  deleteModule(i: any) {
    this.modulesCheckData.splice(i, 1);
  }

  openModal(content: any, image: any) {
    this.modalService.open(content, {
      centered: true,
    });
    this.imageModal = image;
  }

  openEmpViewModal(content: any, id: any) {
    this.modalService.open(content, {
      size: 'fullscreen'
    });
    this.api.allProgramsWatchByEmp(id).subscribe(data=>{
      this.programsAct = data.data;
    })

    this.api.allCoursesWatchByEmp(id).subscribe(data=>{
      this.coursesAct = data.data;
    })

    this.api.allModulesWatchByEmp(id).subscribe(data=>{
      this.modulesAct = data.data;
    })

    this.api.allLearningActivityWatchByEmp(id).subscribe(data=>{
      this.learningAct = data.data;
    })
  }

  async assignProgram() {
    this.loader = true;
    const data = JSON.stringify({
      "assignedPrograms": this.programsCheckData,
      "employeeData": this.employeesCheckData,
      "type": this.type,
      "createdBy": this.authS.currentUserValue.id
    })
    this.api.createProgramsWatch(data).subscribe(res => {
      if (res.status) {
        this.toast.success(res.message);
        this.assignedProgram = [];
        this.employeesCheckData = [];
        this.programsCheckData = [];
        this.getData();
        this.clear();
      } else {
        this.toast.error(res.message);
      }
    });
  }

  async assignLearningActivity() {
    this.loader = true;
    const data = JSON.stringify({
      "assignedPrograms": this.learningActivitiesCheckData,
      "employeeData": this.employeesCheckData,
      "type": this.type,
      "createdBy": this.authS.currentUserValue.id
    })
    this.api.createLearningActivityWatch(data).subscribe(res => {
      if (res.status) {
        this.toast.success(res.message);
        this.assignedProgram = [];
        this.employeesCheckData = [];
        this.learningActivitiesCheckData = [];
        this.getData();
        this.clear();
      } else {
        this.toast.error(res.message);
      }
    });
  }

  async assignCourse() {
    this.loader = true;
    const data = JSON.stringify({
      "assignedCourses": this.coursesCheckData,
      "employeeData": this.employeesCheckData,
      "type": this.type,
      "createdBy": this.authS.currentUserValue.id
    })
    this.api.createCoursesWatch(data).subscribe(res => {
      if (res.status) {
        this.toast.success(res.message);
        this.assignedProgram = [];
        this.employeesCheckData = [];
        this.coursesCheckData = [];
        this.getData();
        this.clear();
      } else {
        this.toast.error(res.message);
      }
    });
  }

  async assignModule() {
    this.loader = true;
    const data = JSON.stringify({
      "assignedModules": this.modulesCheckData,
      "employeeData": this.employeesCheckData,
      "type": this.type,
      "createdBy": this.authS.currentUserValue.id
    })
    this.api.createModulesWatch(data).subscribe(res => {
      if (res.status) {
        this.toast.success(res.message);
        this.assignedProgram = [];
        this.employeesCheckData = [];
        this.modulesCheckData = [];
        this.getData();
        this.clear();
      } else {
        this.toast.error(res.message);
      }
    });
  }


}
