"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestService = void 0;
var http_1 = require("@angular/common/http");
var RestService = /** @class */ (function () {
    function RestService(httpClient) {
        this.httpClient = httpClient;
        this.headers = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            responseType: 'json'
        };
    }
    RestService.prototype.httpGet = function (url) {
        return this.httpClient.get(url, this.headers);
    };
    RestService.prototype.httpPost = function (url, body) {
        return this.httpClient.post(url, body, this.headers);
    };
    return RestService;
}());
exports.RestService = RestService;
//# sourceMappingURL=rest-service.js.map