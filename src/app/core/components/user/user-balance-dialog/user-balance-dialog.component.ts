import { Component, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@shared/models/User/user';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
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
    private snackBarService: SnackbarService,
    public userService: UserService,
    public dialogRef: MatDialogRef<UserBalanceDialogComponent>
  ) {
    this.editUserForm = this.formBuilder.group({
      id: user.id,
      userName: user.userName,
      email: user.email,
      balance: user.balance,
    });
  }

  editUserBalance() {
    this.userService
      .changeUserInfo(this.editUserForm.value)
      .pipe(
        tap(() => {
          this.snackBarService.openSnackBar('Your balance has been changed');
          const updatedBalance = this.editUserForm.get('balance')?.value;
          this.dialogRef.close(updatedBalance); // Close dialog and pass back the updated balance
          // Handle successful product addition
        }),
        catchError((error) => {
          console.error('Error changing balance', error);
          this.snackBarService.openSnackBar('Something went wrong');
          this.dialogRef.close();
          // Handle error during product addition
          return of();
        })
      )
      .subscribe();
  }
  closeDialog() {
    this.dialogRef.close(); // Close without a result if the balance hasn't changed
  }
}
