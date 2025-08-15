import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
categories:any;
  url="https://ssp.uk.gov.in/umang/api/category"
  // url="http://localhost:5826/api/Category"
  constructor(private http:HttpClient) { 

  }
  getCategories()
  {
    return this.http.get(this.url);
         
  }
}
