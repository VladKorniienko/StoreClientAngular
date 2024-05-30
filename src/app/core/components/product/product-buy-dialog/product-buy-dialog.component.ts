import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@shared/models/Product/product';
import { UserService } from '../../../services/user.service';
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
    private userService: UserService,
    private snackBarService: SnackbarService
  ) {}

  buyProduct(): void {
    this.userService
      .buyProductForUser(this.data.id)
      .pipe(
        tap(() => {
          this.snackBarService.openSnackBar(
            'You successfully purchased the product'
          );
        }),
        catchError((error) => {
          console.error('Error buying product', error);
          this.snackBarService.openSnackBar(error.message);
          return of(); // Return empty observable to prevent error propagation
        })
      )
      .subscribe(); // Subscribe to execute the observable
  }
}
