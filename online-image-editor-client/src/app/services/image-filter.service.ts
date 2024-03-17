import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ApplyFilterRequest } from '../payload/request/ApplyFilterRequest';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';
import { ImageFilter } from '../models/image-filter.model';

@Injectable({
  providedIn: 'root',
})
export class ImageFilterService {
  readonly APPLY_FILTER_API = '/filter/apply';
  readonly GET_FILTERS_API = '/filter/all';

  constructor(private httpService: HttpService, private sessionStorageService: SessionStorageService) {}

  applyFilter(filterName: string): Observable<BaseResponse<string>> {
    const requestBody = new ApplyFilterRequest();
    requestBody.fileName = this.sessionStorageService.getItem('currentFile')!;
    requestBody.filterName = filterName;
    return this.httpService.post(this.APPLY_FILTER_API, null, requestBody);
  }

  getAllFilters(): Observable<BaseResponse<Array<ImageFilter>>> {
    return this.httpService.get(this.GET_FILTERS_API, null);
  }
}
