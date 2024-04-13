import { Component, Input, OnInit } from '@angular/core';
import { faCloud, faCrown, faSliders, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { ImageFilter } from '../../models/image-filter.model';
import { User } from '../../models/user.model';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { AppStateService } from '../../services/app-state.service';
import { ImageFilterService } from '../../services/image-filter.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  imageFilters: Array<ImageFilter> = new Array();
  activeFilter: ImageFilter | undefined;
  @Input('isFileUploaded') isFileUploaded: boolean = false;

  currentUser: User = new User();

  vipIcon = faCrown;
  effectIcon = faWandMagicSparkles;
  adjustIcon = faSliders;
  saveProjectIcon = faCloud;

  constructor(
    private imageFilterService: ImageFilterService,
    private userService: UserService,
    private appStateService: AppStateService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllFilters();
  }

  getCurrentUser() {
    const user: User | undefined = this.userService.getSignedInUser();
    if (user) {
      this.userService.findUserByEmail(user.email).subscribe({
        next: (response: BaseResponse<User>) => {
          this.currentUser = response.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  getAllFilters() {
    this.imageFilterService.getAllFilters().subscribe({
      next: (response: BaseResponse<Array<ImageFilter>>) => {
        this.imageFilters = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  applyFilter(selectedFilter: ImageFilter) {
    if (!this.isFileUploaded) {
      return;
    }

    if (selectedFilter.purchaseRequired && !this.currentUser.isVip) {
      return;
    }

    this.resetActive();
    this.activeFilter = this.imageFilters.find((filter) => filter.name === selectedFilter.name);
    if (this.activeFilter) {
      this.activeFilter.active = true;
    }

    this.imageFilterService.applyFilter(selectedFilter.name).subscribe({
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

  getFilterTooltipContent(selectedFilter: ImageFilter): string {
    if (!this.isFileUploaded) {
      return 'Please open an image before editing';
    } else if (selectedFilter.purchaseRequired && !this.currentUser.isVip) {
      return 'You need to upgrade VIP to use this feature.';
    }
    return '';
  }

  isFilterTooltipDisabled(selectedFilter: ImageFilter) {
    return this.isFileUploaded && selectedFilter.purchaseRequired && this.currentUser.isVip;
  }
}
