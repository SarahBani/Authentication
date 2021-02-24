import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectHasLoggedIn } from '../store/auth.selector';

@Injectable({ providedIn: 'root' })
export class ProfileGuard implements CanActivate {

  constructor(private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  canActivate(): Observable<boolean>  {
    return this.store.select(selectHasLoggedIn).pipe(
      take(1),
      map(hasLoggedIn => {
        if (hasLoggedIn) {
          return true;
        }
        this.router.navigate(['/access-denied']);
        return false;
      }));
  }

}
