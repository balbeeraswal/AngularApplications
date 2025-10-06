import { inject, Injectable } from "@angular/core";
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./AuthService.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
//  class authGuardService
// {
//     canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
        
//         return true;
//     }
// }

// export const isApplicantLoginGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean=>
// {
//     return inject(authGuardService).canActivate(route,state);

export class AuthGuard implements CanActivate
{
      constructor(private authservice:AuthService,private router:Router)
      {
        
      }

      canActivate():boolean {
          if(this.authservice.isAuthenticated())
          {
            return true;
          }
          else{
            this.router.navigate['login']
          }
      }
}
// }
