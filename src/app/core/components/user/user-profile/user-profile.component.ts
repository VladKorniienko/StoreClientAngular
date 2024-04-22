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
  currentUser: User = new User();
  changePasswordForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.changePasswordForm = this.fb.group({
      oldPasswordInput: [''],
      newPasswordInput: [''],
    })
  }
  ngOnInit() {
    let id = this.actRoute.snapshot.paramMap.get('id') || '';
    this.userService.getUser(id).subscribe((res: User) => {
      this.currentUser = res;
    });
  }
  changePassword() {

    let passwordInfo = new PasswordInfo();
    passwordInfo.oldPassword = this.changePasswordForm.value.oldPasswordInput;
    passwordInfo.newPassword = this.changePasswordForm.value.newPasswordInput;

    this.authService.changePassword(passwordInfo).subscribe(
      data => {
        //add mat snack
      },
      error => {
        //add mat snack
      }
    )
  }
}