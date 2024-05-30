import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from '@shared/models/Product/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductInfoDialogComponent } from '../product/product-info-dialog/product-info-dialog.component';
import { ProductBuyDialogComponent } from '../product/product-buy-dialog/product-buy-dialog.component';
import { ProductAddDialogComponent } from '../product/product-add-dialog/product-add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public dataToDisplay: Product[] = [];
  public isLoading: boolean = true;

  constructor(public prodService: ProductsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true; // Set isLoading to true before the request starts
    this.prodService.getProducts().subscribe(
      (products: Product[]) => {
        this.dataToDisplay = products;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading products', error);
        this.isLoading = false; // Set isLoading to false in case of an error
      }
    );
  }

  public openInfoDialog(product: Product): void {
    this.dialog.open(ProductInfoDialogComponent, {
      data: product,
      height: '800px',
      width: '800px',
    });
  }

  public openBuyDialog(product: Product): void {
    this.dialog.open(ProductBuyDialogComponent, {
      data: product,
      height: '800px',
      width: '800px',
    });
  }

  public openAddProductDialog(productService: ProductsService): void {
    this.dialog.open(ProductAddDialogComponent, {
      data: productService,
      height: '800px',
      width: '800px',
    });
  }
}
