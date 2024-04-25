import { Component, OnInit } from '@angular/core';
import { Product } from '@shared/models/Product/product';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductInfoDialogComponent } from '../../product/product-info-dialog/product-info-dialog.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  public userProducts: Array<Product>;
  constructor(public userService: UserService, public dialog: MatDialog) {
    this.userProducts = new Array<Product>();
  }

  openInfoDialog(product: Product) {
    this.dialog.open(ProductInfoDialogComponent, {
      data: product,
      height: '600px',
      width: '800px',
    });
  }

  ngOnInit(): void {
    let userId = this.userService.getUserId();
    this.userService.getUser(userId).subscribe((res) => {
      this.userProducts = res.products;
    });
  }
}
