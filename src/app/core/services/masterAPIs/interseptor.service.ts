import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpIntercepter implements HttpInterceptor {
  constructor() {}
  //authService.Token''; //Get token from some service

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 // if (NotLoggedIn) {
    //     return EMPTY;
    //   }

    const token: string = 'some token';
   
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    console.log("intersepter");
    const started = Date.now();
    return next.handle(req)
    // .map(resp => {
 
    //     const myBody = [{ 'id': '1',
    //                       'name': 'TekTutorialsHub',
    //                       'html_url': 'www.tektutorialshub.com',
    //                       'description': 'description' 
    //                     }];})

    // .do(event => {
    //     console.log(event);
    //     const elapsed = Date.now()-started;
    //     console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
    //     if (event instanceof HttpResponse) {
    //         console.log(`Response Received`);
    //     };
    // });
    // .catch(err => {
    //     // onError
    //     console.log(err);
    //     if (err instanceof HttpErrorResponse) {
    //         console.log(err.status);
    //         console.log(err.statusText);
    //         if (err.status === 401) {
    //             // redirect the user to login page
    //             // 401 unauthorised user
    //         }
    //     }
    //     return Observable.of(err);
    // });
    
  }
}
