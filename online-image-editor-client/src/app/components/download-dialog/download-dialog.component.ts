import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrl: './download-dialog.component.scss',
})
export class DownloadDialogComponent implements OnInit {
  fileName: string = '';
  fileExtension: string = '';

  @ViewChild('downloadButton') downloadButton!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: any; imageName: string }
  ) {}

  ngOnInit(): void {
    this.getImageNameAndExtension(this.data.imageName);
  }

  getImageNameAndExtension(imageName: string) {
    this.fileName = imageName.substring(0, imageName.lastIndexOf('.'));
    this.fileExtension = imageName.substring(imageName.lastIndexOf('.') + 1).toUpperCase();
  }
}
