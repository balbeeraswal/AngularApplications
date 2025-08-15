import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class tehsilService {

    
  constructor(private http:HttpClient) { }
 
getTehsilsOnBasisDist(tehsil_Code:string,district_Code:string)
  {
    console.log(district_Code);
    // var baseUrl="https://ssp.uk.gov.in/umang/api/tehsil/";
    var baseUrl="http://localhost:5826/api/tehsil/";
    var updatedUrl=baseUrl+tehsil_Code+'/'+district_Code;
    return this.http.get(updatedUrl);
    
  }
 
  
}


