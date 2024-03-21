import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly API_LOGIN: string = '/auth/login';
  readonly API_SIGN_UP: string = '/users/new';
  readonly API_FIND_USER_BY_EMAIL = '/users/find';

  constructor(private httpService: HttpService) {}

  login(email: string, password: string): Observable<BaseResponse<boolean>> {
    const loginRequestBody = {
      email: email,
      password: password,
    };
    return this.httpService.post(this.API_LOGIN, null, loginRequestBody);
  }

  signup(email: string, password: string): Observable<BaseResponse<User>> {
    const signupRequestBody = {
      email: email,
      password: password,
    };
    return this.httpService.post(this.API_SIGN_UP, null, signupRequestBody);
  }

  findUserByEmail(email?: string): Observable<BaseResponse<User>> {
    const params = {
      email: email,
    };
    return this.httpService.get(this.API_FIND_USER_BY_EMAIL, params);
  }
}
