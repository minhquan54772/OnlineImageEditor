import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  file!: File;

  @ViewChild('imageContainer') imageContainer!: ElementRef;

  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.appStateService._uploadCompleted$.subscribe({
      next: (selectedFile: File) => {
        this.file = selectedFile;
        const url = URL.createObjectURL(this.file);
        const image = new Image();
        image.src = url;

        image.onload = () => {
          this.drawImage(image);
        };
      },
    });
  }

  drawImage(image: any) {
    const canvasContext = this.imageContainer.nativeElement.getContext('2d');
    canvasContext?.moveTo(0, 0);
    canvasContext?.drawImage(image, image.width, image.height);
  }
}
