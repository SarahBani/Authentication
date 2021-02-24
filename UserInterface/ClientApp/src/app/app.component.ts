import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { selectIsLoading, selectIsLoginModalOpened } from './store/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  isLoginModalOpened$: Observable<boolean> = this.store.select(selectIsLoginModalOpened);

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(AuthActions.autoLogin());
  }

}
