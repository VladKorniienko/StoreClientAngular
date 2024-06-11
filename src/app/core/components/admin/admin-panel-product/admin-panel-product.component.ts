import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@shared/models/Product/product';
import { User } from '@shared/models/User/user';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductEditDialogComponent } from '../../product/product-edit-dialog/product-edit-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { ProductAddDialogComponent } from '../../product/product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-admin-panel-product',
  templateUrl: './admin-panel-product.component.html',
  styleUrls: ['./admin-panel-product.component.css'],
})
export class AdminPanelProductComponent implements OnInit {
  public columnsToDisplay: string[] = [
    'name',
    'priceUSD',
    'category',
    'genre',
    'actions',
  ];
  paginationData: any = {};
  public isLoading: boolean = true;
  public dataSource: MatTableDataSource<Product> =
    new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public productService: ProductsService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  handlePageEvent(e: PageEvent) {
    this.loadProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }
  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts(
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        );
      }
    });
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.snackBarService.openSnackBar(
        `Product ${product.name} has been successfully deleted.`
      );
      this.loadProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);
    });
  }

  private loadProducts(pageNumber: number = 1, pageSize: number = 10): void {
    this.isLoading = true;
    this.productService.getProducts(pageNumber, pageSize).subscribe(
      (data) => {
        this.dataSource.data = data.products;
        this.paginationData = data.pagination;

        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading products', error);
        this.isLoading = false; // Set isLoading to false in case of an error
      }
    );
  }
  public openAddProductDialog(productService: ProductsService): void {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      data: productService,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts(
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        );
      }
    });
  }
}
