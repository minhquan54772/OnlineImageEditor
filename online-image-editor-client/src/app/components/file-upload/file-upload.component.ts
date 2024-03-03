import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { AppStateService } from '../../services/app-state.service';

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
    private appStateService: AppStateService
  ) {}

  onFileSelected(event: any) {
    const selectedFile: File = event.target?.files[0];
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    this.uploadSubscription = this.httpService
      .uploadFile(this.uploadFileUrl, null, formData)
      .subscribe({
        next: () => {
          this.appStateService.uploadCompleted(selectedFile);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
  }
}
