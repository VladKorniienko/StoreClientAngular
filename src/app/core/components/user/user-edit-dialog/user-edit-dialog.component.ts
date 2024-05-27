import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@shared/models/User/user';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css'],
})
export class UserEditDialogComponent {
  public editUserForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    public userService: UserService,
    public dialogRef: MatDialogRef<UserEditDialogComponent>
  ) {
    this.editUserForm = this.formBuilder.group({
      id: user.id,
      userName: user.userName,
      email: user.email,
      balance: user.balance,
    });
  }

  editUserInfo() {
    this.userService
      .changeUserInfo(this.editUserForm.value)
      .pipe(
        tap(() => {
          this.snackBarService.openSnackBar('User has been edited');
          this.dialogRef.close(true);
          // Handle successful product addition
        }),
        catchError((error) => {
          console.error('Error editing user', error);
          this.snackBarService.openSnackBar('Something went wrong');
          this.closeDialog();
          // Handle error during product addition
          return of();
        })
      )
      .subscribe();
  }
  closeDialog() {
    this.dialogRef.close(false); // Close without a result if the balance hasn't changed
  }
}
