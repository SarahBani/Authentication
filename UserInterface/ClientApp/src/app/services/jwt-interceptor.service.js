"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInterceptorService = void 0;
var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService() {
    }
    AuthInterceptorService.prototype.intercept = function (req, next) {
        return next.handle(req); // just for now
    };
    return AuthInterceptorService;
}());
exports.AuthInterceptorService = AuthInterceptorService;
//# sourceMappingURL=auth-interceptor-service.js.map