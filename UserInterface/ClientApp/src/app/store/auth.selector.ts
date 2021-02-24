import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);

export const selectIsLoading = createSelector(selectAuthState, (state: fromAuth.State) => state.isLoading);

export const selectError = createSelector(selectAuthState, (state: fromAuth.State) => state.error);

export const selectIsLoginModalOpened = createSelector(selectAuthState, (state: fromAuth.State) => state.isLoginModalOpened);

export const selectHasLoggedIn = createSelector(selectAuthState, (state: fromAuth.State) => state.hasLoggedIn);

export const selectProfile = createSelector(selectAuthState, (state: fromAuth.State) => state.profile);
