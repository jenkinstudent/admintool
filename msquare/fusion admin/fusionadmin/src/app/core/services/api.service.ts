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

 
  /*********************************   Other   ***********************************/

  // Create User
  createUser(data: any) {

    return this.http.post < any > (`${environment.baseURL}users/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get Single User
  getSingleUser(id:any) {

    return this.http.get < any > (`${environment.baseURL}users/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get Admin User
  getAdminUser() {

    return this.http.get < any > (`${environment.baseURL}users-admin`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get Single User By Branch
  getSingleUserByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}users-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Get Single User By Designation
   getSingleUserByDesignation(id:any) {

    return this.http.get < any > (`${environment.baseURL}users-designation/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  updateUser(data: any, userId: any) {

    return this.http.put < any > (`${environment.baseURL}users/` + userId, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  updateUserPermissions(data: any) {

    return this.http.put < any > (`${environment.baseURL}users-permissions`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  changePassword(data:any){
    return this.http.post < any > (`${environment.baseURL}users/changePassword/`+this.auths.currentUserValue.id,data,{
      headers: this._headers
    } )
    .pipe(map((data, re) => {
      return data;
    }));
  }


   /*********************************   File Handling   ***********************************/

   uploadFile(filedata: any) {
    return this.http.post < any > (`${environment.baseURL}upload/`, filedata)
      .pipe(map(data => {
        return data;
      }));
  }

  downloadFile(filename: any) {
    return this.http.get < any > (`${environment.baseURL}download/` + filename).subscribe(data => {

    });
  }

  // Get Current Transactions Overview
  getCurrentTransactionsOverview() {

    return this.http.get < any > (`${environment.baseURL}get-current-transactions-overview`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Get Current Transactions Overview By Branch
  getCurrentTransactionsOverviewByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}get-current-transactions-overview-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get Current Transactions Overview For Rent
  getCurrentTransactionsOverviewForRent() {

    return this.http.get < any > (`${environment.baseURL}get-current-transactions-overview-rent`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Get Exceeded Consumption
  getExceededConsumption() {

    return this.http.get < any > (`${environment.baseURL}get-exceeded-consumption`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get Exceeded 
  getExceeded() {

    return this.http.get < any > (`${environment.baseURL}get-exceeded`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Get Exceeded Consumption By Branch
   getExceededConsumptionByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}get-exceeded-consumption-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get Zone Data
  getZoneData() {

    return this.http.get < any > (`${environment.baseURL}get-zone-data`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Get Cluster Data
   getClusterData() {

    return this.http.get < any > (`${environment.baseURL}get-cluster-data`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Check Rent Raised
  checkRentRaised() {

    return this.http.get < any > (`${environment.baseURL}check-rent-raised`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Check Utility Raised
   checkUtilityRaised() {

    return this.http.get < any > (`${environment.baseURL}check-utility-raised/`+this.auths.currentUserValue.id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


   /*********************************   Rent   ***********************************/

   // Create Rent
   createRent(data: any) {

    return this.http.post < any > (`${environment.baseURL}rent/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Rent
   updateRent(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}rent/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Rent
  getAllRent(page = 1,where:any="",sort="",populate="",search="",limit=200) {

    return this.http.get < any > (`${environment.baseURL}rent-all?page=`+page+"&where="+JSON.stringify(where)+"&sort="+sort+"&populate="+populate+"&search="+search+"&limit="+limit, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

    // All Rent Count
    getAllRentCount() {

      return this.http.get < any > (`${environment.baseURL}rent-count`, )
        .pipe(map((data, re) => {
          return data;
        }));
    }

  // Single Rent
  getSingleRent(id:any) {

    return this.http.get < any > (`${environment.baseURL}rent/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Rent
  deleteRent(id:any) {

    return this.http.delete < any > (`${environment.baseURL}rent/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   Activity   ***********************************/

   // Create Activity
   createActivity(data: any) {

    return this.http.post < any > (`${environment.baseURL}activity/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Activity
   updateActivity(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}activity/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Get Activities
   getActivities(data: any) {

    return this.http.post < any > (`${environment.baseURL}activities`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Activity
  getAllActivity() {

    return this.http.get < any > (`${environment.baseURL}activity-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Activity
  getSingleActivity(id:any) {

    return this.http.get < any > (`${environment.baseURL}activity/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Activity
  deleteActivity(id:any) {

    return this.http.delete < any > (`${environment.baseURL}activity/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   RentBill   ***********************************/

   // Create RentBill
   createRentBill(data: any) {

    return this.http.post < any > (`${environment.baseURL}rentBill/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update RentBill
   updateRentBill(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}rentBill/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  
  // All RentBill
  getAllRentBill(page = 1,where:any="",sort="",populate="",search="",limit=200) {

    return this.http.get < any > (`${environment.baseURL}rentBill-all?page=`+page+"&where="+JSON.stringify(where)+"&sort="+sort+"&populate="+populate+"&search="+search+"&limit="+limit, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All RentBillBySelected
  getAllRentBillBySelected(date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}rentBill-selected/`+date1+`/`+date2, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All RentBill By Status
  getAllRentBillByStatus() {

    return this.http.get < any > (`${environment.baseURL}rentBill-status`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All RentBill By Approved Finance
  getAllRentBillByApprovedFinance() {

    return this.http.get < any > (`${environment.baseURL}rentBill-approved-finance`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All RentBill For Current Month
   getAllRentBillForCurrentMonth() {

    return this.http.get < any > (`${environment.baseURL}rentBill-current-month`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single RentBill
  getSingleRentBill(id:any) {

    return this.http.get < any > (`${environment.baseURL}rentBill/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete RentBill
  deleteRentBill(id:any) {

    return this.http.delete < any > (`${environment.baseURL}rentBill/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   RentTemporary   ***********************************/

   // Create RentTemporary
   createRentTemporary(data: any) {

    return this.http.post < any > (`${environment.baseURL}rentTemporary/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update RentTemporary
   updateRentTemporary(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}rentTemporary/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All RentTemporary
  getAllRentTemporary() {

    return this.http.get < any > (`${environment.baseURL}rentTemporary-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All PendingRaised
  getAllPendingRaised() {

    return this.http.get < any > (`${environment.baseURL}rentTemporary-pending`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single RentTemporary
  getSingleRentTemporary(id:any) {

    return this.http.get < any > (`${environment.baseURL}rentTemporary/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete RentTemporary
  deleteRentTemporary(id:any) {

    return this.http.delete < any > (`${environment.baseURL}rentTemporary/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   UtilityTemporary   ***********************************/

   // Create UtilityTemporary
   createUtilityTemporary(data: any) {

    return this.http.post < any > (`${environment.baseURL}utilityTemporary/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update UtilityTemporary
   updateUtilityTemporary(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}utilityTemporary/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All UtilityTemporary
  getAllUtilityTemporary() {

    return this.http.get < any > (`${environment.baseURL}utilityTemporary-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

    // All UtilityTemporary By Date
    getAllUtilityTemporaryByDate(date1:any,date2:any) {

      return this.http.get < any > (`${environment.baseURL}utilityTemporary-date/`+date1+`/`+date2, )
        .pipe(map((data, re) => {
          return data;
        }));
    }

  // Single UtilityTemporary
  getSingleUtilityTemporary(id:any) {

    return this.http.get < any > (`${environment.baseURL}utilityTemporary/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete UtilityTemporary
  deleteUtilityTemporary(id:any) {

    return this.http.delete < any > (`${environment.baseURL}utilityTemporary/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  /*********************************   Courier   ***********************************/

   // Create Courier
   createCourier(data: any) {

    return this.http.post < any > (`${environment.baseURL}courier/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Courier
   updateCourier(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}courier/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Courier
  getAllCourier(page = 1,where:any="",sort="",populate="",search="",limit=200) {

    return this.http.get < any > (`${environment.baseURL}courier-all?page=`+page+"&where="+JSON.stringify(where)+"&sort="+sort+"&populate="+populate+"&search="+search+"&limit="+limit, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


    // All Courier By Current
    getAllCourierByCurrent() {

      return this.http.get < any > (`${environment.baseURL}courier-current`, )
        .pipe(map((data, re) => {
          return data;
        }));
    }

  // All Courier By Branch
  getAllCourierByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}courier-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Courier
  getSingleCourier(id:any) {

    return this.http.get < any > (`${environment.baseURL}courier/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Courier
  deleteCourier(id:any) {

    return this.http.delete < any > (`${environment.baseURL}courier/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Utility   ***********************************/

   // Create Utility
   createUtility(data: any) {

    return this.http.post < any > (`${environment.baseURL}utility/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Utility
   updateUtility(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}utility/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Utility
  getAllUtility(page = 1,where:any="",sort="",populate="",search="",limit=200) {

    return this.http.get < any > (`${environment.baseURL}utility-all?page=`+page+"&where="+JSON.stringify(where)+"&sort="+sort+"&populate="+populate+"&search="+search+"&limit="+limit, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

    // All Utility Count
    getAllUtilityCount() {

      return this.http.get < any > (`${environment.baseURL}utility-count`, )
        .pipe(map((data, re) => {
          return data;
        }));
    }

  // All Utility By Branch
  getAllUtilityByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}utility-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

    // All Expected VOuchers
    getAllExpectedVouchers(branch:any) {

      return this.http.get < any > (`${environment.baseURL}utility-expectedvoucher/`+branch, )
        .pipe(map((data, re) => {
          return data;
        }));
    }

  // All Utility By Branch And Utility
  getAllUtilityByBranchAndUtility(branch:any,utility:any) {

    return this.http.get < any > (`${environment.baseURL}utility-branch-utility/`+branch+`/`+utility, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Utility
  getSingleUtility(id:any) {

    return this.http.get < any > (`${environment.baseURL}utility/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Utility
  deleteUtility(id:any) {

    return this.http.delete < any > (`${environment.baseURL}utility/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Meter   ***********************************/

   // Create Meter
   createMeter(data: any) {

    return this.http.post < any > (`${environment.baseURL}meter/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Meter
   updateMeter(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}meter/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Meter
  getAllMeter() {

    return this.http.get < any > (`${environment.baseURL}meter-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Meter By Branch
  getMeterByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}meter-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Meter
  getSingleMeter(id:any) {

    return this.http.get < any > (`${environment.baseURL}meter/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Meter
  deleteMeter(id:any) {

    return this.http.delete < any > (`${environment.baseURL}meter/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  /*********************************   UtilityBill   ***********************************/

   // Create UtilityBill
   createUtilityBill(data: any) {

    return this.http.post < any > (`${environment.baseURL}utilitybill/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update UtilityBill
   updateUtilityBill(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}utilitybill/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All UtilityBill
  getAllUtilityBill(page = 1,where:any="",sort="",populate="",search="",limit=200) {

    return this.http.get < any > (`${environment.baseURL}utilitybill-all?page=`+page+"&where="+JSON.stringify(where)+"&sort="+sort+"&populate="+populate+"&search="+search+"&limit="+limit, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All UtilityBill By Date
  //  getAllUtilityBillByDate(date1:any,date2:any) {

  //   return this.http.get < any > (`${environment.baseURL}utilitybill-date/`+date1+`/`+date2, )
  //     .pipe(map((data, re) => {
  //       return data;
  //     }));
  // }

  // All UtilityBillByCurrent
  // getAllUtilityBillByCurrent() {

  //   return this.http.get < any > (`${environment.baseURL}utilitybill-current`, )
  //     .pipe(map((data, re) => {
  //       return data;
  //     }));
  // }

  // All UtilityBillBySelected
  // getAllUtilityBillBySelected(date1:any,date2:any) {

  //   return this.http.get < any > (`${environment.baseURL}utilitybill-selected/`+date1+`/`+date2, )
  //     .pipe(map((data, re) => {
  //       return data;
  //     }));
  // }

  // All UtilityBill By Branch
  // getUtilityBillByBranch(branch:any) {

  //   return this.http.get < any > (`${environment.baseURL}utilitybill-branch/`+branch, )
  //     .pipe(map((data, re) => {
  //       return data;
  //     }));
  // }

  // All UtilityBill Count By Branch
  getUtilityBillCountByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}utilitybill-branch-count/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Active Transactions By Branch And Selected
  //  getActiveTransactionsByBranchAndSelected(branch:any,date1:any,date2:any) {

  //   return this.http.get < any > (`${environment.baseURL}active-transactions-branch-selected/`+branch+`/`+date1+`/`+date2, )
  //     .pipe(map((data, re) => {
  //       return data;
  //     }));
  // }

   // Active Transactions By Branch And Current
  //  getActiveTransactionsByBranchAndCurrent(branch:any) {

  //   return this.http.get < any > (`${environment.baseURL}active-transactions-branch-current/`+branch, )
  //     .pipe(map((data, re) => {
  //       return data;
  //     }));
  // }

   // Active Transactions By Branch
  //  getActiveTransactionsByBranch(branch:any) {

  //   return this.http.get < any > (`${environment.baseURL}active-transactions-branch/`+branch, )
  //     .pipe(map((data, re) => {
  //       return data;
  //     }));
  // }

  // Count UtilityBill By Branch
  getCountUtilityBillByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}utilitybill-count/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single UtilityBill
  getSingleUtilityBill(id:any) {

    return this.http.get < any > (`${environment.baseURL}utilitybill/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete UtilityBill
  deleteUtilityBill(id:any) {

    return this.http.delete < any > (`${environment.baseURL}utilitybill/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   Branch   ***********************************/

   // Create Branch
   createBranch(data: any) {

    return this.http.post < any > (`${environment.baseURL}branch/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // createBulkBranch
  createBulkBranch(data: any) {
    const bdata = JSON.stringify({
      "data": data
    });
    return this.http.post<any>(`${environment.baseURL}/branch/create/bulk`, bdata, { headers: { 'Content-Type': 'application/json' } })
      .pipe(map(data => {
        return data;
      }));
  }

   // Update Branch
   updateBranch(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}branch/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Branch
  getAllBranch(page = 1,where:any="",sort="",populate="",search="",limit=200) {

    return this.http.get < any > (`${environment.baseURL}branch-all?page=`+page+"&where="+where+"&sort="+sort+"&populate="+populate+"&search="+search+"&limit="+limit, {context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All Branch For SuperAdmin
   getAllBranchForSuperAdmin(page = 1,where:any="",sort="",populate="",search="",limit=200) {

    return this.http.get < any > (`${environment.baseURL}branch-superadmin?page=`+page+"&where="+where+"&sort="+sort+"&populate="+populate+"&search="+search+"&limit="+limit, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  Branch By Cluster
  getBranchByCluster(cluster:any) {

    return this.http.get < any > (`${environment.baseURL}branch-cluster/`+cluster )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  Branch By Division
  getBranchByDivision(division:any) {

    return this.http.get < any > (`${environment.baseURL}branch-division/`+division )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  Branch By State
  getBranchByState(state:any) {

    return this.http.get < any > (`${environment.baseURL}branch-state/`+state )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  Branch By Zone
  getBranchByZone(zone:any) {

    return this.http.get < any > (`${environment.baseURL}branch-zone/`+zone )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Branch
  getSingleBranch(id:any) {

    return this.http.get < any > (`${environment.baseURL}branch/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Branch
  deleteBranch(id:any) {

    return this.http.delete < any > (`${environment.baseURL}branch/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


   /*********************************   ApprovalLevels   ***********************************/

   // Create ApprovalLevels
   createApprovalLevels(data: any) {

    return this.http.post < any > (`${environment.baseURL}approvalLevels/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update ApprovalLevels
   updateApprovalLevels(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}approvalLevels/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All ApprovalLevels
  getAllApprovalLevels() {

    return this.http.get < any > (`${environment.baseURL}approvalLevels-all`)
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // ApprovalLevels Calculate
  getApprovalLevelsCalculate(billAmount:any, isExceeded:any,utility:any) {

    return this.http.get < any > (`${environment.baseURL}approvalLevels-calculate/`+billAmount+`/`+isExceeded+`/`+utility)
      .pipe(map((data, re) => {
        return data;
      }));
  }

    //Finance ApprovalLevels Calculate
    getFinanceApprovalLevelsCalculate(billAmount:any, isExceeded:any) {

      return this.http.get < any > (`${environment.baseURL}approvalLevels-finance-calculate/`+billAmount+`/`+isExceeded)
        .pipe(map((data, re) => {
          return data;
        }));
    }


  // Single ApprovalLevels
  getSingleApprovalLevels(id:any) {

    return this.http.get < any > (`${environment.baseURL}approvalLevels/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete ApprovalLevels
  deleteApprovalLevels(id:any) {

    return this.http.delete < any > (`${environment.baseURL}approvalLevels/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


   /*********************************   Role   ***********************************/

   // Create Role
   createRole(data: any) {

    return this.http.post < any > (`${environment.baseURL}role/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Role
   updateRole(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}role/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Role
  getAllRole() {

    return this.http.get < any > (`${environment.baseURL}role-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Role
  getSingleRole(id:any) {

    return this.http.get < any > (`${environment.baseURL}role/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Role
  deleteRole(id:any) {

    return this.http.delete < any > (`${environment.baseURL}role/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  /*********************************   UtilityMaster   ***********************************/

   // Create UtilityMaster
   createUtilityMaster(data: any) {

    return this.http.post < any > (`${environment.baseURL}utilityMaster/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update UtilityMaster
   updateUtilityMaster(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}utilityMaster/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All UtilityMaster
  getAllUtilityMaster() {

    return this.http.get < any > (`${environment.baseURL}utilityMaster-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single UtilityMaster
  getSingleUtilityMaster(id:any) {

    return this.http.get < any > (`${environment.baseURL}utilityMaster/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete UtilityMaster
  deleteUtilityMaster(id:any) {

    return this.http.delete < any > (`${environment.baseURL}utilityMaster/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


   /*********************************   Zone   ***********************************/

   // Create Zone
   createZone(data: any) {

    return this.http.post < any > (`${environment.baseURL}zone/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Zone
   updateZone(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}zone/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Zone
  getAllZone() {

    return this.http.get < any > (`${environment.baseURL}zone-all`, {context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

  getAllState(){
    return this.http.get < any > (`${environment.baseURL}state-all`, {context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Zone
  getSingleZone(id:any) {

    return this.http.get < any > (`${environment.baseURL}zone/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Zone
  deleteZone(id:any) {

    return this.http.delete < any > (`${environment.baseURL}zone/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   Division   ***********************************/

   // Create Division
   createDivision(data: any) {

    return this.http.post < any > (`${environment.baseURL}division/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Division
   updateDivision(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}division/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Division
  getAllDivision() {

    return this.http.get < any > (`${environment.baseURL}division-all`, {context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Division
  getSingleDivision(id:any) {

    return this.http.get < any > (`${environment.baseURL}division/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Division
  deleteDivision(id:any) {

    return this.http.delete < any > (`${environment.baseURL}division/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   Cluster   ***********************************/

   // Create Cluster
   createCluster(data: any) {

    return this.http.post < any > (`${environment.baseURL}cluster/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Cluster
   updateCluster(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}cluster/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Cluster
  getAllCluster() {

    return this.http.get < any > (`${environment.baseURL}cluster-all`, {context: withCache()})
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Cluster
  getSingleCluster(id:any) {

    return this.http.get < any > (`${environment.baseURL}cluster/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Cluster
  deleteCluster(id:any) {

    return this.http.delete < any > (`${environment.baseURL}cluster/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // User Notification
  userNotification(userId:any) {
    return this.http.get<any>(`${environment.baseURL}user/notification/`+userId,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }


    // Update Notification
    updateNotification(nData: any) {
      const data = JSON.stringify({
        "data": nData
      });
      return this.http.put<any>(`${environment.baseURL}notification/update`, data, { headers: { 'Content-Type': 'application/json' } })
        .pipe(map(data => {
          return data;
      }));
    }

  // Clear Notification
  clearNotification(userId:any) {
    return this.http.get<any>(`${environment.baseURL}user/notification/clear/`+userId,  {headers:{'Content-Type':'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }

  // Clear Notification
  clearNotificationById(id:any) {
    return this.http.delete<any>(`${environment.baseURL}user/notification/`+id,)
    .pipe(map(data => {
      return data;
    }));
  }
   //Get All Notification
   getAllNotification(id:any) {
    return this.http.get<any>(`${environment.baseURL}notification/user/`+id)
      .pipe(map(data => {
        return data;
      }));
  }


}