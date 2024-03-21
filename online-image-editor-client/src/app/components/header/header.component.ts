import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { SignInData, SignInSignUpComponent } from '../sign-in-sign-up/sign-in-sign-up.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';
import { BaseResponse } from '../../payload/response/BaseResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  user: User = new User();

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userData = this.localStorageService.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user) {
        this.isUserLoggedIn = true;
        this.getUserInfo(user.email);
      }
    }
  }

  onLogin() {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      data: {
        action: 'login',
      },
    };
    const dialogRef: MatDialogRef<SignInSignUpComponent> = this.dialog.open(SignInSignUpComponent, config);

    dialogRef.afterClosed().subscribe((data: SignInData) => {
      if (data) {
        this.isUserLoggedIn = true;
        this.getUserInfo(data.email);
      }
    });
  }

  onSignup() {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      data: {
        action: 'signup',
      },
    };
    const dialogRef: MatDialogRef<SignInSignUpComponent> = this.dialog.open(SignInSignUpComponent, config);
  }

  getUserInfo(email: string) {
    this.userService.findUserByEmail(email).subscribe({
      next: (response: BaseResponse<User>) => {
        this.user = new User();

        this.user.email = response.data.email;
        this.user.displayName = response.data.displayName;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onNavToProjects() {
    throw new Error('Method not implemented.');
  }
  onNavToAccount() {
    throw new Error('Method not implemented.');
  }

  onSignOut() {
    this.isUserLoggedIn = false;
    this.user = new User();
    this.localStorageService.removeItem('userData');
  }
}
