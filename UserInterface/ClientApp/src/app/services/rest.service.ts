import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { RequestHeader } from "../models/RequestHeader.model";

export abstract class RestService {

  private requestHeader: RequestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    }),
    responseType: 'json'
  };

  constructor(private httpClient: HttpClient) {
  }

  protected httpGet<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, this.requestHeader);
  }

  protected httpPost<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body, this.requestHeader);
  }

}
