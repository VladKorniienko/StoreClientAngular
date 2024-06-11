import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '@shared/models/Product/product';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

  // Get all Products
  getProducts(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<{ products: Product[]; pagination: any }> {
    return this.http
      .get<Product[]>(API_ENDPOINTS.products, {
        headers: this.headers,
        params: {
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
        },
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Product[]>) => {
          const products: Product[] = response.body ?? [];

          const mappedProducts = products.map(
            (product) =>
              new Product(
                product.id,
                product.name,
                product.priceUSD,
                product.genre,
                product.category,
                product.description,
                product.icon,
                product.screenshots
              )
          );

          // Extract pagination headers
          const pagination = {
            totalCount: response.headers.get('total-count'),
            totalPages: response.headers.get('total-pages'),
            currentPage: response.headers.get('current-page'),
            pageSize: response.headers.get('page-size'),
          };

          return { products: mappedProducts, pagination };
        }),
        catchError(this.handleError)
      );
  }

  // Post Product
  addProduct(product: any): Observable<any> {
    return this.http
      .post<any>(API_ENDPOINTS.products, product)
      .pipe(catchError(this.handleError));
  }

  // Update Product
  changeProduct(product: any, productId: string): Observable<any> {
    return this.http
      .put<any>(API_ENDPOINTS.productsWithId(productId), product)
      .pipe(catchError(this.handleError));
  }

  // Delete Product
  deleteProduct(productId: string): Observable<void> {
    return this.http
      .delete<void>(API_ENDPOINTS.productsWithId(productId))
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMsg =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error(errorMsg));
  }
}
