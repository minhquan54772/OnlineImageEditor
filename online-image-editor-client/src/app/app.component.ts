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
  imageSize: string = '';
  zoomRatio: number = 0;

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
    const image = new Image();
    image.src = imageData;

    image.onload = () => {
      console.log(this.imageContainer);

      this.imageSize = image.width + 'x' + image.height;
      this.zoomRatio = this.calculateZoomRatio(
        this.imageContainer.nativeElement.width,
        this.imageContainer.nativeElement.height,
        image.width,
        image.height
      );
    };

    // const canvasContext = this.imageContainer.nativeElement.getContext('2d');
    // this.imageContainer.nativeElement.width = image.width;
    // this.imageContainer.nativeElement.height = image.height;
    // canvasContext?.moveTo(0, 0);
    // canvasContext?.drawImage(image, image.width, image.height);
  }

  calculateZoomRatio(originalWidth: number, originalHeight: number, actualWidth: number, actualHeight: number): number {
    const originalDiagonal = this.calculateDiagonal(originalWidth, originalHeight);
    const actualDiagonal = this.calculateDiagonal(actualWidth, actualHeight);

    return Math.floor((originalDiagonal / actualDiagonal) * 100);
  }

  calculateDiagonal(width: number, height: number): number {
    return Math.sqrt(width * width + height * height);
  }
}
