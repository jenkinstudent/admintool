import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    admin = [{id:"L1-Admin",name: "L1",role:"admin"},{id:"L2-Admin",name: "L2",role:"admin"}];
    fieldadmin = [{id:"Field-Admin",name: "Field",role:"admin"}];
    business = [{id:"Business",name: "Branch Manager",role:"business"},{id:"Business",name: "Senior Branch Manager",role:"business"},{id:"Business",name: "Area Manager",role:"business"},{id:"Business",name: "Senior Manager",role:"business"},{id:"Business",name: "Divisional Manager",role:"business"},{id:"Business",name: "Senior Divisonal Manager",role:"business"},{id:"Business",name: "Regional Manager",role:"business"},{id:"Business",name: "State Head",role:"business"},{id:"Business",name: "AVP",role:"business"},{id:"Business",name: "Deputy Vice President",role:"business"}];
    financedesignation = [{id:"L1-Finance",name: "L1",role:"finance"},{id:"L2-Finance",name: "L2",role:"finance"}];
    
    constructor(private http: HttpClient) { }
    
}
