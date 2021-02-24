import { Injectable } from "@angular/core";

import { IAuthToken } from "../models/IAuthToken.model";

@Injectable({ providedIn: 'root' })
export class TokenService {

  private authStorageKeyName: string = 'auth_token';

  public setAuthToken(token: IAuthToken): void {
    localStorage.setItem(this.authStorageKeyName, JSON.stringify(token));
  }

  public getAuthToken(): IAuthToken {
    return JSON.parse(localStorage.getItem(this.authStorageKeyName));
  }

  public deleteAuthToken(): void {
    localStorage.removeItem(this.authStorageKeyName);
  }

}
