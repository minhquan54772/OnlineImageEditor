import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
}
