import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { selectHasLoggedIn, selectIsLoading } from '../store/auth.selector';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  hasLoggedIn$: Observable<boolean> = this.store.select(selectHasLoggedIn);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private store: Store<fromApp.AppState>) {
  }

  onDisplayLogin(): void {
    this.store.dispatch(AuthActions.displayLoginModal());
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }

}
