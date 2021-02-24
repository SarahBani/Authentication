import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { RestService } from "./rest.service";
import { ILogin } from "../models/ILogin.model";
import { ITransactionResult } from "../models/ITransactionResult.model";
import { TokenService } from "./token.service";
import { IProfile } from "../models/IProfile.model";

@Injectable({ providedIn: 'root' })
export class AuthService extends RestService {

  private loginUrl: string = '/auth/login';
  private logoutUrl: string = '/auth/logout';
  private getProfileUrl: string = '/auth/getprofile';

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  public login(data: ILogin): Observable<ITransactionResult> {
    return super.httpPost<ITransactionResult>(this.loginUrl, data);
  }

  public getProfile(): Observable<IProfile> {
    return super.httpGet<IProfile>(this.getProfileUrl);
  }

  public logout(): Observable<ITransactionResult> {
    return super.httpGet<ITransactionResult>(this.logoutUrl);
  }

}
