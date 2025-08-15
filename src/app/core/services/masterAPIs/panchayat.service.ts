import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class panchayatService {
  constructor(private http:HttpClient) { }
getPanchayatsOnBasisTehBlock(tehsil_Code:string,block_Code:string)
  {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/panchayat/";
    var baseUrl="http://localhost:5826/api/panchayat/";

    var updatedUrl=baseUrl+tehsil_Code+'/'+block_Code;
    return this.http.get(updatedUrl);
  }
 
  
}


