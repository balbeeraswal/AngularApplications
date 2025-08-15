import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class applicantLoginService

{
    constructor(private http:HttpClient) { }
    Login(userId:string,password:string):Observable<any>
    {
        var baseUrl='http://localhost:5826/api/Applicant/login'
        const headers={
         'Access-Control-Allow-Origin':'*',
         'content-type':'application/json'   
        }
        const body={
                login: userId,
                password:password
        }

        return this.http.post(baseUrl,body,{headers:headers,observe:'body'})
        ;
    }
}