import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../../models/project.model';
import { AppStateService } from '../../services/app-state.service';
import { ProjectService } from '../../services/project.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  file!: File;

  isFileUploaded: boolean = false;
  imageSize: string = '';
  zoomRatio: number = 0;
  workingImage = new Image();

  project: Project | undefined;

  zoomInIcon = faPlus;
  zoomOutIcon = faMinus;

  @ViewChild('imageContainer') imageContainer!: ElementRef;

  constructor(
    private appStateService: AppStateService,
    private sessionStorageService: SessionStorageService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
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

    this.getCurrentProject();
  }

  ngAfterViewInit(): void {
    if (this.project) {
      this.isFileUploaded = true;
      this.drawImage(this.project.thumbnail);
    }
  }

  ngOnDestroy(): void {
    this.project = undefined;
    this.sessionStorageService.removeItem('currentProject');
  }

  getCurrentProject() {
    const project = this.projectService.getCurrentProjectFromSessionStorage();
    if (project !== null) {
      this.project = project;
    }
  }

  drawImage(imageData: string) {
    this.imageContainer.nativeElement.src = imageData;
    this.workingImage = new Image();
    this.workingImage.src = imageData;

    this.workingImage.onload = () => {
      this.imageSize = this.workingImage.width + 'x' + this.workingImage.height;
      this.zoomRatio = this.calculateZoomRatio(
        this.imageContainer.nativeElement.width,
        this.imageContainer.nativeElement.height,
        this.workingImage.width,
        this.workingImage.height
      );
    };
  }

  calculateZoomRatio(originalWidth: number, originalHeight: number, actualWidth: number, actualHeight: number): number {
    const originalDiagonal = this.calculateDiagonal(originalWidth, originalHeight);
    const actualDiagonal = this.calculateDiagonal(actualWidth, actualHeight);

    return Math.floor((originalDiagonal / actualDiagonal) * 100);
  }

  calculateDiagonal(width: number, height: number): number {
    return Math.sqrt(width * width + height * height);
  }

  zoomOut() {
    if (this.zoomRatio <= 25) {
      return;
    } else {
      this.zoomRatio = this.zoomRatio - 4;
      this.imageContainer.nativeElement.width = this.workingImage.width * (this.zoomRatio / 100);
      this.imageContainer.nativeElement.height = this.workingImage.height * (this.zoomRatio / 100);
    }
  }
  zoomIn() {
    if (this.zoomRatio >= 200) {
      return;
    } else {
      this.zoomRatio = this.zoomRatio + 4;
      this.imageContainer.nativeElement.width = this.workingImage.width * (this.zoomRatio / 100);
      this.imageContainer.nativeElement.height = this.workingImage.height * (this.zoomRatio / 100);
    }
  }
}
