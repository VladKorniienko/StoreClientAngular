import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@shared/models/Product/product';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'src/app/core/services/user-info.service';
import { User } from '@shared/models/User/user';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-product-buy-dialog',
  templateUrl: './product-buy-dialog.component.html',
  styleUrls: ['./product-buy-dialog.component.css'],
})
export class ProductBuyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public userService: UserService,
    private snackBarService: SnackbarService,
    private userInfoService: UserInfoService
  ) {}

  buyProduct() {
    this.userService.buyProductForUser(this.data.id).pipe(
      tap(() => {
        this.snackBarService.openSnackBar(
          'You successfully purchased the product'
        );
        this.userService
          .getUser(this.userService.getUserId())
          .subscribe((user: User) => {
            this.userInfoService.updateUser(user);
          });
      }),
      catchError((error) => {
        console.error('Error editing user', error);
        this.snackBarService.openSnackBar(error.message);
        // Handle error during product addition
        return of();
      })
    );
  }
}
