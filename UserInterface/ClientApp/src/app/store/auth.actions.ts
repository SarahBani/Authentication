import { createAction, props } from '@ngrx/store';

import { ILogin } from '../models/ILogin.model';
import { IAuthToken } from '../models/IAuthToken.model';
import { IProfile } from '../models/IProfile.model';

export const errorRaised = createAction('[Auth] Error Raised',
  props<{ error: string }>());

export const clearError = createAction('[Auth] Clear Error');

export const displayLoginModal = createAction('[Auth] Display Login Modal');

export const hideLoginModal = createAction('[Auth] Hide Login Modal');

export const login = createAction('[Auth] Login',
  props<{ data: ILogin }>());

export const loginFailed = createAction('[Auth] Login Failed',
  props<{ error: string }>());

export const loginSucceed = createAction('[Auth] Login Succeed',
  props<{ authToken: IAuthToken }>());

export const getProfile = createAction('[Auth] GetProfile');

export const getProfileFailed = createAction('[Auth] GetProfile Failed',
  props<{ error: string }>());

export const getProfileSucceed = createAction('[Auth] GetProfile Succeed',
  props<{ profile: IProfile }>());

export const logout = createAction('[Auth] Logout');

export const logoutFailed = createAction('[Auth] Logout Failed',
  props<{ error: string }>());

export const logoutSucceed = createAction('[Auth] Logout Succeed');
