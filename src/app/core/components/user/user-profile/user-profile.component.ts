import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordInfo } from '@shared/models/Auth/password-info';
import { User } from '@shared/models/User/user';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  public isLoading: boolean = true;
  editForm!: FormGroup;
  currentUser: User = new User();
  changePasswordForm!: FormGroup;
  isUserInfoEditing: boolean = false;
  isPasswordEditing: boolean = false;
  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private userDataService: UserDataService,
    private snackbarService: SnackbarService
  ) {
    this.changePasswordForm = this.fb.group({
      oldPasswordInput: [{ value: '', disabled: true }],
      newPasswordInput: [{ value: '', disabled: true }],
    });
    this.editForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
    });
  }
  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading = true;
    this.userDataService.currentUser.subscribe({
      next: (user: User | null) => {
        if (user) {
          this.userService
            .getUser(user.id)
            .pipe(
              tap((fetchedUser: User) => {
                this.currentUser = fetchedUser; // Update current user data
                this.editForm.patchValue({
                  username: this.currentUser.userName,
                  email: this.currentUser.email,
                });
                this.isLoading = false;
              }),
              catchError((err) => {
                this.isLoading = false;
                this.snackbarService.openSnackBar(
                  'Something went wrong! Try to log in again to display your data!'
                );
                return throwError(err); // Ensure observable completes with an error
              })
            )
            .subscribe();
        }
      },
      error: () => {
        this.isLoading = false;
        this.snackbarService.openSnackBar(
          'Something went wrong! Try to log in again to display your data!'
        );
      },
    });
  }
  changePassword() {
    let passwordInfo = new PasswordInfo();
    passwordInfo.oldPassword = this.changePasswordForm.value.oldPasswordInput;
    passwordInfo.newPassword = this.changePasswordForm.value.newPasswordInput;

    this.authService
      .changePassword(passwordInfo)
      .pipe(
        tap(() => {
          this.snackbarService.openSnackBar('User has been edited');
        }),
        catchError((error) => {
          console.error('Error editing user', error);
          return [];
        })
      )
      .subscribe();

    this.changePasswordForm.reset();
    this.changePasswordForm.get('oldPasswordInput')?.disable();
    this.changePasswordForm.get('newPasswordInput')?.disable();
    this.isPasswordEditing = false;
  }
  changeUserInfo() {
    this.currentUser.email = this.editForm.get('email')?.value;
    this.currentUser.userName = this.editForm.get('username')?.value;
    this.userService
      .changeUserInfo(this.currentUser)
      .pipe(
        tap(() => {
          this.snackbarService.openSnackBar('User has been edited');
          this.loadUserData();
        }),
        catchError((error) => {
          console.error('Error editing user', error);
          this.loadUserData();
          return [];
        })
      )
      .subscribe();

    // Logic to save edits
    this.isUserInfoEditing = false;
    this.editForm.get('email')?.disable();
    this.editForm.get('username')?.disable();
  }
  enableUserInfoEdit(controlName: string) {
    this.editForm.get(controlName)?.enable();
    this.isUserInfoEditing = true;
  }
  enablePasswordEdit() {
    this.changePasswordForm.get('oldPasswordInput')?.enable();
    this.changePasswordForm.get('newPasswordInput')?.enable();
    this.isPasswordEditing = true;
  }
  saveEdits() {
    if (this.isPasswordEditing) {
      this.changePassword();
    }
    if (this.isUserInfoEditing) {
      this.changeUserInfo();
    }
  }
}
