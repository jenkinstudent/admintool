import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  map
} from 'rxjs/operators';
import {
  environment
} from 'src/environments/environment';
import {
  AuthenticationService
} from './auth.service';

import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public _headers: any;

  constructor(public http: HttpClient, public auths: AuthenticationService) {
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

   /*********************************   UserRequests   ***********************************/

  // createUserRequests
  createUserRequests(employeeCode : any, salutation : any, firstName : any,lastName:any, email : any, password : any, mobile : any,dob:any,gender:any,department:any,state:any,cluster:any,branch:any,
    designation:any) {
    const data = JSON.stringify({
      "employeeCode": employeeCode,
      "salutation": salutation,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "mobile": mobile,
      "dob": dob,
      "gender": gender,
      "department":department,
      "state":state,
      "cluster":cluster,
      "branch":branch,
      "designation":designation
    });
    return this.http.post<any>(`${environment.baseURL}/userRequests/create`, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


  /*********************************   QuizScore   ***********************************/

  // createQuizScore
  createQuizScore(data:any) {
    return this.http.post < any > (`${environment.baseURL}/quizScore/create`, data,{headers:{'Content-Type':'application/json'}})
    .pipe(map((data, re) => {
      return data;
    }));
  }

  //updateRating
  updateRating(rating:any, id : any) {
    const data = JSON.stringify({
      "rating": rating
    });
    return this.http.put<any>(`${environment.baseURL}/quizScore/rating/`+ id, data,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // singleQuizScore
  singleQuizScore(id : any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }
  
  /*********************************   Question   ***********************************/

  // getAllQuestion
  getAllQuestion(id : any) {
    return this.http.get<any>(`${environment.baseURL}/question/`+ id, )
    .pipe(map(data => {
      return data;
    }));
  }

  /*********************************   Program Watch   ***********************************/

   // UpdateProgramsWatch
   updateProgramsWatch(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}/programswatch/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // UpdateProgramsWatchForProgram
  updateProgramsWatchForProgram(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}/programswatch-program/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // UpdateProgramsWatchForC
  updateProgramsWatchForC(data: any, id: any,courseId:any) {

    return this.http.put < any > (`${environment.baseURL}/programswatch-c/` + id+`/`+courseId, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // UpdateProgramsWatchForCourse
  updateProgramsWatchForCourse(data: any, id: any,courseId:any) {

    return this.http.put < any > (`${environment.baseURL}/programswatch-course/` + id+`/`+courseId, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // UpdateProgramsWatchForModule
  updateProgramsWatchForModule(data: any, id: any,courseId:any, moduleId:any) {

    return this.http.put < any > (`${environment.baseURL}/programswatch-module/` + id+`/`+courseId+`/`+moduleId, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // // stateWiseWinners
  // stateWiseWinners(id:any) {
  //   return this.http.get<any>(`${environment.baseURL}/state-wise-winners/`+id,)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }

  // // departmentWiseWinners
  // departmentWiseWinners(id:any) {
  //   return this.http.get<any>(`${environment.baseURL}/department-wise-winners/`+id,)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }

  // // scoreWiseWinners
  // scoreWiseWinners(id:any) {
  //   return this.http.get<any>(`${environment.baseURL}/score-wise-winners/`+id,)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }
  

    //TODO: From Module Details Remove
  

  // allProgramsWatchByEmpAndDate
  allProgramsWatchByEmpAndDate(id:any,date1:any,date2:any) {
    return this.http.get<any>(`${environment.baseURL}/programswatch-emp-date/`+id+`/`+date1+'/'+date2,)
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Learning Activity Watch  ***********************************/

  // allLearningActivityWatchByEmpAndDate
  allLearningActivityWatchByEmpAndDate(id:any,date1:any,date2:any) {
    return this.http.get<any>(`${environment.baseURL}/learningactivitywatch-emp-date/`+id+`/`+date1+'/'+date2,)
      .pipe(map(data => {
        return data;
      }));
  }

  // singleLearningActivityWatchForModuleDetails
  singleLearningActivityWatchForModuleDetails(id:any,courseId:any,moduleId:any) {
    return this.http.get<any>(`${environment.baseURL}/learningactivitywatch-module-details/`+id+`/`+courseId+`/`+moduleId+`/`+this.auths.currentUserValue.id,)
      .pipe(map(data => {
        return data;
      }));
  }

   /*********************************   LearningActivityModule   ***********************************/

   // Create LearningActivityModule
   createLearningActivityModule(data: any) {

    return this.http.post < any > (`${environment.baseURL}/learningactivity-module/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Learning Activity   ***********************************/

  // allLearningActivityByEmpAndDate
  allLearningActivityByEmpAndDate(id:any,date1:any,date2:any) {
    return this.http.get<any>(`${environment.baseURL}/learningactivity-emp-date/`+id+`/`+date1+'/'+date2,)
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Course Watch   ***********************************/

    // UpdateCoursesWatch
    updateCoursesWatch(data: any, id: any) {

      return this.http.put < any > (`${environment.baseURL}/courseswatch/` + id, data, {
          headers: this._headers
        })
        .pipe(map((data, re) => {
          return data;
        }));
    }

    // UpdateCoursesWatchForCourse
    updateCoursesWatchForCourse(data: any, id: any) {
  
      return this.http.put < any > (`${environment.baseURL}/courseswatch-course/` + id, data, {
          headers: this._headers
        })
        .pipe(map((data, re) => {
          return data;
        }));
    }
  
    // UpdateCoursesWatchForModule
    updateCoursesWatchForModule(data: any, id: any,moduleId:any) {
  
      return this.http.put < any > (`${environment.baseURL}/courseswatch-module/` + id+`/`+moduleId, data, {
          headers: this._headers
        })
        .pipe(map((data, re) => {
          return data;
        }));
    }

     // allCoursesWatchByEmpAndDate
   allCoursesWatchByEmpAndDate(id:any,date1:any,date2:any) {
    return this.http.get<any>(`${environment.baseURL}/courseswatch-emp-date/`+id+`/`+date1+`/`+date2,)
      .pipe(map(data => {
        return data;
      }));
    }

  /*********************************   Module Watch   ***********************************/

    // UpdateModulesWatch
    updateModulesWatch(data: any, id: any) {

      return this.http.put < any > (`${environment.baseURL}/moduleswatch/` + id, data, {
          headers: this._headers
        })
        .pipe(map((data, re) => {
          return data;
        }));
    }

    // UpdateModulesWatchIsWatch
    updateModulesWatchIsWatch(data: any, id: any) {

      return this.http.put < any > (`${environment.baseURL}/moduleswatch-iswatch/` + id, data, {
          headers: this._headers
        })
        .pipe(map((data, re) => {
          return data;
        }));
    }


  // allModulesWatchByEmpAndDate
  allModulesWatchByEmpAndDate(id:any,date1:any,date2:any) {
    return this.http.get<any>(`${environment.baseURL}/moduleswatch-emp-date/`+id+`/`+date1+`/`+date2,)
      .pipe(map(data => {
        return data;
      }));
  }

  // All App Version
  getAllAppVersion() {

    return this.http.get < any > (`${environment.baseURL}/appversion`)
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //Files Handling

  uploadFile(filedata:any) {
    return this.http.post<any>(`${environment.baseURL}/upload-doc`, filedata)
    .pipe(map(data => {
      return data;
    }));
  }

  //Create Certificate
  createCertificate(salutation : any, firstName : any,lastName:any,department:any) {
    const data = JSON.stringify({
      "salutation": salutation,
      "firstName": firstName,
      "lastName": lastName,
      "department":department
    });
    return this.http.post<any>(`${environment.baseURL}/create-certificate`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  /*********************************   Support Request   ***********************************/

  // createCertificateData
  createCertificateData(quizId : any, quizScoreId : any,employeeId:any) {
    const data = JSON.stringify({
      "quizId": quizId,
      "quizScoreId": quizScoreId,
      "employeeId":employeeId,
    });
    return this.http.post<any>(`${environment.baseURL}/certificates/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  //Overall Snapshot
  getAllCertificates(id:any) {
    return this.http.get<any>(`${environment.baseURL}/certificatesEmp/`+id).pipe(map(data=>{
      return data;
    }));
  }

   /*********************************   Post   ***********************************/

  // createPost
  createPost(message : any,employeeId:any,images:any) {
    const data = JSON.stringify({
      "message": message,
      "employeeId":employeeId,
      "images":images
    });
    return this.http.post<any>(`${environment.baseURL}/post/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // createPostLikes
  createPostLikes(postId:any,employeeId : any) {
    const data = JSON.stringify({
      "postId": postId,
      "employeeId":employeeId
    });
    return this.http.post<any>(`${environment.baseURL}/postlikes/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // deleteModule
  deletePostLikes(pid : any,eid:any) {
    return this.http.delete<any>(`${environment.baseURL}/postlikes/`+ pid+'/'+ eid)
    .pipe(map(data => {
      return data;
    }));
  }

/*********************************   Users   ***********************************/



  // updateSingleUser
  updateSingleUser(data:any, id : any) {
    return this.http.put<any>(`${environment.baseURL}/user-update/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  //Single User
  singleUser(id : any) {
    return this.http.get<any>(`${environment.baseURL}/user/`+ id,{context: withCache()} )
    .pipe(map(data => {
      return data;
    }));
  }

  /*********************************   RewardPoints   ***********************************/

   // Create RewardPoints
   createRewardPoints(data: any) {

    return this.http.post < any > (`${environment.baseURL}/rewardPoints/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All RewardPoints By Emp
   getAllRewardPointsByEmp(id:any) {

    return this.http.get < any > (`${environment.baseURL}/rewardPoints-emp/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Total Points by EMp
  getTotalPointsByEmp(id:any) {

    return this.http.get < any > (`${environment.baseURL}/rewardPoints-total/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   RedeemReward   ***********************************/

   // Create RedeemReward
   createRedeemReward(data: any) {

    return this.http.post < any > (`${environment.baseURL}/redeemReward/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   News   ***********************************/

  //News By Category
  newsByCategory(id : any) {
    return this.http.get<any>(`${environment.baseURL}/news-category/`+ id,{context: withCache()} )
    .pipe(map(data => {
      return data;
    }));
  }

  // User Notification
  userNotification(userId:any) {
    return this.http.get<any>(`${environment.baseURL}/user/notification/`+userId,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

    // Create Notification For Admin
    createNotification(title: any, message: any, segment: any, segmentId: any) {
      const data = JSON.stringify({
        "title": title,
        "message": message,
        "segment": segment,
        "segmentId": segmentId
      });
      return this.http.post<any>(`${environment.baseURL}/notification-admin/create`, data, { headers: { 'Content-Type': 'application/json' } })
        .pipe(map(data => {
          return data;
        }));
    }

    // Update Notification
    updateNotification(nData: any) {
      const data = JSON.stringify({
        "data": nData
      });
      return this.http.put<any>(`${environment.baseURL}/notification/update`, data, { headers: { 'Content-Type': 'application/json' } })
        .pipe(map(data => {
          return data;
      }));
    }
    

  createSupport(data:any){
    return this.http.post<any>(`${environment.baseURL}/support/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }
}