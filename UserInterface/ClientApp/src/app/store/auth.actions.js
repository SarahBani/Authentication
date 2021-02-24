"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSucceed = exports.logoutFailed = exports.logout = exports.getProfileSucceed = exports.getProfileFailed = exports.getProfile = exports.loginSucceed = exports.loginFailed = exports.login = exports.hideLoginModal = exports.displayLoginModal = exports.clearError = exports.errorRaised = void 0;
var store_1 = require("@ngrx/store");
exports.errorRaised = store_1.createAction('[Auth] Error Raised', store_1.props());
exports.clearError = store_1.createAction('[Auth] Clear Error');
exports.displayLoginModal = store_1.createAction('[Auth] Display Login Modal');
exports.hideLoginModal = store_1.createAction('[Auth] Hide Login Modal');
exports.login = store_1.createAction('[Auth] Login', store_1.props());
exports.loginFailed = store_1.createAction('[Auth] Login Failed', store_1.props());
exports.loginSucceed = store_1.createAction('[Auth] Login Succeed', store_1.props());
exports.getProfile = store_1.createAction('[Auth] GetProfile');
exports.getProfileFailed = store_1.createAction('[Auth] GetProfile Failed', store_1.props());
exports.getProfileSucceed = store_1.createAction('[Auth] GetProfile Succeed', store_1.props());
exports.logout = store_1.createAction('[Auth] Logout');
exports.logoutFailed = store_1.createAction('[Auth] Logout Failed', store_1.props());
exports.logoutSucceed = store_1.createAction('[Auth] Logout Succeed');
//# sourceMappingURL=auth.actions.js.map