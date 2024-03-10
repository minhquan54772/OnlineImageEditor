import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../models/user.model';
import {
  SignInData,
  SignInSignUpComponent,
} from '../sign-in-sign-up/sign-in-sign-up.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  user: User = new User();

  constructor(
    private signInDialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const user = this.localStorageService.getItem('userData');
    if (user) {
      this.isUserLoggedIn = true;
      this.user = JSON.parse(user) as User;
    }
  }

  onLogin() {
    const config: MatDialogConfig = {
      hasBackdrop: true,
    };
    const dialogRef: MatDialogRef<SignInSignUpComponent> =
      this.signInDialog.open(SignInSignUpComponent, config);

    dialogRef.afterClosed().subscribe((data: SignInData) => {
      if (data) {
        this.isUserLoggedIn = true;
        this.user.username = data.usernameOrEmail;
        this.user.email = data.usernameOrEmail;
      }
    });
  }

  onSignup() {
    // show popup signup
    alert('In development');
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
