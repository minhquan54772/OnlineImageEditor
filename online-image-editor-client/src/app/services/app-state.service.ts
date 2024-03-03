import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor() {}

  private _uploadCompleted = new Subject<File>();
  _uploadCompleted$ = this._uploadCompleted.asObservable();

  public uploadCompleted(file: File) {
    this._uploadCompleted.next(file);
  }
}
