import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class bankBranchesService {
  constructor(private http: HttpClient) {}
  getBankBranchesOnBasisDistIFSC(Dist_IFSC: string): Observable<any> {
    var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    // var baseUrl = 'http://localhost:5826/api/BankBranchDetailsByIFSC';
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    };
    const body = {
      ifsc: Dist_IFSC,
    };
     return this.http
      .post(baseUrl, body, { headers: headers, observe: 'body' })
      .pipe(
        map(data => {
          return data;
        }),
        // filter(data=>data.bank_code=2),
        catchError((error) => {
          throw error;
        })
      );
  }
}


