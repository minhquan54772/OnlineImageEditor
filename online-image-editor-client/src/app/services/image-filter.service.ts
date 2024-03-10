import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ApplyFilterRequest } from '../payload/request/ApplyFilterRequest';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';

@Injectable({
  providedIn: 'root',
})
export class ImageFilterService {
  readonly APPLY_FILTER_API = '/filter/apply';

  constructor(
    private httpService: HttpService,
    private sessionStorageService: SessionStorageService
  ) {}

  applyBlackAndWhiteFilter(): Observable<BaseResponse<string>> {
    const requestBody = new ApplyFilterRequest();
    requestBody.fileName = this.sessionStorageService.getItem('currentFile')!;
    requestBody.filterName = 'black-and-white';
    return this.httpService.post(this.APPLY_FILTER_API, null, requestBody);
  }
}
