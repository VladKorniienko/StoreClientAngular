import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@shared/models/Product/product';
import { UserService } from '../../../services/user.service';
import { User } from '@shared/models/User/user';
import { catchError, of, tap } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-product-buy-dialog',
  templateUrl: './product-buy-dialog.component.html',
  styleUrls: ['./product-buy-dialog.component.css'],
})
export class ProductBuyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private userService: UserService,
    public userDataService: UserDataService,
    private snackBarService: SnackbarService
  ) {}
  currentIndex = 0;
  showNextImage() {
    if (this.currentIndex < this.data.screenshots.length - 1) {
      this.currentIndex++;
    }
  }

  showPreviousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  buyProduct(): void {
    this.userService
      .buyProductForUser(this.data.id)
      .pipe(
        tap(() => {
          this.userService
            .getUser(this.userDataService.getCurrentUser().id)
            .subscribe({
              next: (updatedUser: User) => {
                this.userDataService.setCurrentUser(updatedUser);
              },
              error: (error) => {
                console.error('Error fetching user:', error);
              },
            });
          this.snackBarService.openSnackBar(
            'You successfully purchased the product'
          );
        }),
        catchError((error) => {
          let errorMessage = 'An error occurred!';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          this.snackBarService.openSnackBar(errorMessage);
          return of(); // Return empty observable to prevent error propagation
        })
      )
      .subscribe();
  }
}
