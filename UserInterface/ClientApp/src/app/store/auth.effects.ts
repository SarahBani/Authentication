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

  @Effect()
  autoLogin$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    switchMap((action) => {
      const authToken: IAuthToken = this.tokenService.getAuthToken();
      let loggedIn: boolean = false;
      if (authToken) {
        if (this.isTokenExpired(authToken)) {
          this.tokenService.deleteAuthToken();
        }
        else {
          loggedIn = true;
          this.autoLogout(authToken.tokenExpiration);
        }
      }
      return of(AuthActions.autoLoginChecked({
        hasLoggedIn: loggedIn
      }));
    })
  );

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
      this.autoLogout(action.authToken.tokenExpiration);
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
      const authToken: IAuthToken = this.tokenService.getAuthToken();
      if (!authToken) {
        return of(AuthActions.logoutSucceed());
      }
      if (this.isTokenExpired(authToken)) {
        this.tokenService.deleteAuthToken();
        return of(AuthActions.logoutSucceed());
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
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
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

  private isTokenExpired(authToken: IAuthToken): boolean {
    return (new Date(authToken.tokenExpiration) < new Date())
  }

  private autoLogout(tokenExpirationDate: Date): void {
    var duration = new Date(tokenExpirationDate).getTime() - new Date().getTime();
    this.tokenExpirationTimer = setTimeout(() => {
      this.tokenService.deleteAuthToken();
      this.store$.dispatch(AuthActions.logoutSucceed());
    }, duration);
  }

}
