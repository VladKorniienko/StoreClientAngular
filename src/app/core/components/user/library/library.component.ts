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
  public userProducts: Product[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUserProducts();
  }

  openInfoDialog(product: Product): void {
    this.dialog.open(ProductInfoDialogComponent, {
      data: product,
      height: '600px',
      width: '800px',
    });
  }

  private loadUserProducts(): void {
    const userId = this.userService.getUserId();
    this.userService.getUser(userId).subscribe({
      next: (res) => {
        this.userProducts = res.products;
      },
      error: (error) => {
        console.error('Error loading user products:', error);
        // Handle error loading user products
      },
    });
  }
}
