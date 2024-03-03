import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly SERVER_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  buildParams(params: any): Object {
    const httpHeaders = {
      'Accept-Language': 'vi-VN',
      // 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (!params) {
      params = {};
    }

    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    const httpOptions = {
      headers: httpHeaders,
      params: httpParams,
    };

    return httpOptions;
  }

  buildRestUrl(url: string) {
    return this.SERVER_URL + url;
  }

  get(url: string, params: any): Observable<any> {
    const httpOptions = this.buildParams(params);
    const restUrl = this.buildRestUrl(url);
    return this.http.get(restUrl, httpOptions);
  }

  post(url: string, params: any, body: any): Observable<any> {
    const httpOptions = this.buildParams(params);
    const restUrl = this.buildRestUrl(url);
    return this.http.post(restUrl, body, httpOptions);
  }

  uploadFile(url: string, params: any, body: any): Observable<any> {
    const httpOptions = this.buildParams(params);
    const restUrl = this.buildRestUrl(url);
    return this.http.post(restUrl, body, httpOptions);
  }
}
