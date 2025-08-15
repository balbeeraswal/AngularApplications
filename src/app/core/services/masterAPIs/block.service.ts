import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class blockService {

    
  constructor(private http:HttpClient) { }
 
getBlocksOnBasisTeh(tehsil_Code:string)
  {
   
    var baseUrl="https://ssp.uk.gov.in/umang/api/block/";
    // var baseUrl="http://localhost:5826/api/block/";
    var updatedUrl=baseUrl+tehsil_Code;

    return this.http.get(updatedUrl);
    
  }
 
  
}


