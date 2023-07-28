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

  
  /*********************************   Question Bank   ***********************************/

  // createQuestioBank
  createQuestioBank(code: any, title: any, keywords: any, description: any, questionCount: any, quizTime: any,fusionBank:any,isLearningActivity:any, expiryDate:any, learningLiveDate:any ,learningLiveTime:any, thumbnail:any, status: any) {

    const data = JSON.stringify({
      "code": code,
      "title": title,
      "keywords": keywords,
      "description": description,
      "questionsCount": questionCount,
      "quizTime": quizTime,
      "fusionBank":fusionBank,
      "isLearningActivity":isLearningActivity,
      "expiryDate":expiryDate,
      "learningLiveDate":learningLiveDate,
      "learningLiveTime":learningLiveTime,
      "status": status,
      "thumbnail":thumbnail
    });
    return this.http.post<any>(`${environment.baseURL}/question-bank/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // updateQuestioBank
  updateQuestioBank(title: any, keywords: any, description: any, questionCount: any, quizTime: any,fusionBank:any,isLearningActivity:any, expiryDate:any, learningLiveDate:any ,learningLiveTime:any ,thumbnail:any, status: any, id: any) {
    const data = JSON.stringify({
      "title": title,
      "keywords": keywords,
      "description": description,
      "questionsCount": questionCount,
      "quizTime": quizTime,
      "fusionBank":fusionBank,
      "expiryDate":expiryDate,
      "isLearningActivity":isLearningActivity,
      "learningLiveDate":learningLiveDate,
      "learningLiveTime":learningLiveTime,
      "thumbnail":thumbnail
    });
    return this.http.put<any>(`${environment.baseURL}/question-bank/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // getSingleQuestionBank
  getSingleQuestionBank(id: any) {
    return this.http.get<any>(`${environment.baseURL}/question-bank/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteQuestionBank
  deleteQuestionBank(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/question-bank/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // getAllQuestionBank
  getAllQuestionBank() {
    return this.http.get<any>(`${environment.baseURL}/question-bank`)
      .pipe(map(data => {
        return data;
      }));
  }


  // getAllQB
  getAllQB() {
    return this.http.get<any>(`${environment.baseURL}/question-bank-all`)
      .pipe(map(data => {
        return data;
      }));
  }

   // getAllActiveQuestionBank
   getAllActiveQuestionBank() {
    return this.http.get<any>(`${environment.baseURL}/question-bank-active`)
      .pipe(map(data => {
        return data;
      }));
  }


   // getAllActiveQuestionBank
   getAllInactiveQuestionBank() {
    return this.http.get<any>(`${environment.baseURL}/question-bank-inactive`)
      .pipe(map(data => {
        return data;
      }));
  }

  // getAllQuestionBankLearningActivity
  getAllQuestionBankLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/question-bank-learning`)
      .pipe(map(data => {
        return data;
      }));
  }

   // getAllActiveQuestionBankLearningActivity
   getAllActiveQuestionBankLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/question-bank-learning-active`)
      .pipe(map(data => {
        return data;
      }));
  }


   // getAllActiveQuestionBankLearningActivity
   getAllInactiveQuestionBankLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/question-bank-learning-inactive`)
      .pipe(map(data => {
        return data;
      }));
  }

  // getIncrementalCodeQuestionBank
  getIncrementalCodeQuestionBank() {
    return this.http.post<any>(`${environment.baseURL}/question-bank/incremental-code`, "")
      .pipe(map(data => {
        return data;
      }));
  }

  // updateStatusQuestioBank
  updateStatusQuestioBank(id: any, status: string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/question-bank/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


  /*********************************   Question   ***********************************/

  // createQuestion
  createQuestion(questionBankId: any, question: any, optionA: any, optionB: any, optionC: any, optionD: any,optionE: any, optionF: any, optionG: any, optionH: any, optionI: any, optionJ: any, answer: any,remark:any) {
    const data = JSON.stringify({
      "questionBankId": questionBankId,
      "question": question,
      "optionA": optionA,
      "optionB": optionB,
      "optionC": optionC,
      "optionD": optionD,
      "optionE": optionE,
      "optionF": optionF,
      "optionG": optionG,
      "optionH": optionH,
      "optionI": optionI,
      "optionJ": optionJ,
      "answer": answer,
      "remark": remark
    });
    return this.http.post<any>(`${environment.baseURL}/question/create/single`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // updateQuestion
  updateQuestion(questionBankId: any, question: any, optionA: any, optionB: any, optionC: any, optionD: any,optionE: any, optionF: any, optionG: any, optionH: any, optionI: any, optionJ: any, answer: any,remark:any, id: any) {
    const data = JSON.stringify({
      "questionBankId": questionBankId,
      "question": question,
      "optionA": optionA,
      "optionB": optionB,
      "optionC": optionC,
      "optionD": optionD,
      "optionE": optionE,
      "optionF": optionF,
      "optionG": optionG,
      "optionH": optionH,
      "optionI": optionI,
      "optionJ": optionJ,
      "answer": answer,
      "remark": remark
    });
    return this.http.put<any>(`${environment.baseURL}/question/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }
  //getSingleQuestion
  singleQuestion(id: any) {
    return this.http.get<any>(`${environment.baseURL}/singleQuestion/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }


  // getAllQuestion
  getAllQuestion(id: any) {
    return this.http.get<any>(`${environment.baseURL}/question/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteQuestion
  deleteQuestion(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/question/delete/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // createBulkQuestion
  createBulkQuestion(questions: any) {
    const data = JSON.stringify({
      "questions": questions
    });
    return this.http.post<any>(`${environment.baseURL}/question/create/bulk`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }



  /*********************************   Module   ***********************************/

  // createModule
  createModule(data:any) {
    return this.http.post<any>(`${environment.baseURL}/module/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // updateModule
  updateModule(data:any, id: any) {
    return this.http.put<any>(`${environment.baseURL}/module/update-module/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // singleModule
  singleModule(id: any) {
    return this.http.get<any>(`${environment.baseURL}/module/` + id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteModule
  deleteModule(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/module/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allModules
  allModules() {
    return this.http.get<any>(`${environment.baseURL}/module`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allMod
  allMod() {
    return this.http.get<any>(`${environment.baseURL}/module-all`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allModulesWatches
  allModulesWatches() {
    return this.http.get<any>(`${environment.baseURL}/modulewatches`)
      .pipe(map(data => {
        return data;
      }));
  }

   // allModulesWatchesByEmp
   allModulesWatchesByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/modulewatches/`+id)
      .pipe(map(data => {
        return data;
      }));
  }

  // allActiveModules
  allActiveModules() {
    return this.http.get<any>(`${environment.baseURL}/module-active`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }
  // allInactiveModules
  allInactiveModules() {
    return this.http.get<any>(`${environment.baseURL}/module-inactive`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allModulesLearningActivity
  allModulesLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/module-learning`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allActiveModulesLearningActivity
  allActiveModulesLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/module-learning-active`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }
  // allInactiveModulesLearningActivity
  allInactiveModulesLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/module-learning-inactive`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // getIncrementalCodeModule
  getIncrementalCodeModule() {
    return this.http.post<any>(`${environment.baseURL}/module/incremental-code`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Learning Activity   ***********************************/

   // allLearningActivity
   allLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/learningactivity`,)
      .pipe(map(data => {
        return data;
      }));
  }

   // allLearningActivityByEmp
   allLearningActivityByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/learningactivity-emp/`+id,)
      .pipe(map(data => {
        return data;
      }));
  }


  // updateStatusModule
  updateStatusModule(id: any, status: string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/module/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Program Watch   ***********************************/

  // createProgramsWatch
  createProgramsWatch(data:any) {
    return this.http.post<any>(`${environment.baseURL}/programswatch/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

   // allProgramsWatch
   allProgramsWatch() {
    return this.http.get<any>(`${environment.baseURL}/programswatch`,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allProgramsWatchByEmp
  allProgramsWatchByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/programswatch-emp/`+id,)
      .pipe(map(data => {
        return data;
      }));
  }
  
  // deleteProgramsWatch
  deleteProgramsWatch(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/programswatch/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

   /*********************************   LearningActivity Watch   ***********************************/

  // createLearningActivityWatch
  createLearningActivityWatch(data:any) {
    return this.http.post<any>(`${environment.baseURL}/learningactivitywatch/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

   // allLearningActivityWatch
   allLearningActivityWatch() {
    return this.http.get<any>(`${environment.baseURL}/learningactivitywatch`,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allLearningActivityWatchByEmp
  allLearningActivityWatchByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/learningactivitywatch-emp/`+id,)
      .pipe(map(data => {
        return data;
      }));
  }
  
  // deleteLearningActivityWatch
  deleteLearningActivityWatch(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/learningactivitywatch/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Allocation   ***********************************/
  // allocations
  allocation() {
    return this.http.get<any>(`${environment.baseURL}/allocation`,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allAllocations
  allAllocations(id:any) {
    return this.http.get<any>(`${environment.baseURL}/allocation/`+id,)
      .pipe(map(data => {
        return data;
      }));
  }

   // singleAllocations
   singleAllocations(id:any,type:any) {
    return this.http.get<any>(`${environment.baseURL}/single-allocation/`+id+`/`+type,)
      .pipe(map(data => {
        return data;
      }));
  }

  // updateAllocations
  updateAllocations(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}/allocation/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // deleteAllocations
  deleteAllocations(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/allocation/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteSingleAllocations
  deleteSingleAllocations(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/delete-allocation/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }


  /*********************************   Course Watch   ***********************************/

  // createCoursesWatch
  createCoursesWatch(data:any) {
    return this.http.post<any>(`${environment.baseURL}/courseswatch/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

   // allCoursesWatch
   allCoursesWatch() {
    return this.http.get<any>(`${environment.baseURL}/courseswatch`,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allCoursesWatchByEmp
  allCoursesWatchByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/courseswatch-emp/`+id,)
      .pipe(map(data => {
        return data;
      }));
    }

  // deleteCoursesWatch
  deleteCoursesWatch(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/courseswatch/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Module Watch   ***********************************/

  // createModulesWatch
  createModulesWatch(data:any) {
    return this.http.post<any>(`${environment.baseURL}/moduleswatch/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

   // allModulesWatch
   allModulesWatch() {
    return this.http.get<any>(`${environment.baseURL}/moduleswatch`,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allModulesWatchByEmp
  allModulesWatchByEmp(id:any) {
    return this.http.get<any>(`${environment.baseURL}/moduleswatch-emp/`+id,)
      .pipe(map(data => {
        return data;
      }));
    }
    

   // deleteModulesWatch
   deleteModulesWatch(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/moduleswatch/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

   /*********************************   Question Bank Watch   ***********************************/

  // createQuestionBanksWatch
  createQuestionBanksWatch(data:any) {
    return this.http.post<any>(`${environment.baseURL}/questionbankswatch/create`, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // allQuestionBankssWatch
  allQuestionBankssWatch() {
    return this.http.get<any>(`${environment.baseURL}/questionbankswatch`,)
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Courses   ***********************************/

  // createCourse
  createCourse(data:any) {
   
    return this.http.post<any>(`${environment.baseURL}/courses/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // updateCourse
  updateCourse(data: any, id: any) {
    return this.http.put<any>(`${environment.baseURL}/courses/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // singleCourse
  singleCourse(id: any) {
    return this.http.get<any>(`${environment.baseURL}/courses/` + id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteCourses
  deleteCourses(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/courses/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allCourse
  allCourse() {
    return this.http.get<any>(`${environment.baseURL}/courses`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

   // allCou
   allCou() {
    return this.http.get<any>(`${environment.baseURL}/courses-all`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allActiveCourse
  allActiveCourse() {
    return this.http.get<any>(`${environment.baseURL}/courses-active`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

   // allInactiveCourse
   allInactiveCourse() {
    return this.http.get<any>(`${environment.baseURL}/courses-inactive`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

    // allCourseLeaningActivity
    allCourseLeaningActivity() {
      return this.http.get<any>(`${environment.baseURL}/courses-learning`,{context: withCache()})
        .pipe(map(data => {
          return data;
        }));
    }
  
    // allActiveCourseLeaningActivity
    allActiveCourseLeaningActivity() {
      return this.http.get<any>(`${environment.baseURL}/courses-learning-active`,{context: withCache()})
        .pipe(map(data => {
          return data;
        }));
    }
  
     // allInactiveCourseLeaningActivity
     allInactiveCourseLeaningActivity() {
      return this.http.get<any>(`${environment.baseURL}/courses-learning-inactive`,{context: withCache()})
        .pipe(map(data => {
          return data;
        }));
    }



  // getIncrementalCodeCourses
  getIncrementalCodeCourses() {
    return this.http.post<any>(`${environment.baseURL}/courses/incremental-code`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // updateStatusCourses
  updateStatusCourse(id: any, status: string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/courses/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   News   ***********************************/

  // createNews
  createNews(description: any,photo:any, date: any,type:any,category:any) {
    const data = JSON.stringify({
      "description": description,
      "photo":photo,
      "date": date,
      "type":type,
      "category":category
    });
    return this.http.post<any>(`${environment.baseURL}/news/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


  // updateNews
  updateNews(description: any,photo:any, date: any,type:any,category:any,id:any) {
    const data = JSON.stringify({
      "description": description,
      "photo":photo,
      "date": date,
      "type":type,
      "category":category
    });
    return this.http.put<any>(`${environment.baseURL}/news/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  //singleNews
  singleNews(id: any) {
    return this.http.get<any>(`${environment.baseURL}/news/` + id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteNews
  deleteNews(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/news/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allNews
  allNews() {
    return this.http.get<any>(`${environment.baseURL}/news`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Leaderboard   ***********************************/

  // createLeaderboard
  createLeaderboard(name:any,message:any,designation: any, photo: any) {
    const data = JSON.stringify({
      "name":name,
      "message":message,
      "designation": designation,
      "photo": photo
    });
    return this.http.post<any>(`${environment.baseURL}/leaderboard/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


  // updateLeaderboard
  updateLeaderboard(name:any,message:any,designation: any, photo: any,id:any) {
    const data = JSON.stringify({
      "name":name,
      "message":message,
      "designation": designation,
      "photo": photo
    });
    return this.http.put<any>(`${environment.baseURL}/leaderboard/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  //singleLeaderboard
  singleLeaderboard(id: any) {
    return this.http.get<any>(`${environment.baseURL}/leaderboard/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteLeaderboard
  deleteLeaderboard(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/leaderboard/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allLeaderboard
  allLeaderboard() {
    return this.http.get<any>(`${environment.baseURL}/leaderboard`,)
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   Mail   ***********************************/

   // Create Mail
   createMail(data: any) {

    return this.http.post < any > (`${environment.baseURL}/mail/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Mail
   updateMail(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}/mail/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Mail
  getAllMail() {

    return this.http.get < any > (`${environment.baseURL}/mail-all` ,{context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All Mail
   getAllMailByType(type:any) {

    return this.http.get < any > (`${environment.baseURL}/mail-type/`+type,{context: withCache()} )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Mail
  getSingleMail(id:any) {

    return this.http.get < any > (`${environment.baseURL}/mail/`+id,{context: withCache()} )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Mail
  deleteMail(id:any) {

    return this.http.delete < any > (`${environment.baseURL}/mail/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   TrainingGlimpse   ***********************************/

   // Create TrainingGlimpse
   createTrainingGlimpse(data: any) {

    return this.http.post < any > (`${environment.baseURL}/training-glimpse/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update TrainingGlimpse
   updateTrainingGlimpse(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}/training-glimpse/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All TrainingGlimpse
  getAllTrainingGlimpse() {

    return this.http.get < any > (`${environment.baseURL}/training-glimpse-all` ,{context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single TrainingGlimpse
  getSingleTrainingGlimpse(id:any) {

    return this.http.get < any > (`${environment.baseURL}/training-glimpse/`+id ,{context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete TrainingGlimpse
  deleteTrainingGlimpse(id:any) {

    return this.http.delete < any > (`${environment.baseURL}/training-glimpse/`+id )
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

   // Update RedeemReward
   updateRedeemReward(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}/redeemReward/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All RedeemReward
  getAllRedeemReward() {

    return this.http.get < any > (`${environment.baseURL}/redeemReward-all`,{context: withCache()} )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single RedeemReward
  getSingleRedeemReward(id:any) {

    return this.http.get < any > (`${environment.baseURL}/redeemReward/`+id,{context: withCache()} )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete RedeemReward
  deleteRedeemReward(id:any) {

    return this.http.delete < any > (`${environment.baseURL}/redeemReward/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }
  

  /*********************************   RedeemItems   ***********************************/

   // Create RedeemItems
   createRedeemItems(data: any) {

    return this.http.post < any > (`${environment.baseURL}/redeemItems/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update RedeemItems
   updateRedeemItems(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}/redeemItems/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All RedeemItems
  getAllRedeemItems() {

    return this.http.get < any > (`${environment.baseURL}/redeemItems-all` ,{context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single RedeemItems
  getSingleRedeemItems(id:any) {

    return this.http.get < any > (`${environment.baseURL}/redeemItems/`+id ,{context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete RedeemItems
  deleteRedeemItems(id:any) {

    return this.http.delete < any > (`${environment.baseURL}/redeemItems/`+id )
      .pipe(map((data, re) => {
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

   // Update RewardPoints
   updateRewardPoints(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}/rewardPoints/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All RewardPoints
  getAllRewardPoints() {

    return this.http.get < any > (`${environment.baseURL}/rewardPoints-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single RewardPoints
  getSingleRewardPoints(id:any) {

    return this.http.get < any > (`${environment.baseURL}/rewardPoints/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete RewardPoints
  deleteRewardPoints(id:any) {

    return this.http.delete < any > (`${environment.baseURL}/rewardPoints/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Group   ***********************************/

  // createGroup
  createGroup(name: any,code:any) {
    const data = JSON.stringify({
      "name": name,
      "code":code
    });
    return this.http.post<any>(`${environment.baseURL}/group/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


  // updateGroup
  updateGroup(name: any ,id:any) {
    const data = JSON.stringify({
      "name": name
    });
    return this.http.put<any>(`${environment.baseURL}/group/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  //singleGroup
  singleGroup(id: any) {
    return this.http.get<any>(`${environment.baseURL}/group/` + id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteGroup
  deleteGroup(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/group/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }


  // getIncrementalCodeGroup
  getIncrementalCodeGroup() {
    return this.http.post<any>(`${environment.baseURL}/group/incremental-code`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allGroups
  allGroups() {
    return this.http.get<any>(`${environment.baseURL}/group`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }


  // allGroupsByEmpCount
  allGroupsByEmpCount() {
    return this.http.get<any>(`${environment.baseURL}/group-empcount`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

   /*********************************   CEO   ***********************************/

  // createCEO
  createCEO(data: any) {
    return this.http.post<any>(`${environment.baseURL}/ceo/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


  // updateCEO
  updateCEO(data: any ,id:any) {
    return this.http.put<any>(`${environment.baseURL}/ceo/`+id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  //singleCEO
  singleCEO(id: any) {
    return this.http.get<any>(`${environment.baseURL}/ceo/` + id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteCEO
  deleteCEO(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/ceo/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }


  // allCEOs
  allCEOs() {
    return this.http.get<any>(`${environment.baseURL}/ceo`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }


  /*********************************   Policy   ***********************************/

  // createPolicy
  createPolicy(icon: any, name: any, percentage: any) {
    const data = JSON.stringify({
      "icon": icon,
      "name": name,
      "percentage": percentage
    });
    return this.http.post<any>(`${environment.baseURL}/policy/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


  // createPolicy
  updateMessageConfig(message: any) {
    const data = JSON.stringify({
      "message": message
    });
    return this.http.post<any>(`${environment.baseURL}/config/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // createPolicy
  updateKnowConfig(message: any,photo:any) {
    const data = JSON.stringify({
      "message": message,
      "photo":photo
    });
    return this.http.post<any>(`${environment.baseURL}/config-know/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


   // createPolicy
   updateChairmanMessageConfig(photo:any,message: any,name:any) {
    const data = JSON.stringify({
      "photo":photo,
      "message": message,
      "name":name
    });
    return this.http.post<any>(`${environment.baseURL}/chairman-config/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


    // singleMessageConfig
    singleMessageConfig() {
      return this.http.get<any>(`${environment.baseURL}/config`,)
        .pipe(map(data => {
          return data;
        }));
    }

    // singleMessageConfig
    singleKnowConfig() {
      return this.http.get<any>(`${environment.baseURL}/config-know`,)
        .pipe(map(data => {
          return data;
        }));
    }


     // singleCMessageConfig
     singleCMessageConfig() {
      return this.http.get<any>(`${environment.baseURL}/chairman-config`,)
        .pipe(map(data => {
          return data;
        }));
    }

  // updatePolicy
  updatePolicy(icon: any, name: any, percentage: any, id: any) {
    const data = JSON.stringify({
      "icon": icon,
      "name": name,
      "percentage": percentage
    });
    return this.http.put<any>(`${environment.baseURL}/policy/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // singlePolicy
  singlePolicy(id: any) {
    return this.http.get<any>(`${environment.baseURL}/policy/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // deletePolicy
  deletePolicy(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/policy/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allPolicy
  allPolicy() {
    return this.http.get<any>(`${environment.baseURL}/policy`,)
      .pipe(map(data => {
        return data;
      }));
  }



  /*********************************   Program   ***********************************/

   // createProgram
   createProgram(data: any) {

    return this.http.post < any > (`${environment.baseURL}/program/create`, data,{ headers: { 'Content-Type': 'application/json' } })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // updateProgram
  updateProgram(data:any , id: any) {
    return this.http.put<any>(`${environment.baseURL}/program/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // singleProgram
  singleProgram(id: any) {
    return this.http.get<any>(`${environment.baseURL}/program/` + id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteProgram
  deleteProgram(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/program/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // allProg
  allProg() {
    return this.http.get<any>(`${environment.baseURL}/program-all`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allProgram
  allProgram() {
    return this.http.get<any>(`${environment.baseURL}/program`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allActiveProgram
  allActiveProgram() {
    return this.http.get<any>(`${environment.baseURL}/program-active`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allActiveProgram
  allInactiveProgram() {
    return this.http.get<any>(`${environment.baseURL}/program-inactive`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allProgramLearningActivity
  allProgramLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/program-learning`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allActiveProgramLearningActivity
  allActiveProgramLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/program-learning-active`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // allActiveProgramLearningActivity
  allInactiveProgramLearningActivity() {
    return this.http.get<any>(`${environment.baseURL}/program-learning-inactive`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // getIncrementalCodeProgram
  getIncrementalCodeProgram() {
    return this.http.post<any>(`${environment.baseURL}/program/incremental-code`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // updateStatusCourses
  updateStatusProgram(id: any, status: string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/program/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
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


  //getAllPost
  getAllPost() {
    return this.http.get<any>(`${environment.baseURL}/postactive`,{context: withCache()}).pipe(map(data=>{
      return data;
    }));
  }

  //getAllPendingPost
  getAllPendingPost() {
    return this.http.get<any>(`${environment.baseURL}/postpending`,{context: withCache()}).pipe(map(data=>{
      return data;
    }));
  }
  
  updatePost(id:any) {
    return this.http.put<any>(`${environment.baseURL}/post/update/`+ id, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  updateRejectPost(id:any) {
    return this.http.put<any>(`${environment.baseURL}/post/reject/update/`+ id, {headers:{'Content-Type':'application/json'}})
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
  
  /*********************************   Consolidate   ***********************************/

  // ModuleConsolidate
  moduleConsolidate(id: any) {
    return this.http.get<any>(`${environment.baseURL}/consolidate/module/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // CourseConsolidate
  courseConsolidate(id: any) {
    return this.http.get<any>(`${environment.baseURL}/consolidate/course/`+id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // ProgramConsolidate
  programConsolidate(id: any) {
    return this.http.get<any>(`${environment.baseURL}/consolidate/program/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }


   //Files Handling

   uploadDoc(filedata: any) {
    return this.http.post<any>(`${environment.baseURL}/upload-doc`, filedata)
      .pipe(map(data => {
        return data;
      }));
  }

  //Files Handling

  uploadFile(filedata: any) {
    return this.http.post<any>(`${environment.baseURL}/upload-doc`, filedata)
      .pipe(map(data => {
        return data;
      }));
  }

  downloadFile(filename: any) {
    return this.http.get<any>(`${environment.baseURL}/retrieve/` + filename).subscribe(data => {
    });
  }

  //Files Handling End

  //Overall Snapshot
  getOverallSnapshot() {
    return this.http.get<any>(`${environment.baseURL}/overall-snapshot`).pipe(map(data => {
      return data;
    }));
  }

  //Overall Snapshot Learning
  getOverallSnapshotLearning() {
    return this.http.get<any>(`${environment.baseURL}/overall-snapshot-learning`).pipe(map(data => {
      return data;
    }));
  }

  /*********************************   QuizScore   ***********************************/
  //Overall Snapshot
  getTop20Employee() {
    return this.http.get<any>(`${environment.baseURL}/top20Emp`).pipe(map(data => {
      return data;
    }));
  }

  //Month and Year Count
  getMonthAndYearWiseCount() {
    return this.http.get<any>(`${environment.baseURL}/monthAndYearCount`).pipe(map(data => {
      return data;
    }));
  }


  // allQuizScoreByEmployee
  allQuizScoreByEmployee(id: any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/employee/all/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }


  // getAllQuizScore
  getAllQuizScore() {
    return this.http.get<any>(`${environment.baseURL}/quizScore`)
      .pipe(map(data => {
        return data;
      }));
  }
  // getAllQuizScoreByScore
  getAllQuizScoreByScore(score: any) {
    const data = JSON.stringify({
      "score": score
    });
    return this.http.post<any>(`${environment.baseURL}/quizScoreByScore`,data,{headers:{'Content-Type':'application/json'}})
      .pipe(map(data => {
        return data;
      }));
  }

  // getOverallScore
  getWeeklyData(id: any) {
    return this.http.get<any>(`${environment.baseURL}/weekData/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  // getOverallScore
  getOverallScore(id: any) {
    return this.http.get<any>(`${environment.baseURL}/quizScore/overallScore/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }



  // getTopEmployee
  getTopEmployee() {
    return this.http.get<any>(`${environment.baseURL}/topEmp`,)
      .pipe(map(data => {
        return data;
      }));
  }


  /*********************************   Users   ***********************************/

  //getAllSupportByEmp
  getbirthdays() {
    return this.http.get<any>(`${environment.baseURL}/userbirthday`).pipe(map(data=>{
      return data;
    }));
  }

  // updateUser
  updateUser(firstName: any, lastName: any, salutation: any, email: any, mobile: any, dob: any, gender: any, department: any, id: any) {
    const data = JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "salutation": salutation,
      "email": email,
      "mobile": mobile,
      "dob": dob,
      "gender": gender,
      "department": department,
      "roles":"user"
    });
    return this.http.put<any>(`${environment.baseURL}/user/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // All Users Data
  getAllUsers() {
    return this.http.get<any>(`${environment.baseURL}/user/all`)
      .pipe(map(data => {
        return data;
      }));
  }

  // All Users Data
  getAllSessionActivity() {
    return this.http.get<any>(`${environment.baseURL}/session-activity`)
      .pipe(map(data => {
        return data;
      }));
  }

  //Get All Notification
  getAllAdminUsers() {
    return this.http.get<any>(`${environment.baseURL}/user-all-admin`)
      .pipe(map(data => {
        return data;
      }));
  }

   // updateSingleUser
   updateSingleUser(data:any, id : any) {
    return this.http.put<any>(`${environment.baseURL}/user-update/`+ id, data, {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // updateUser
  updateAdminUser(data: any, id: any) {
    return this.http.put<any>(`${environment.baseURL}/user/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  createUser(data: any) {
    return this.http.post<any>(`${environment.baseURL}/user/create`, data,{ headers: { 'Content-Type': 'application/json' } })
    .pipe(map(data => {
      return data;
    }));
  }

  // All Departments Data
  getAllDepartments() {
    return this.http.get<any>(`${environment.baseURL}/department/all`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

   // All ProfilePic Updation Data
   getAllProfilePicUpdation() {
    return this.http.get<any>(`${environment.baseURL}/profilepic/all`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  getAllUsersByPagination(page = 1,q:string, status:any=undefined) {
    return this.http.get<any>(`${environment.baseURL}/user/all-pagination/`+page+'?q='+q+"&status="+status,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // All Users Data
  getAllUsersByStatus(status:any) {
    const data = JSON.stringify({
    status:status
    });
    return this.http.post<any>(`${environment.baseURL}/user/status`,data, { headers: { 'Content-Type': 'application/json' }} )
      .pipe(map(data => {
        return data;
      }));
  }

  // All Users Data
  getAllUsersByDept(dept:any) {
    return this.http.get<any>(`${environment.baseURL}/user-dept/`+dept,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // All Users Data
  getAllUsersByGroup(group:any) {
    return this.http.get<any>(`${environment.baseURL}/user-group/`+group,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }


  // All Total Employees Count
  getTotalEmployeesCount() {
    return this.http.get<any>(`${environment.baseURL}/user/emp/count`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  //Single User
  singleUser(id: any) {
    return this.http.get<any>(`${environment.baseURL}/user/` + id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }


  // Update Status
  updateStatusUser(id: any, status: string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/user/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // Update Profile Pic Status
  updateProfilePicStatus(id: any, status: string,remark:any) {
    const data = JSON.stringify({
      photoStatus: status,
      photoRemark: remark
    });
    return this.http.put<any>(`${environment.baseURL}/user/profileupdate/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // Update Status
  updateActiveWallStatusUser(id: any, status: string) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/user/update/active-wall-status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  
  // Sync Employee
  syncEmployee() {
    return this.http.get<any>(`${environment.baseURL}/employee-sync`)
      .pipe(map(data => {
        return data;
      }));
  }


  /*********************************   ProgramAllocation   ***********************************/


  //getProgramAllocation
  getProgramAllocation() {
    return this.http.get<any>(`${environment.baseURL}/getProgramAllocation`)
      .pipe(map(data => {
        return data;
      }));
  }

  //getCourseAllocation
  getCourseAllocation() {
    return this.http.get<any>(`${environment.baseURL}/getCourseAllocation`)
      .pipe(map(data => {
        return data;
      }));
  }

  //getCourseAllocation
  getCourseAllocationByCourse(id:any) {
    return this.http.get<any>(`${environment.baseURL}/getCourseAllocationByCourse/`+id)
      .pipe(map(data => {
        return data;
      }));
  }

  //getModuleAllocation
  getModuleAllocation() {
    return this.http.get<any>(`${environment.baseURL}/getModuleAllocation`)
      .pipe(map(data => {
        return data;
      }));
  }

  //getQuizAllocation
  getQuizAllocation() {
    return this.http.get<any>(`${environment.baseURL}/getQuizAllocation`)
      .pipe(map(data => {
        return data;
      }));
  }

  //getQuizAllocation
  getQuizAllocationByQuiz(id:any) {
    return this.http.get<any>(`${environment.baseURL}/getQuizAllocationByQuiz/`+id)
      .pipe(map(data => {
        return data;
      }));
  }

  // programAllocation
  assignBulkProgram(assignedPrograms: any) {
    const data = JSON.stringify({
      "assignedPrograms": assignedPrograms
    });
    return this.http.post<any>(`${environment.baseURL}/programAllocation/create/bulk`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  //getProgramCompletionStatusByEmp
  getProgramCompletionStatusByEmp(id: any) {
    return this.http.get<any>(`${environment.baseURL}/getProgramCompletionStatusByEmp/` + id)
      .pipe(map(data => {
        return data;
      }));
  }

  //sendNotificationToAssEmp
  sendNotificationToAssEmp(id: any) {
    return this.http.get<any>(`${environment.baseURL}/sendNotificationToAssEmp/` + id)
      .pipe(map(data => {
        return data;
      }));
  }

  // gettodayassignedProgram
  getTodayAssignedProgram(id: any) {
    return this.http.get<any>(`${environment.baseURL}/todayAssignedProgram/` + id)
      .pipe(map(data => {
        return data;
      }));
  }

   // getProgramActivity
   getProgramActivity() {
    return this.http.get<any>(`${environment.baseURL}/getProgramActivity`)
      .pipe(map(data => {
        return data;
      }));
  }

  // deleteAllocation
  deleteAllocation(id: any) {
    return this.http.delete<any>(`${environment.baseURL}/allocation/` + id,)
      .pipe(map(data => {
        return data;
      }));
  }

  /*********************************   UserRequests   ***********************************/
   // getAllUserRequests
  getAllUserRequests() {
    return this.http.get<any>(`${environment.baseURL}/userRequests/all`)
      .pipe(map(data => {
        return data;
      }));
  }
   // getAllUserRequests
   getPendingUserRequests() {
    return this.http.get<any>(`${environment.baseURL}/userRequests/pending`)
      .pipe(map(data => {
        return data;
      }));
  }
   // getAllUserRequests
   getSuccessUserRequests() {
    return this.http.get<any>(`${environment.baseURL}/userRequests/success`)
      .pipe(map(data => {
        return data;
      }));
  }
   // getAllUserRequests
   getRejectedUserRequests() {
    return this.http.get<any>(`${environment.baseURL}/userRequests/rejected`)
      .pipe(map(data => {
        return data;
      }));
  }

   // countByStatus
   getCountByStatus() {
    return this.http.get<any>(`${environment.baseURL}/userRequests/count`)
      .pipe(map(data => {
        return data;
      }));
  }

  // getOldUserRequests
  getOldUserRequests() {
    return this.http.get<any>(`${environment.baseURL}/userRequests/old`)
      .pipe(map(data => {
        return data;
      }));
  }

   // Update User Requests
   updateStatusUserRequests(id: any, status: any,remark:any) {
    const data = JSON.stringify({
      status: status,
      remark:remark
    });
    return this.http.put<any>(`${environment.baseURL}/userRequests/update/status/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }


  /*********************************   Support Request   ***********************************/

   // getAllSupportRequests
   getAllSupportRequests() {
    return this.http.get<any>(`${environment.baseURL}/support`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

  // getAllSupportRequests
  getAllSupportTransaction(id:any) {
    return this.http.get<any>(`${environment.baseURL}/supportTransaction/`+id,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

   // updateSupportRequestStatus
   updateSupportTransactionStatus(id: any, status: any) {
    const data = JSON.stringify({
      status: status
    });
    return this.http.put<any>(`${environment.baseURL}/supportTransaction/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

   // updateSupportRequestStatus
   updateSupportRequestStatus(id: any,remark:any, status: any) {
    const data = JSON.stringify({
      status: status,
      remark:remark
    });
    return this.http.put<any>(`${environment.baseURL}/support/update/` + id, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

   // sendSupportEmail
   sendSupportEmail(id:any,file:any,subject: any, message: any, email:any,empId:any,salutation:any,firstName:any,lastName:any) {
    const data = JSON.stringify({
      "id":id,
      "subject": subject,
      "file":file,
      "message": message,
      "email": email,
      "employeeId":empId,
      "salutation":salutation,
      "firstName":firstName,
      "lastName":lastName
    });
    return this.http.post<any>(`${environment.baseURL}/support/mail`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }



  /*********************************   Notification   ***********************************/

  // Create Notification
  createNotification(title: any, message: any, segment: any, segmentId: any,image:any) {
    const data = JSON.stringify({
      "title": title,
      "message": message,
      "segment": segment,
      "segmentId": segmentId,
      "image": image
    });
    return this.http.post<any>(`${environment.baseURL}/notification/create`, data, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // Api Log
  apiLog() {
    return this.http.get<any>(`${environment.baseURL}/api-log-report`)
      .pipe(map(data => {
        return data;
      }));
  }

  // User Notification
  userNotification(userId: any) {
    return this.http.get<any>(`${environment.baseURL}/user/notification/` + userId, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  // Clear Notification
  clearNotificationById(id:any) {
    return this.http.delete<any>(`${environment.baseURL}/user/notification/`+id,)
    .pipe(map(data => {
      return data;
    }));
  }
  
  // Clear Notification
  clearNotification(userId: any) {
    return this.http.get<any>(`${environment.baseURL}/user/notification/clear/` + userId, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

  //Get All Notification
  getAllNotification() {
    return this.http.get<any>(`${environment.baseURL}/notification`)
      .pipe(map(data => {
        return data;
      }));
  }


   // getHeadKpi
   getUserHeadKPI() {
    return this.http.get<any>(`${environment.baseURL}/user-head-kpi`)
      .pipe(map(data => {
        return data;
      }));
  }

  // allWinners
  allWinners() {
    return this.http.get<any>(`${environment.baseURL}/all-winners`,{context: withCache()})
      .pipe(map(data => {
        return data;
      }));
  }

}
