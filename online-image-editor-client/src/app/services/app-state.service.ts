import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor() {}

  private _uploadCompleted = new Subject<string>();
  _uploadCompleted$ = this._uploadCompleted.asObservable();

  public uploadCompleted(fileData: string) {
    this._uploadCompleted.next(fileData);
  }

  private _filterApplied = new Subject<string>();
  _filterApplied$ = this._filterApplied.asObservable();

  public applyFilter(fileData: string) {
    this._filterApplied.next(fileData);
  }

  private _isUserSignedOut = new Subject<void>();
  _isUserSignedOut$ = this._isUserSignedOut.asObservable();

  public userSignedOut() {
    this._isUserSignedOut.next();
  }

  private _vipPurchased = new Subject<void>();
  _vipPurchased$ = this._vipPurchased.asObservable();

  public userPurchasedVip() {
    this._vipPurchased.next();
  }

  private _projectOpen = new Subject<Project>();
  _projectOpen$ = this._projectOpen.asObservable();

  public openProject(project: Project) {
    this._projectOpen.next(project);
  }
}
