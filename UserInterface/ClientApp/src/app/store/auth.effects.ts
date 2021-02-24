import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import * as fromApp from './app.reducer';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { LoginComponent } from '../login/login.component';
import { TokenService } from '../services/token.service';
import { IAuthToken } from '../models/IAuthToken.model';

@Injectable()
export class AuthEffects {

  private errorMessage: string = 'An error has occured!';
  private badRequestErrorMessage: string = 'A bad request error has occured!';
  private unauthorizedErrorMessage: string = 'The request is unauthorized!';
  private methodNotAllowedErrorMessage: string = 'The request method is not allowed!';
  private notFoundErrorMessage: string = 'The request is not found!';
  private internalServerErrorMessage: string = 'An internal server error has occured!';
  private tokenExpirationTimer: any;

  @Effect({ dispatch: false })
  displayLoginModal$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.displayLoginModal),
    tap((action) => {
      this.modalService.open(LoginComponent, 'Login');
    })
  );

  @Effect({ dispatch: false })
  hideLoginModal$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.hideLoginModal),
    tap((action) => {
      this.modalService.close();
    })
  );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap((action) => {
      return this.authService.login(action.data).pipe(
        map(transactionResult => {
          if (!transactionResult.isSuccessful) {
            return AuthActions.loginFailed({
              error: transactionResult.errorMessage
            });
          }
          else {
            return AuthActions.loginSucceed({
              authToken: transactionResult.content
            });
          }
        }),
        catchError(error => {
          return of(AuthActions.loginFailed({
            error: this.getError(error)
          }));
        })
      )
    }),
    catchError((error, caught) => {
      console.log(error);
      this.store$.dispatch(AuthActions.errorRaised({ error: this.errorMessage }));
      return caught;
    })
  );

  @Effect({ dispatch: false })
  loginSucceed$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.loginSucceed),
    tap((action) => {
      this.tokenService.setAuthToken(action.authToken);
    }),
    tap((action) => {
      this.modalService.close();
      this.router.navigate(['/profile']);
    })
  );

  @Effect()
  getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.getProfile),
    switchMap((action) => {
      return this.authService.getProfile().pipe(
        map(response => {
          return AuthActions.getProfileSucceed({
            profile: response
          });
        }),
        catchError(error => {
          return of(AuthActions.getProfileFailed({
            error: this.getError(error)
          }));
        })
      )
    }),
    catchError((error, caught) => {
      console.log(error);
      this.store$.dispatch(AuthActions.errorRaised({ error: this.errorMessage }));
      return caught;
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.logout),
    switchMap((action) => {
      const authResponse: IAuthToken = this.tokenService.getAuthToken();
      if (!authResponse) {
        return of(AuthActions.loginFailed({
          error: this.getError(this.errorMessage)
        }));
      }
      if (authResponse.tokenExpiration < new Date()) {
        console.log(111);
        this.tokenService.deleteAuthToken();
        return of(AuthActions.loginFailed({
          error: this.getError(this.errorMessage)
        }));
      }

      return this.authService.logout().pipe(
        map(transactionResult => {
          if (!transactionResult.isSuccessful) {
            return AuthActions.logoutFailed({
              error: transactionResult.errorMessage
            });
          }
          else {
            return AuthActions.logoutSucceed();
          }
        }),
        catchError(error => {
          return of(AuthActions.loginFailed({
            error: this.getError(error)
          }));
        })
      )
    }),
    catchError((error, caught) => {
      console.log(error);
      this.store$.dispatch(AuthActions.errorRaised({ error: this.errorMessage }));
      return caught;
    })
  );

  @Effect({ dispatch: false })
  logoutSucceed$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.logoutSucceed),
    tap((action) => {
      this.tokenService.deleteAuthToken();
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions,
    private store$: Store<fromApp.AppState>,
    private authService: AuthService,
    private tokenService: TokenService,
    private modalService: ModalService,
    private router: Router) {
  }

  private getError(error: any): string {
    console.log(error);
    if (error instanceof HttpErrorResponse) {
      const statusCode: number = (<HttpErrorResponse>error).status;
      switch (statusCode) {
        case 400:
          return this.badRequestErrorMessage;
        case 401:
          return this.unauthorizedErrorMessage;
        case 404:
          return this.notFoundErrorMessage;
        case 405:
          return this.methodNotAllowedErrorMessage;
        case 500:
          return this.internalServerErrorMessage;
      }
    }
    return this.errorMessage;
  }

  //public autoLogin() {
  //  let authResponse: IAuthToken= this.tokenService.getToken();
  //  if (!authResponse) {
  //    return;
  //  }
  //  if (authResponse.token) {
  //    this.userChanged.next(authResponse);
  //    this.autoLogout(authResponse.expirationDuration);
  //  }
  //  else {
  //    this.tokenService.deleteToken();
  //  }
  //}

  //public autoLogout(tokenExpirationDuration: number) {
  //  this.tokenExpirationTimer = setTimeout(() => {
  //    this.logout$();
  //  }, tokenExpirationDuration);
  //}



}
