import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take, flatMap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import { selectHasLoggedIn } from "../store/auth.selector";
import { TokenService } from "./token.service";

@Injectable()
export class JWTInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>,
    private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectHasLoggedIn).pipe(
      take(1),
      flatMap(hasLoggedIn => {
        if (!hasLoggedIn) {
          return next.handle(req);
        }
        const token = this.tokenService.getAuthToken().token;
        const authReq = req.clone({
          setHeaders: { 'Authorization': `Bearer ${token}` },
           //headers: req.headers.set("Content-Type", "application/json; charset=utf-8")
        });
        return next.handle(authReq);
      }),
    );
  }

}
