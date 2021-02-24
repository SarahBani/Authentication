import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { IProfile } from '../models/IProfile.model';
import { selectProfile } from '../store/auth.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profile$: Observable<IProfile> = this.store.select(selectProfile);

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(AuthActions.getProfile());
  }

}
