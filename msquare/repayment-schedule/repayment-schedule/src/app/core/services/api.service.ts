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

  // Get Single User By Branch
  getSingleUserByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}users-branch/`+branch, )
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


  // Get Exceeded Consumption
  getExceededConsumption() {

    return this.http.get < any > (`${environment.baseURL}get-exceeded-consumption`, )
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
  getAllRent() {

    return this.http.get < any > (`${environment.baseURL}rent-all`, )
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

  /*********************************   MT   ***********************************/

   // Create MT
   createMT(data: any) {

    return this.http.post < any > (`${environment.baseURL}mt/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update MT
   updateMT(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}mt/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All MT
  getAllMT() {

    return this.http.get < any > (`${environment.baseURL}mt-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single MT
  getSingleMT(id:any) {

    return this.http.get < any > (`${environment.baseURL}mt/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete MT
  deleteMT(id:any) {

    return this.http.delete < any > (`${environment.baseURL}mt/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // downloadMT
   downloadMT(data: any) {

    return this.http.post < any > (`${environment.baseURL}downloadFile`, data, {
        headers: this._headers
      })
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
  getAllRentBill() {

    return this.http.get < any > (`${environment.baseURL}rentBill-all`, )
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
  getAllCourier() {

    return this.http.get < any > (`${environment.baseURL}courier-all`, )
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
  getAllUtility() {

    return this.http.get < any > (`${environment.baseURL}utility-all`, )
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
  getAllUtilityBill() {

    return this.http.get < any > (`${environment.baseURL}utilitybill-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All UtilityBill By Branch
  getUtilityBillByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}utilitybill-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Active Transactions By Branch
   getActiveTransactionsByBranch(branch:any) {

    return this.http.get < any > (`${environment.baseURL}active-transactions-branch/`+branch, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

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
  getAllBranch() {

    return this.http.get < any > (`${environment.baseURL}branch-all`, )
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

    return this.http.get < any > (`${environment.baseURL}zone-all`, )
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

    return this.http.get < any > (`${environment.baseURL}division-all`, )
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

    return this.http.get < any > (`${environment.baseURL}cluster-all`, )
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
}