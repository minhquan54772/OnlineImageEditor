import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCrown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { User } from '../../models/user.model';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordPopupComponent } from '../../components/change-password-popup/change-password-popup.component';
import { ConfirmDeleteAccountComponent } from '../../components/confirm-delete-account/confirm-delete-account.component';
import { BuyVipPopupComponent } from '../../components/buy-vip-popup/buy-vip-popup.component';
import { Subscription } from '../../models/subscription.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  emailIcon = faEnvelope;
  vipIcon = faCrown;
  currentUser: User = new User();

  isEditingDisplayName: boolean = false;
  backupCurrentUser: User = new User();

  constructor(private userService: UserService, private matDialog: MatDialog) {
    const signedInUser = this.userService.getSignedInUser();
    if (signedInUser) {
      this.currentUser = signedInUser;
    }
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.findUserByEmail(this.currentUser.email).subscribe({
      next: (response: BaseResponse<User>) => {
        this.currentUser = response.data;
        this.backupCurrentUser = _.cloneDeep(this.currentUser);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onClickEditDisplayName() {
    this.isEditingDisplayName = true;
  }
  onCancelEditDisplayName() {
    this.currentUser = this.backupCurrentUser;
    this.isEditingDisplayName = false;
  }
  onSaveDisplayName() {
    this.isEditingDisplayName = false;
    const userChanges: User = {
      id: this.backupCurrentUser.id,
      displayName: this.backupCurrentUser.displayName,
    };
    this.userService.updateUserInfo(this.currentUser.id ? this.currentUser.id : '', userChanges).subscribe({
      next: (response: BaseResponse<User>) => {
        this.currentUser = response.data;
        this.backupCurrentUser = _.cloneDeep(this.currentUser);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onModifyEmail() {
    alert('Should we allow users to change their email? Email is used to log in to app 🤔🤔🤔');
  }
  onClickChangePassword() {
    const matDialogConfig: MatDialogConfig = {
      data: {
        currentUser: this.currentUser,
      },
    };
    this.matDialog.open(ChangePasswordPopupComponent, matDialogConfig);
  }
  onClickDeleteAccount() {
    const matDialogConfig: MatDialogConfig = {
      data: {
        currentUser: this.currentUser,
      },
    };
    this.matDialog.open(ConfirmDeleteAccountComponent, matDialogConfig);
  }

  onClickUpgradeVIP() {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      data: {
        currentUser: this.currentUser,
      },
    };
    const dialogRef: MatDialogRef<BuyVipPopupComponent> = this.matDialog.open(BuyVipPopupComponent, config);
  }

  /**
   * convert Server Instant To JavaScript Date object
   * @param instant Java instant => number of SECONDS since Jan 01 1970
   * @returns JavaScript Date => number of MILISECONDS since Jan 01 1970
   */
  convertServerInstantToDate(instant: number): Date {
    return new Date(instant * 1000);
  }

  isActiveSubscription(sub: Subscription): boolean {
    const now = new Date();
    const expiredDate = this.convertServerInstantToDate(sub.endDate);
    return expiredDate > now;
  }
}
