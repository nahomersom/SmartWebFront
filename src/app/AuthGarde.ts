import { Router, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGarde implements CanLoad {
    constructor(private router: Router) {}

    isEmpety(str: any) {
        if (str === '' || str === null) {
          return true;
        } else {
          return false;
        }
      }
    canLoad(route: Route, segments: UrlSegment[]): boolean {
        if (!this.isEmpety(localStorage.getItem('userId'))) {
          this.router.navigate([localStorage.getItem('lastUrl')]);
          return false;
        } else {
          return true;
         }
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isEmpety(localStorage.getItem('userId'))) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;

         }
    }


}
