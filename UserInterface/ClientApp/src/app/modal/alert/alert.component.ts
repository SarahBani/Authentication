import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
import { selectError } from '../../store/auth.selector';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  error$: Observable<string> = this.store.select(selectError);

  constructor(private store: Store<fromApp.AppState>) { }

  onClose(): void {
    this.store.dispatch(AuthActions.clearError());
  }

}
