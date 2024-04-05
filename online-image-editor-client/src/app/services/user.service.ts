import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';
import { User } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly API_LOGIN: string = '/auth/login';
  readonly API_SIGN_UP: string = '/users/new';
  readonly API_FIND_USER_BY_EMAIL = '/users/find';
  readonly API_INDIVIDUAL_USER: string = '/users/{id}';

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

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

  updateUserInfo(id: string, incompleteUser: User): Observable<BaseResponse<User>> {
    return this.httpService.patch(this.API_INDIVIDUAL_USER.replace('{id}', id), null, incompleteUser);
  }

  deleteUser(id: string): Observable<void> {
    return this.httpService.delete(this.API_INDIVIDUAL_USER.replace('{id}', id), null);
  }

  getSignedInUser(): User | undefined {
    const user = this.localStorageService.getItem('userData') || this.sessionStorageService.getItem('userData');
    if (user) {
      return JSON.parse(user) as User;
    }

    return undefined;
  }
}
