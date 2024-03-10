import { Component } from '@angular/core';
import { ImageFilterService } from '../../services/image-filter.service';
import { AppStateService } from '../../services/app-state.service';
import { BaseResponse } from '../../payload/response/BaseResponse';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  constructor(
    private imageFilterService: ImageFilterService,
    private appStateService: AppStateService
  ) {}

  applyFilter(filterName: string) {
    switch (filterName) {
      case 'black-and-white':
        this.imageFilterService.applyBlackAndWhiteFilter().subscribe({
          next: (response: BaseResponse<string>) => {
            this.appStateService.applyFilter(response.data);
          },
          error: (error) => {
            console.log(error);
          },
        });
        break;
      default:
        break;
    }
  }
}
