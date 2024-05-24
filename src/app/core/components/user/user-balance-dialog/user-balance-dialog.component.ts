import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@shared/models/User/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-balance-dialog',
  templateUrl: './user-balance-dialog.component.html',
  styleUrls: ['./user-balance-dialog.component.css'],
})
export class UserBalanceDialogComponent {
  public editUserForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public userService: UserService
  ) {
    this.editUserForm = this.formBuilder.group({
      id: user.id,
      userName: user.userName,
      email: user.email,
      balance: user.balance,
    });
  }
  openSnackBar() {
    this._snackBar.open('Your balance has been changed', 'OK');
  }
  editUserBalance() {
    this.userService.changeUserInfo(this.editUserForm.value).subscribe(
      () => {
        this.openSnackBar();
        // Handle successful product addition
      },
      (error) => {
        console.error('Error changing balance', error);
        // Handle error during product addition
      }
    );
  }
}
