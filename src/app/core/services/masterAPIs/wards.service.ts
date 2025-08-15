import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class wardsService {
  constructor(private http:HttpClient) { }
getWardsOnBasisTown(Ward_Code:string,Town_Code:string)
  {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/ward/";
    var baseUrl="http://localhost:5826/api/ward/";

    var updatedUrl=baseUrl+'0'+'/'+Town_Code;
    return this.http.get(updatedUrl);
  }
 
  
}


