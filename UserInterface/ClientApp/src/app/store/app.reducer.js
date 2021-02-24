"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaReducers = exports.appReducer = void 0;
var fromAuth = require("./auth.reducer");
var environment_1 = require("../../environments/environment");
exports.appReducer = {
    auth: fromAuth.authReducer
};
exports.metaReducers = !environment_1.environment.production ? [] : [];
//# sourceMappingURL=app.reducer.js.map