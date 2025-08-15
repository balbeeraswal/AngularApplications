import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {

    districtsArray:Array<districts>=[];
  constructor(private http:HttpClient) { }
  url:any="https://ssp.uk.gov.in/umang/api/district"
  //  url:any="http://localhost:5826/api/district"
  
 
getDistricts():Observable<any>
  {
    const headers={'Access-Control-Allow-Origin':'*','content-type':'application/json'};
   
    // const params=new HttpParams()
    //   .set('sort','district_Name')
    return this.http.get(this.url,{'headers':headers});
      }
     

  }
 
  

function data(this: (any: any) => void, value: Object, index: number): unknown {
  throw new Error('Function not implemented.');
}

export interface districts{
  district_Code:string;
  district_Name:string

}
