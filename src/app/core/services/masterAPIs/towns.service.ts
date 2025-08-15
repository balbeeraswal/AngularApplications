import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class townsService {
  constructor(private http:HttpClient) { }
getTownsOnBasisDistTeh(Dist_Code:string,Teh_Code:string)
  {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/town/";
    var baseUrl="http://localhost:5826/api/town/";
    var updatedUrl=baseUrl+Dist_Code+'/'+Teh_Code;
    return this.http.get(updatedUrl);
  }
 
  
}


