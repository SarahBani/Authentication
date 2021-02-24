import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, take, tap } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        throw new Error("Method not implemented.");
    }

  //public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  //  : boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //  return this.authService.userChanged.pipe(
  //    take(1),
  //    map(user => {
  //    if (!!user) {
  //      return true;
  //    }
  //    return this.router.createUrlTree(['/access-denied']);
  //    //else {
  //    //  this.router.navigate(['/access-denied']);
  //    //}
  //    //}), tap(isAuth => {
  //    //  if (!isAuth) {
  //    //    this.router.navigate(['/access-denied']);
  //    //  }
  //  }));
  //}

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

}
