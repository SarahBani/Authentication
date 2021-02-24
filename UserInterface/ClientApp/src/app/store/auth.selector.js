"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProfile = exports.selectHasLoggedIn = exports.selectIsLoginModalOpened = exports.selectError = exports.selectIsLoading = exports.selectAuthState = void 0;
var store_1 = require("@ngrx/store");
var fromAuth = require("./auth.reducer");
exports.selectAuthState = store_1.createFeatureSelector(fromAuth.authFeatureKey);
exports.selectIsLoading = store_1.createSelector(exports.selectAuthState, function (state) { return state.isLoading; });
exports.selectError = store_1.createSelector(exports.selectAuthState, function (state) { return state.error; });
exports.selectIsLoginModalOpened = store_1.createSelector(exports.selectAuthState, function (state) { return state.isLoginModalOpened; });
exports.selectHasLoggedIn = store_1.createSelector(exports.selectAuthState, function (state) { return state.hasLoggedIn; });
exports.selectProfile = store_1.createSelector(exports.selectAuthState, function (state) { return state.profile; });
//# sourceMappingURL=auth.selector.js.map