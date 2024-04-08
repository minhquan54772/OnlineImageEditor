import { Component, Inject, OnInit } from '@angular/core';
import { faCircleCheck, faCircleXmark, faTag } from '@fortawesome/free-solid-svg-icons';
import { ImageFilterService } from '../../services/image-filter.service';
import { AppStateService } from '../../services/app-state.service';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { ImageFilter } from '../../models/image-filter.model';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-buy-vip-popup',
  templateUrl: './buy-vip-popup.component.html',
  styleUrl: './buy-vip-popup.component.scss',
})
export class BuyVipPopupComponent implements OnInit {
  discountIcon = faTag;
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  isLoading: boolean = false;

  selectedPlan: 'basic' | 'pro' = 'basic';
  currentUser: User = new User();

  imageFilters: ImageFilter[] = [];

  constructor(
    private imageFilterService: ImageFilterService,
    private appStateService: AppStateService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: { currentUser: User },
    private matDialogRef: MatDialogRef<BuyVipPopupComponent>
  ) {
    this.currentUser = this.data.currentUser;
  }

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

  onClickUpgrade() {
    if (this.currentUser.id) {
      this.subscriptionService.registerSubscription(this.currentUser.id).subscribe({
        next: (response: BaseResponse<User>) => {
          this.appStateService.userPurchasedVip();
          this.matDialogRef.close();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
