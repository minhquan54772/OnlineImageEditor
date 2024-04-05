import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { User } from '../../models/user.model';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordPopupComponent } from '../../components/change-password-popup/change-password-popup.component';
import { ConfirmDeleteAccountComponent } from '../../components/confirm-delete-account/confirm-delete-account.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  emailIcon = faEnvelope;
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
}
