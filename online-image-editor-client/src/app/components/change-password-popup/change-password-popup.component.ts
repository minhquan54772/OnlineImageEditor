import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { BaseResponse } from '../../payload/response/BaseResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrl: './change-password-popup.component.scss',
})
export class ChangePasswordPopupComponent {
  iconEye = faEye;
  iconEyeSlash = faEyeSlash;

  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  changePasswordFormGroup = new FormGroup({
    newPassword: new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.minLength(8)],
    }),
    confirmPassword: new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  currentUser: User = new User();

  constructor(
    private userService: UserService,
    private matDialogRef: MatDialogRef<ChangePasswordPopupComponent>,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { currentUser: User }
  ) {
    this.currentUser = this.data.currentUser;
  }

  changePassword(): void {
    if (this.changePasswordFormGroup.valid) {
      const passwordChange: User = {
        id: this.currentUser.id,
        password: this.changePasswordFormGroup.value.newPassword ? this.changePasswordFormGroup.value.newPassword : '',
      };
      this.userService.updateUserInfo(this.currentUser.id ? this.currentUser.id : '', passwordChange).subscribe({
        next: (response: BaseResponse<User>) => {
          this.matDialogRef.close(response.data);
          this.matSnackBar.open('Change password successfully!', 'OK', { duration: 2000 });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  isFormControlInvalid(control: FormControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  validateConfirmPassword() {
    const newPassword = this.changePasswordFormGroup.value.newPassword;
    const confirmPassword = this.changePasswordFormGroup.value.confirmPassword;

    if (newPassword !== confirmPassword) {
      this.changePasswordFormGroup.controls.confirmPassword.setErrors({
        confirmPasswordNotEqual: 'New password does not match. Enter new password again here.',
      });
    }
  }
}
