import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from "./auth.actions";
import { IProfile } from '../models/IProfile.model';

export const authFeatureKey = 'auth';

export interface State {
  isLoading: boolean;
  error?: string;

  hasLoggedIn: boolean;
  isLoginModalOpened: boolean;
  profile: IProfile
}

const initialState: State = {
  isLoading: false,
  error: null,

  hasLoggedIn: false,
  isLoginModalOpened: false,
  profile: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.errorRaised, (state: State, action) =>
    ({
      ...state,
      isLoading: false,
      error: action.error,
    })),
  on(AuthActions.clearError, (state: State) =>
    ({
      ...state,
      error: null,
    })),
  on(AuthActions.autoLogin, (state: State) =>
    ({
      ...state,
      isLoading: true,
    })),
  on(AuthActions.autoLoginChecked, (state: State, action) =>
    ({
      ...state,
      isLoading: false,
      hasLoggedIn: action.hasLoggedIn,
    }))
  ,
  on(AuthActions.displayLoginModal, (state: State) =>
    ({
      ...state,
      error: null,
      isLoginModalOpened: true,
    })),
  on(AuthActions.hideLoginModal, (state: State) =>
    ({
      ...state,
      error: null,
      isLoginModalOpened: false,
    })),
  on(AuthActions.login, (state: State, action) =>
    ({
      ...state,
      isLoading: true,
      error: null
    })),
  on(AuthActions.loginFailed, (state: State, action) =>
    ({
      ...state,
      isLoading: false,
      error: action.error
    })),
  on(AuthActions.loginSucceed, (state: State) =>
    ({
      ...state,
      isLoading: false,
      error: null,
      hasLoggedIn: true,
      isLoginModalOpened: false,
    })),
  on(AuthActions.getProfile, (state: State, action) =>
    ({
      ...state,
      isLoading: true,
      error: null,
      profile: null
    })),
  on(AuthActions.getProfileFailed, (state: State, action) =>
    ({
      ...state,
      isLoading: false,
      error: action.error
    })),
  on(AuthActions.getProfileSucceed, (state: State, action) =>
    ({
      ...state,
      isLoading: false,
      error: null,
      profile: action.profile
    })),
  on(AuthActions.logout, (state: State) =>
    ({
      ...state,
      isLoading: true,
      error: null
    })),
  on(AuthActions.logoutFailed, (state: State, action) =>
    ({
      ...state,
      isLoading: false,
      error: action.error
    })),
  on(AuthActions.logoutSucceed, (state: State) =>
    ({
      ...state,
      isLoading: false,
      error: null,
      hasLoggedIn: false,
      profile: null
    })),
);

export function reducer(state: State | undefined, action: Action): any {
  return authReducer(state, action);
}
