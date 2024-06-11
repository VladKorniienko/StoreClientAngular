import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from '@shared/models/Product/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductInfoDialogComponent } from '../product/product-info-dialog/product-info-dialog.component';
import { ProductBuyDialogComponent } from '../product/product-buy-dialog/product-buy-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public dataToDisplay: Product[] = [];
  public isLoading: boolean = true;
  paginationData: any = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public prodService: ProductsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  handlePageEvent(e: PageEvent) {
    this.loadProducts(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  private loadProducts(pageNumber: number = 1, pageSize: number = 4): void {
    this.isLoading = true; // Set isLoading to true before the request starts
    this.prodService.getProducts(pageNumber, pageSize).subscribe(
      (data) => {
        this.dataToDisplay = data.products;
        this.paginationData = data.pagination;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading products', error);
        this.isLoading = false;
      }
    );
  }

  public openInfoDialog(product: Product): void {
    this.dialog.open(ProductInfoDialogComponent, {
      data: product,
      width: '1000px',
    });
  }

  public openBuyDialog(product: Product): void {
    this.dialog.open(ProductBuyDialogComponent, {
      data: product,
    });
  }
}
