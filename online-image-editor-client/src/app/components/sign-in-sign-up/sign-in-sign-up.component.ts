import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-sign-up.component.html',
  styleUrl: './sign-in-sign-up.component.scss',
})
export class SignInSignUpComponent implements OnInit {
  isShowPassword: boolean = false;

  signInFormGroup = new FormGroup({
    usernameOrEmail: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    signInPassword: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    remember: new FormControl(false),
  });

  // validation
  @ViewChild('emailValidation') emailValidation!: ElementRef;
  @ViewChild('passwordValidation') passwordValidation!: ElementRef;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    public dialogRef: MatDialogRef<SignInSignUpComponent>
  ) {}

  ngOnInit(): void {}

  onSignInClicked() {
    this.userService
      .login(
        this.signInFormGroup.value?.usernameOrEmail!,
        this.signInFormGroup.value?.signInPassword!
      )
      .subscribe({
        next: (response: BaseResponse<boolean>) => {
          if (response.success) {
            const signInData: SignInData = new SignInData();
            signInData.usernameOrEmail =
              this.signInFormGroup.value?.usernameOrEmail!;
            signInData.remember = this.signInFormGroup.value?.remember!;

            if (signInData.remember) {
              this.localStorageService.setItem(
                'userData',
                JSON.stringify(signInData)
              );
            } else {
              this.sessionStorageService.setItem(
                'userData',
                JSON.stringify(signInData)
              );
            }

            this.dialogRef.close(signInData);
          } else {
            switch (response.message) {
              case 'User not found':
                this.signInFormGroup.controls.usernameOrEmail.setErrors({
                  email: response.message,
                });
                break;
              case 'Incorrect password':
                this.signInFormGroup.controls.signInPassword.setErrors({
                  password: response.message,
                });
                break;
            }
          }
        },
      });
  }

  isFormControlInvalid(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  openSignUpBox() {
    throw new Error('Method not implemented.');
  }
}

export class SignInData {
  // Sign in
  usernameOrEmail: string = '';
  remember: boolean = false;
}

export class SignUpData {
  // Sign up
  username: string = '';
  email: string = '';
  displayedName: string = '';
}
