import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@shared/services/products.service';
import { Product } from '@shared/models/Product/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HomeInfoDialogComponent } from '../home-info-dialog/home-info-dialog.component';
import { HomeBuyDialogComponent } from '../home-buy-dialog/home-buy-dialog.component';
import { HomeAddDialogComponent } from '../home-add-dialog/home-add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // public columnsToDisplay = ['name', 'priceUSD', 'category'];
  //public dataSource = new MatTableDataSource<Product>();
  //@ViewChild('paginator') paginator!: MatPaginator;
  public dataToDisplay = new Array<Product>();
  constructor(
    public prodService: ProductsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.prodService.getProducts().subscribe((res) => {
      this.dataToDisplay = res;
      // this.dataSource.data = res;
      // this.dataSource.paginator = this.paginator;
    });
  }
  openInfoDialog(product: Product) {
    this.dialog.open(HomeInfoDialogComponent, {
      data: product,
      height: '600px',
      width: '800px',
    });
  }
  openBuyDialog(product: Product) {
    this.dialog.open(HomeBuyDialogComponent, {
      data: product,
      height: '600px',
      width: '800px',
    });
  }
  openAddProductDialog(productService: ProductsService) {
    this.dialog.open(HomeAddDialogComponent, {
      data: productService,
      height: '600px',
      width: '800px',
    });
  }
  ngOnInit() {}
}
