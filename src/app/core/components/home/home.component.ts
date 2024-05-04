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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public dataToDisplay: Array<Product>;
  constructor(
    public prodService: ProductsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataToDisplay = new Array<Product>();
  }
  openInfoDialog(product: Product) {
    this.dialog.open(ProductInfoDialogComponent, {
      data: product,
      height: '800px',
      width: '800px',
    });
  }
  openBuyDialog(product: Product) {
    this.dialog.open(ProductBuyDialogComponent, {
      data: product,
      height: '800px',
      width: '800px',
    });
  }
  openAddProductDialog(productService: ProductsService) {
    this.dialog.open(ProductAddDialogComponent, {
      data: productService,
      height: '800px',
      width: '800px',
    });
  }
  ngOnInit() {
    this.prodService.getProducts().subscribe((res) => {
      this.dataToDisplay = res;
    });
  }
}
