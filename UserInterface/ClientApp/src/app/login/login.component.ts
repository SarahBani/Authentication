import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { selectIsLoginModalOpened, selectIsLoading } from '../store/auth.selector';
import { ILogin } from '../models/ILogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginModalOpened$: Observable<boolean> = this.store.select(selectIsLoginModalOpened);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  myFormGroup: FormGroup;
  isValid: boolean = true;
  regexPattern: string = `^[^\\\\/,.^]+$`;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.setFormGroup();
  }

  private setFormGroup(): void {
    this.myFormGroup = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      if (document.getElementsByTagName('form')?.length > 0) {
        this.isValid = (document.getElementsByTagName('form')[0]
          .getElementsByClassName('ng-invalid ng-touched').length == 0);
      }
    }, 0);
  }

  onCancel(): void {
    this.store.dispatch(AuthActions.hideLoginModal());
  }

  onLogin(): void {
    if (!this.myFormGroup.valid) {
      return;
    }
    const data: ILogin = this.myFormGroup.value;
    this.store.dispatch(AuthActions.login({ data: data }));
  }

}
