import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly API_LOGIN: string = '/auth/login';

  constructor(private httpService: HttpService) {}

  login(email: string, password: string): Observable<BaseResponse<boolean>> {
    const loginRequestBody = {
      email: email,
      password: password,
    };
    return this.httpService.post(this.API_LOGIN, null, loginRequestBody);
  }
}
