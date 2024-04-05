import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { SignInData, SignInSignUpComponent } from '../sign-in-sign-up/sign-in-sign-up.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { SessionStorageService } from '../../services/session-storage.service';
import { NavigationExtras, Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';

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
}
