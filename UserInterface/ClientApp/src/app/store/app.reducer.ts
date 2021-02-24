import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import { environment } from '../../environments/environment';

export interface AppState {
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
