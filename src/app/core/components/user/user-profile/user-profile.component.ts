import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordInfo } from '@shared/models/Auth/password-info';
import { User } from '@shared/models/User/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  editForm!: FormGroup;
  currentUser: User = new User();
  changePasswordForm!: FormGroup;
  isUserInfoEditing: boolean = false;
  isPasswordEditing: boolean = false;
  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.changePasswordForm = this.fb.group({
      oldPasswordInput: [{ value: '', disabled: true }],
      newPasswordInput: [{ value: '', disabled: true }],
    });
    this.editForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      balance: [{ value: '', disabled: true }],
    });
  }
  ngOnInit() {
    const currentUserId = this.userService.getUserId();
    this.userService.getUser(currentUserId).subscribe((res: User) => {
      this.currentUser = res;
      this.editForm.patchValue({
        id: this.currentUser.id,
        username: this.currentUser.userName,
        email: this.currentUser.email,
        balance: this.currentUser.balance,
      });
    });
  }
  changePassword() {
    let passwordInfo = new PasswordInfo();
    passwordInfo.oldPassword = this.changePasswordForm.value.oldPasswordInput;
    passwordInfo.newPassword = this.changePasswordForm.value.newPasswordInput;
    /*
    this.authService.changePassword(passwordInfo).subscribe(
      (data) => {
        //add mat snack
      },
      (error) => {
        //add mat snack
      }
    );
    */
    console.log('pass');
    this.changePasswordForm.reset();
    this.changePasswordForm.get('oldPasswordInput')?.disable();
    this.changePasswordForm.get('newPasswordInput')?.disable();
    this.isPasswordEditing = false;
  }
  changeUserInfo() {
    /*
    this.userService.changeUserInfo(this.editForm.value).subscribe(
      () => {
        // Handle successful product addition
      },
      (error) => {
        console.error('Error adding product', error);
        // Handle error during product addition
      }
    );
    */
    // Logic to save edits
    console.log('user');
    this.isUserInfoEditing = false;
    this.editForm.get('email')?.disable();
    this.editForm.get('username')?.disable();
    this.editForm.get('balance')?.disable();
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
