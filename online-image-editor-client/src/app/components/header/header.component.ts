import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { faCrown, faDownload } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user.model';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { AppStateService } from '../../services/app-state.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { UserService } from '../../services/user.service';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { SignInData, SignInSignUpComponent } from '../sign-in-sign-up/sign-in-sign-up.component';
import { BuyVipPopupComponent } from '../buy-vip-popup/buy-vip-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  user: User = new User();

  isFileUploaded: boolean = false;
  image = new Image();

  downloadIcon = faDownload;
  vipIcon = faCrown;

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private appStateService: AppStateService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = this.userService.getSignedInUser();
    if (userData && userData.email) {
      this.isUserLoggedIn = true;
      this.getUserInfo(userData.email);
    }

    this.appStateService._uploadCompleted$.subscribe({
      next: (fileData: string) => {
        this.isFileUploaded = true;
        this.image = new Image();
        this.image.src = fileData;
      },
    });

    this.appStateService._filterApplied$.subscribe({
      next: (fileData: string) => {
        this.image = new Image();
        this.image.src = fileData;
      },
    });

    this.appStateService._isUserSignedOut$.subscribe({
      next: () => {
        this.onSignOut();
      },
    });
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
        this.user = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onNavToProjects() {
    this.router.navigate(['/my-projects']);
  }
  onNavToAccount() {
    const navigationExtras: NavigationExtras = {
      state: {
        currentUser: this.user,
      },
    };
    this.router.navigate(['/my-account'], navigationExtras);
  }

  onSignOut() {
    this.isUserLoggedIn = false;
    this.user = new User();
    this.localStorageService.removeItem('userData');
    this.sessionStorageService.removeItem('userData');

    this.router.navigate(['/editor']);
  }

  onDownloadImage() {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      data: {
        image: this.image,
        imageName: this.sessionStorageService.getItem('currentFile'),
      },
    };
    const dialogRef: MatDialogRef<DownloadDialogComponent> = this.dialog.open(DownloadDialogComponent, config);
  }

  onClickUpgradeVIP() {
    const config: MatDialogConfig = {
      hasBackdrop: true,
      data: {
        currentUser: this.user,
      },
    };
    const dialogRef: MatDialogRef<BuyVipPopupComponent> = this.dialog.open(BuyVipPopupComponent, config);
  }

  openHomePage() {
    this.router.navigate(['/editor']);
  }
}
