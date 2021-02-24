import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { RequestHeader } from "../models/RequestHeader.model";
import { TokenService } from "./token.service";

export abstract class RestService {

  private requestHeader: RequestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    }),
    responseType: 'json'
  };

  constructor(private httpClient: HttpClient,
    private tokenService: TokenService) {
  }

  protected httpGet<T>(url: string, hasToken: boolean = false): Observable<T> {
    return this.httpClient.get<T>(url, this.getHeader(hasToken));
  }

  protected httpPost<T>(url: string, body: any, hasToken: boolean = false): Observable<T> {
    return this.httpClient.post<T>(url, body, this.getHeader(hasToken));
  }

  private getHeader(hasToken: boolean = false) {
    if (hasToken) {
      const token: string = this.tokenService.getAuthToken()?.token;
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
    }
    return this.requestHeader;
  }

}
