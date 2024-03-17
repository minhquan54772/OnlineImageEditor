import { Component, Input, OnInit } from '@angular/core';
import { ImageFilterService } from '../../services/image-filter.service';
import { AppStateService } from '../../services/app-state.service';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { ImageFilter } from '../../models/image-filter.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  imageFilters: Array<ImageFilter> = new Array();
  activeFilter: ImageFilter | undefined;
  @Input('isFileUploaded') isFileUploaded: boolean = false;

  constructor(private imageFilterService: ImageFilterService, private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.getAllFilters();
  }

  getAllFilters() {
    this.imageFilterService.getAllFilters().subscribe({
      next: (response: BaseResponse<Array<ImageFilter>>) => {
        this.imageFilters = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  applyFilter(filterName: string) {
    if (!this.isFileUploaded) {
      return;
    }

    this.resetActive();
    this.activeFilter = this.imageFilters.find((filter) => filter.name === filterName);
    if (this.activeFilter) {
      this.activeFilter.active = true;
    }

    this.imageFilterService.applyFilter(filterName).subscribe({
      next: (response: BaseResponse<string>) => {
        this.appStateService.applyFilter(response.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  resetActive() {
    this.imageFilters.forEach((filter) => {
      filter.active = false;
    });
  }
}
