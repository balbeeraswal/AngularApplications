import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class masterServices {

  constructor(private http: HttpClient) { }

  //-----------API to fetch Data of Districts through API----------------


  getDistricts(): Observable<any> {
    // url:any="https://ssp.uk.gov.in/umang/api/district"
    var baseUrl = "http://localhost:5826/api/district";
    // const headers={'Access-Control-Allow-Origin':'*','content-type':'application/json'};
    // commented on 06-07
    // return this.http.get(baseUrl,{'headers':headers});

    return this.http.get(baseUrl);
    // .pipe(
    //   map(data => {
    //     return data;
    //   }),
    //   // filter(data=>data.bank_code=2),
    //   catchError((error) => {
    //     throw error;
    //   })
    // );
  }



  //-----------API to fetch Data of Tehsils on basis of District through API----------------

  getTehsilsOnBasisDist(tehsil_Code: string, district_Code: string): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/tehsil/";
    var baseUrl = "http://localhost:5826/api/tehsil/";
    var updatedUrl = baseUrl + tehsil_Code + '/' + district_Code;
    return this.http.get(updatedUrl);
    // .pipe(
    //   map(data => {
    //     return data;
    //   }),
    //   // filter(data=>data.bank_code=2),
    //   catchError((error) => {
    //     throw error;
    //   })
    // );
  }

  //-----------API to fetch Blocks on Basis of Tehsile through API----------------

  getBlocksOnBasisTeh(tehsil_Code: string): Observable<any> {

    // var baseUrl="https://ssp.uk.gov.in/umang/api/block/";
    var baseUrl = "http://localhost:5826/api/block/";
    var updatedUrl = baseUrl + tehsil_Code;
    return this.http.get(updatedUrl);
  }

  //-----------------API to fetch Panchayats on bisis of Blocks through API----------------
  getPanchayatsOnBasisTehBlock(tehsil_Code: string, block_Code: string): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/panchayat/";
    var baseUrl = "http://localhost:5826/api/panchayat/";
    var updatedUrl = baseUrl + tehsil_Code + '/' + block_Code;
    return this.http.get(updatedUrl);
  }


  //-----------------API to fetch Villages on bisis of Tehsil,Blocks through API----------------
  getVillagesOnBasisTehBlockPanch(tehsil_Code: string, block_Code: string, panchayat_Code: string): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/village/";
    var baseUrl = "http://localhost:5826/api/village/";
    var updatedUrl = baseUrl + tehsil_Code + '/' + block_Code + '/' + panchayat_Code;
    return this.http.get(updatedUrl);
  }


  //-----------------API to fetch Towns on bisis of District Tehsil through API----------------
  getTownsOnBasisDistTeh(Dist_Code: string, Teh_Code: string): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/town/";
    var baseUrl = "http://localhost:5826/api/town/";
    var updatedUrl = baseUrl + Dist_Code + '/' + Teh_Code;
    return this.http.get(updatedUrl);
  }


  //-----------------API to fetch Wards on bisis of Town through API----------------
  getWardsOnBasisTown(Ward_Code: string, Town_Code: string): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/ward/";
    var baseUrl = "http://localhost:5826/api/ward/";
    var updatedUrl = baseUrl + '0' + '/' + Town_Code;
    return this.http.get(updatedUrl);
  }
  //-----------------API to fetch Categories through API----------------

  getCategories(): Observable<any> {
    var baseUrl = "http://localhost:5826/api/Category/";
    // var baseUrl="https://ssp.uk.gov.in/umang/api/Category"
    return this.http.get(baseUrl);

  }


  //-----------API to fetch Bank Branches using IFSC through API----------------

  getBankBranchesOnBasisDistIFSC(Dist_IFSC: string): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'http://localhost:5826/api/BankBranchDetailsByIFSC';

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    };
    // let headers = new HttpHeaders({'content-type': 'application/json'});

    const body = {
      ifsc: Dist_IFSC,
    };

    return this.http.post(baseUrl, body, { headers: headers, observe: 'body' });
    // .pipe(
    //   map(data => {
    //     return data;
    //   }),
    //   // filter(data=>data.bank_code=2),
    //   catchError((error) => {
    //     throw error;
    //   })
    // );
  }


  //-----------------API to fetch Occupations through API----------------

  getOccupations(): Observable<any> {
    var baseUrl = "https://localhost:7055/api/Occupation";
    // var baseUrl="https://ssp.uk.gov.in/umang/api/Occupation"
    return this.http.get(baseUrl);

  }




  checkDuplicityOfAadhaarNo(Aadhaar_No: string): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'http://localhost:5826/api/BankBranchDetailsByIFSC';
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    };
    // let headers = new HttpHeaders({'content-type': 'application/json'});

    const body = {
      Aadhaar_No: Aadhaar_No,
    };
    return this.http.post(baseUrl, body, { headers: headers });
  }

  getDisabilityTypes(): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'http://localhost:5826/api/DisabilityTypeMaster';
    return this.http.get(baseUrl);
  }

  getAssemblyConstyNames(): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'https://localhost:7055/api/AssemblyConstyNames';
    return this.http.get(baseUrl);
  }


  getLokSabhaConstyNames(): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'https://localhost:7055/api/LokSabhaConstyNames';
    return this.http.get(baseUrl);
  }




  checkDuplicityOfBankAccountNo(
    DistrictCode: string,
    bank_Code: number,
    branch_Code: number,
    applicationNumber: string,
    bankAccountNumber: string,
    maxLengthOfAccount: number,
    minLengthOfAccount: number
  ): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'http://localhost:5826/api/CheckIsBankAccountExist';
    // let headers = new HttpHeaders({'content-type': 'application/json'});
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


  DISM_Applicant_Registration(


          // Total parameters in this section are 6
    DisbM_Applicant: number,
    DisbM_DisabledPersonsDetail: number,
    DisbM_HusbDisabilityType: string,
    DisbM_HusbDisabilityPer: string,
    DisbM_WifeDisabilityType: string,
    DisbM_WifeDisabilityPer: string,


          // Total parameters in this section are 19
    DisbM_HusbName: string,
    DisbM_HusbNationality: number,
    DisbM_HusbReligion: number,
    DisbM_HusbCaste: number,
    DisbM_HusbAgeAtTimeOfMarriage: number,
    DisbM_HusbOccupation: number,
    DisbM_HusbDurationStayInUK: number,
    DisbM_IsHusbFatherAlive: string,
    DisbM_HusbFatherName: string,
    DisbM_HusbFatherOccupation: number,
    DisbM_HusbFatherNationality: number,
    DisbM_HusbFatherLastAddress: string,
    DisbM_HusbFatherLastOccupation: number,
    DisbM_HusbFatherReligion: number,
    DisbM_HusbFatherCaste: string,
    DisbM_HusbFatherSubCaste: string,
    DisbM_HusbMobileNo: string,
    DisbM_HusbAadhaarNo: string,
    DisbM_HusbGender: string,

    
          // Total parameters in this section are 16
    DisbM_HusbDistrict_Code: number,
    DisbM_HusbTehsil_Code: string,
    DisbM_HusbRuralUrban: string,
    DisbM_HusbBlock_Code: number,
    DisbM_HusbPanchayat_Code: number,
    DisbM_HusbVillage_Code: number,
    DisbM_HusbTown_Code: number,
    DisbM_HusbWard_Code: number,
    DisbM_HusbHouse_number: string,
    DisbM_HusbAreaMohalla: string,
    DisbM_HusbPostOffice: string,
    DisbM_HusbPinCode: number,
    DisbM_HusbCurrentAddress: string,
    DisbM_HusbBeforeMarriagAddress: string,
    DisbM_HusbLokSabhaArea: number,
    DisbM_HusbAssemblyArea: number,


    
// Total parameters in this section are 15
    DisbM_WifeName: string,
    DisbM_WifeNationality: string,
    DisbM_WifeReligion: number,
    DisbM_WifeCaste: number,
    DisbM_WifeAgeAtTimeOfMarriage: number,
    DisbM_WifeOccupation: number,
    DisbM_WifeDurationStayInUK: number,
    DisbM_WifeMobileNo: string,
    DisbM_WifeAadhaarNo: string,
    DisbM_IsWifeFatherAlive: string,
    DisbM_WifeFatherName: string,
    DisbM_WifeFatherOccupation: number,
    DisbM_WifeFatherLastAddress: string,
    DisbM_WifeFatherLastOccupation: number,
    DisbM_WifeGender: string,

    // Total parameters in this section are 16
    DisbM_WifeDistrict_Code: number,
    DisbM_WifeTehsil_Code: string,
    DisbM_WifeRuralUrban: string,
    DisbM_WifeBlock_Code: number,
    DisbM_WifePanchayat_Code: number,
    DisbM_WifeVillage_Code: number,
    DisbM_WifeTown_Code: number,
    DisbM_WifeWard_Code: number,
    DisbM_WifeHouse_number: string,
    DisbM_WifeAreaMohalla: string,
    DisbM_WifePostOffice: string,
    DisbM_WifePinCode: number,
    DisbM_WifeCurrentAddress: string,
    DisbM_WifeBeforeMarriagAddress: string,
    DisbM_WifeLokSabhaArea: number,
    DisbM_WifeAssemblyArea: number,

        // Total parameters in this section are 7
    DisbM_MarriageDate: string,
    DisbM_MarriageRegistrationNo: string,
    DisbM_MarriageRegistrationDate: string,
    DisbM_MarriageRegistrationOfficeName: string,
    DisbM_IsMarriageRegInUCC,
    DisbM_UCCRegNo,
    DisbM_UCCRegDate,

    DisbM_BankCode: number,
    DisbM_BankBranchCode: number,
    DisbM_IFSC: string,
    DisbM_BankAccountNo: string,
    DisbM_HusbWifeDeclare: string
  ): Observable<any> {
    // var baseUrl="https://ssp.uk.gov.in/umang/api/BankBranchDetailsByIFSC";
    var baseUrl = 'https://localhost:7055/api/RegisterDisMApplicant';
    // let headers = new HttpHeaders({'content-type': 'application/json'});
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    };


    console.log("disabilityper"+DisbM_WifeDisabilityPer);
    const body = {
      // Total parameters in this section are 18
        DisbM_Applicant,
    DisbM_DisabledPersonsDetail,
    DisbM_HusbDisabilityType,
    DisbM_HusbDisabilityPer,
    DisbM_WifeDisabilityType,
    DisbM_WifeDisabilityPer,


          // Total parameters in this section are 19
    DisbM_HusbName,
    DisbM_HusbNationality,
    DisbM_HusbReligion,
    DisbM_HusbCaste,
    DisbM_HusbAgeAtTimeOfMarriage,
    DisbM_HusbOccupation,
    DisbM_HusbDurationStayInUK,
    DisbM_IsHusbFatherAlive,
    DisbM_HusbFatherName,
    DisbM_HusbFatherOccupation,
    DisbM_HusbFatherNationality,
    DisbM_HusbFatherLastAddress,
    DisbM_HusbFatherLastOccupation,
    DisbM_HusbFatherReligion,
    DisbM_HusbFatherCaste,
    DisbM_HusbFatherSubCaste,
    DisbM_HusbMobileNo,
    DisbM_HusbAadhaarNo,
    DisbM_HusbGender,

    
          // Total parameters in this section are 16
    DisbM_HusbDistrict_Code,
    DisbM_HusbTehsil_Code,
    DisbM_HusbRuralUrban,
    DisbM_HusbBlock_Code,
    DisbM_HusbPanchayat_Code,
    DisbM_HusbVillage_Code,
    DisbM_HusbTown_Code,
    DisbM_HusbWard_Code,
    DisbM_HusbHouse_number,
    DisbM_HusbAreaMohalla,
    DisbM_HusbPostOffice,
    DisbM_HusbPinCode,
    DisbM_HusbCurrentAddress,
    DisbM_HusbBeforeMarriagAddress,
    DisbM_HusbLokSabhaArea,
    DisbM_HusbAssemblyArea,


    
// Total parameters in this section are 15
    DisbM_WifeName,
    DisbM_WifeNationality,
    DisbM_WifeReligion,
    DisbM_WifeCaste,
    DisbM_WifeAgeAtTimeOfMarriage,
    DisbM_WifeOccupation,
    DisbM_WifeDurationStayInUK,
    DisbM_WifeMobileNo,
    DisbM_WifeAadhaarNo,
    DisbM_IsWifeFatherAlive,
    DisbM_WifeFatherName,
    DisbM_WifeFatherOccupation,
    DisbM_WifeFatherLastAddress,
    DisbM_WifeFatherLastOccupation,
    DisbM_WifeGender,

    // Total parameters in this section are 16
    DisbM_WifeDistrict_Code,
    DisbM_WifeTehsil_Code,
    DisbM_WifeRuralUrban,
    DisbM_WifeBlock_Code,
    DisbM_WifePanchayat_Code,
    DisbM_WifeVillage_Code,
    DisbM_WifeTown_Code,
    DisbM_WifeWard_Code,
    DisbM_WifeHouse_number,
    DisbM_WifeAreaMohalla,
    DisbM_WifePostOffice,
    DisbM_WifePinCode,
    DisbM_WifeCurrentAddress,
    DisbM_WifeBeforeMarriagAddress,
    DisbM_WifeLokSabhaArea,
    DisbM_WifeAssemblyArea,

        // Total parameters in this section are 7
    DisbM_MarriageDate,
    DisbM_MarriageRegistrationNo,
    DisbM_MarriageRegistrationDate,
    DisbM_MarriageRegistrationOfficeName,
    DisbM_IsMarriageRegInUCC,
    DisbM_UCCRegNo,
    DisbM_UCCRegDate,

    DisbM_BankCode,
    DisbM_BankBranchCode,
    DisbM_IFSC,
    DisbM_BankAccountNo,
    DisbM_HusbWifeDeclare
    };
    console.log(JSON.stringify(body))
    return this.http.post(baseUrl, JSON.stringify(body), { headers: headers });
  }



}


