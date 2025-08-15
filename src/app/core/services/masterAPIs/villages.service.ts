import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class villagesService {
  constructor(private http:HttpClient) { }
getVillagesOnBasisTehBlockPanch(tehsil_Code:string,block_Code:string,panchayat_Code:string)
  {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/village/";
    var baseUrl="http://localhost:5826/api/village/";
    var updatedUrl=baseUrl+tehsil_Code+'/'+block_Code+'/'+panchayat_Code ;
    return this.http.get(updatedUrl);
  }
 
  
}


