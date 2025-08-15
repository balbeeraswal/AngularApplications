import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class duplicityCheckingService {
  constructor(private http: HttpClient) {}
  checkDuplicityOfAadhaarNo(Aadhaar_No: string): Observable<any> {
    var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    // var baseUrl = 'http://localhost:5826/api/BankBranchDetailsByIFSC';
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    };

    const body = {
      Aadhaar_No: Aadhaar_No,
    };
    return this.http.post(baseUrl, body, { headers: headers });
  }

  checkDuplicityOfBankAccountNo(
    DistrictCode: string,
    bank_Code: string,
    branch_Code: string,
    applicationNumber: string,
    bankAccountNumber: string,
    maxLengthOfAccount: number,
    minLengthOfAccount: number
  ): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'http://localhost:5826/api/CheckIsBankAccountExist';
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    };

    const body = {
      districtCode: DistrictCode,
      bankCode: bank_Code,
      branchCode: branch_Code,
      applicationNumber: applicationNumber,
      accountNumber: bankAccountNumber,
      confirmBankAccuntNo: bankAccountNumber,
      maxAccountLen: maxLengthOfAccount,
      minAccountLen: minLengthOfAccount,
    };
    console.log(body)
    return this.http.post(baseUrl, body, { headers: headers });
  }
}
