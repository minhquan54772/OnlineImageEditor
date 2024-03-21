import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-sign-up.component.html',
  styleUrl: './sign-in-sign-up.component.scss',
})
export class SignInSignUpComponent implements OnInit {
  action: string | undefined;
  isShowPassword: boolean = false;

  signInFormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    signInPassword: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    remember: new FormControl(false),
  });

  signUpFormGroup = new FormGroup({
    signUpEmail: new FormControl('', {
      validators: [Validators.required, Validators.pattern(RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))],
      updateOn: 'blur',
    }),
    signUpPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur',
    }),
  });

  // validation
  @ViewChild('emailValidation') emailValidation!: ElementRef;
  @ViewChild('passwordValidation') passwordValidation!: ElementRef;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    public dialogRef: MatDialogRef<SignInSignUpComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { action: string }
  ) {}

  ngOnInit(): void {
    this.action = this.data.action;
  }

  onSignInClicked() {
    this.userService.login(this.signInFormGroup.value?.email!, this.signInFormGroup.value?.signInPassword!).subscribe({
      next: (response: BaseResponse<boolean>) => {
        if (response.success) {
          const signInData: SignInData = new SignInData();
          signInData.email = this.signInFormGroup.value?.email!;
          signInData.remember = this.signInFormGroup.value?.remember!;

          if (signInData.remember) {
            this.localStorageService.setItem('userData', JSON.stringify(signInData));
          } else {
            this.sessionStorageService.setItem('userData', JSON.stringify(signInData));
          }

          this.dialogRef.close(signInData);
        }
      },
      error: (err) => {
        switch (err.error.message) {
          case 'User not found':
            this.signInFormGroup.controls.email.setErrors({
              email: err.error.message,
            });
            break;
          case 'Incorrect password':
            this.signInFormGroup.controls.signInPassword.setErrors({
              password: err.error.message,
            });
            break;
          default:
            break;
        }
      },
    });
  }

  onSignUpClicked() {
    this.userService
      .signup(this.signUpFormGroup.value?.signUpEmail!, this.signUpFormGroup.value?.signUpPassword!)
      .subscribe({
        next: (response: BaseResponse<User>) => {
          if (response.success) {
            this.snackBar.open('Sign up successfully! Please sign in.', 'OK', { duration: 2000 });
            this.action = 'login';
          } else {
            console.log(response.message);
          }
        },
        error: (error) => {
          switch (error.error.message) {
            case 'This email is linked to an existed account already':
              this.signUpFormGroup.controls.signUpEmail.setErrors({
                email: error.error.message,
              });
              break;
            default:
              break;
          }
        },
      });
  }

  showLoginBox() {
    return this.action === 'login';
  }

  showSignUpBox() {
    return this.action === 'signup';
  }

  isFormControlInvalid(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  openSignUpBox() {
    this.action = 'signup';
  }

  openSignInBox() {
    this.action = 'login';
  }
}

export class SignInData {
  // Sign in
  email: string = '';
  remember: boolean = false;
}

export class SignUpData {
  // Sign up
  email: string = '';
  displayedName: string = '';
}
