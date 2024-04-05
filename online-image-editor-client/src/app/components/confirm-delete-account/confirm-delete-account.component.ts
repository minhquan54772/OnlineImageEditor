import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrl: './confirm-delete-account.component.scss',
})
export class ConfirmDeleteAccountComponent {
  confirmMessage: string = '';
  currentUser: User = new User();

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { currentUser: User },
    private matDialogRef: MatDialogRef<ConfirmDeleteAccountComponent>,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private appStateService: AppStateService
  ) {
    this.currentUser = this.data.currentUser;
  }

  onCancel() {
    this.matDialogRef.close();
  }
  deleteAccount() {
    if (this.confirmMessage !== 'delete account') {
      return;
    }
    this.userService.deleteUser(this.currentUser.id ? this.currentUser.id : '').subscribe({
      next: () => {
        // close dialog
        this.matDialogRef.close();

        // emit sign out message
        this.appStateService.userSignedOut();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
