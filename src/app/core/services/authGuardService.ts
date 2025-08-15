import { inject, Injectable } from "@angular/core";
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { CanActivateFn } from "@angular/router";
@Injectable({
    providedIn:"root"
})
 class authGuardService
{
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
        
        return true;
    }
}

export const isApplicantLoginGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean=>
{
    return inject(authGuardService).canActivate(route,state);
}
