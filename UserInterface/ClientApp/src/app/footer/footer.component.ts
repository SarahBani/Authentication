import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectHasLoggedIn } from '../store/auth.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  hasLoggedIn$: Observable<boolean> = this.store.select(selectHasLoggedIn);

  constructor(private store: Store<fromApp.AppState>) {
  }

}
