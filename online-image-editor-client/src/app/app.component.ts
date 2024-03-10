import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  file!: File;

  isFileUploaded: boolean = false;

  @ViewChild('imageContainer') imageContainer!: ElementRef;

  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    // this.appStateService._uploadCompleted$.subscribe({
    //   next: (selectedFile: File) => {
    //     this.file = selectedFile;
    //     const url = URL.createObjectURL(this.file);
    //     const image = new Image();
    //     image.src = url;
    //     image.onload = () => {
    //       this.drawImage(image);
    //     };
    //   },
    // });

    this.appStateService._uploadCompleted$.subscribe({
      next: (fileData: string) => {
        this.isFileUploaded = true;
        this.drawImage(fileData);
      },
    });

    this.appStateService._filterApplied$.subscribe({
      next: (fileData: string) => {
        this.drawImage(fileData);
      },
    });
  }

  drawImage(imageData: string) {
    this.imageContainer.nativeElement.src = imageData;
    // const canvasContext = this.imageContainer.nativeElement.getContext('2d');
    // this.imageContainer.nativeElement.width = image.width;
    // this.imageContainer.nativeElement.height = image.height;
    // canvasContext?.moveTo(0, 0);
    // canvasContext?.drawImage(image, image.width, image.height);
  }
}
