import { HttpHeaders } from "@angular/common/http";

export interface RequestHeader {

  headers?: HttpHeaders;

  responseType: 'json';

}
