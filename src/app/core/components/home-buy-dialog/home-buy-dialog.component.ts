import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@shared/models/Product/product';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-buy-dialog',
  templateUrl: './home-buy-dialog.component.html',
  styleUrls: ['./home-buy-dialog.component.css'],
})
export class HomeBuyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar() {
    this._snackBar.open('You successfully purchased the product', 'OK');
  }
  buyProduct() {
    this.userService.buyProductForUser(this.data.id).subscribe(() => {
      this.openSnackBar();
    });
  }
}
