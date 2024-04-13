import { Injectable } from '@angular/core';
import { CreateProjectRequest } from '../payload/request/create-project-request';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly API_CREATE_PROJECT = '/projects/create';

  constructor(private httpService: HttpService) {}

  createProject(requestBody: CreateProjectRequest): Observable<BaseResponse<Project>> {
    return this.httpService.post(this.API_CREATE_PROJECT, null, requestBody);
  }
}
