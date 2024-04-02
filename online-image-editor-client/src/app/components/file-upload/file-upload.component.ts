import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { AppStateService } from '../../services/app-state.service';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements OnDestroy {
  private uploadSubscription!: Subscription;
  private readonly uploadFileUrl = '/file/upload';

  constructor(
    private httpService: HttpService,
    private appStateService: AppStateService,
    private sessionStorageService: SessionStorageService
  ) {}

  onFileSelected(event: any) {
    const selectedFile: File = event.target?.files[0];

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    this.uploadSubscription = this.httpService.uploadFile(this.uploadFileUrl, null, formData).subscribe({
      next: (response: BaseResponse<string>) => {
        this.sessionStorageService.setItem('currentFile', selectedFile.name);
        this.appStateService.uploadCompleted(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.uploadSubscription?.unsubscribe();
  }
}
