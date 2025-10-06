import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private LoginAPIURL="https://localhost:5002/apiAuthgateway/login";
  constructor(private http:HttpClient) { }

  login(credentials:any):Observable<any>{
    return this.http.post('${this.LoginAPIURL}',credentials);
  }

  logout():void{
    localStorage.removeItem('user');
  }

  isAuthenticated():boolean{
        return true
  }
}
