import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@shared/models/Product/product';
import { User } from '@shared/models/User/user';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductEditDialogComponent } from '../../product/product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-admin-panel-product',
  templateUrl: './admin-panel-product.component.html',
  styleUrls: ['./admin-panel-product.component.css'],
})
export class AdminPanelProductComponent implements OnInit {
  public columnsToDisplay = [
    'name',
    'priceUSD',
    'category',
    'genre',
    'actions',
  ];
  public productsToDisplay: Array<Product>;
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public productService: ProductsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.productsToDisplay = new Array<Product>();
    this.dataSource = new MatTableDataSource();
  }
  openEditProductDialog(product: Product) {
    this.dialog.open(ProductEditDialogComponent, {
      data: product,
      height: '1000px',
      width: '2000px',
    });
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }
}
