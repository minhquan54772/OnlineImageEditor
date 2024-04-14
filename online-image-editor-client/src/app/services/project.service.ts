import { Injectable } from '@angular/core';
import { CreateProjectRequest } from '../payload/request/create-project-request';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../payload/response/BaseResponse';
import { Project } from '../models/project.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly API_CREATE_PROJECT = '/projects/create';
  readonly API_FILE = '/file';

  constructor(private httpService: HttpService, private sessionStorageService: SessionStorageService) {}

  createProject(requestBody: CreateProjectRequest): Observable<BaseResponse<Project>> {
    return this.httpService.post(this.API_CREATE_PROJECT, null, requestBody);
  }

  getThumbnail(fileName: string): Observable<BaseResponse<string>> {
    const params = {
      fileName: fileName,
    };
    return this.httpService.get(this.API_FILE, params);
  }

  getCurrentProjectFromSessionStorage(): Project | null {
    const currentProject = this.sessionStorageService.getItem('currentProject');

    return currentProject ? (JSON.parse(currentProject) as Project) : null;
  }
}
