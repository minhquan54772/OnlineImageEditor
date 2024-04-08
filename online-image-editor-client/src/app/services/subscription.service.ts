import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  readonly API_REGISTER_SUBSCRIPTION = '/subscriptions/register';

  constructor(private httpService: HttpService) {}

  registerSubscription(userId: string): Observable<BaseResponse<User>> {
    const params = {
      userId: userId,
    };

    return this.httpService.post(this.API_REGISTER_SUBSCRIPTION, params, null);
  }
}
