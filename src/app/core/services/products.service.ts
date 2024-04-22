import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '@shared/models/Product/product';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  // Get all Products
  getProducts(): Observable<Array<Product>> {
    return this.http
      .get<Array<Product>>(API_ENDPOINTS.products, { headers: this.headers })
      .pipe(
        map((products: any[]) =>
          products.map(
            (product) =>
              new Product(
                product.id,
                product.name,
                product.priceUSD,
                product.genreName, // Get the name from the genre object
                product.categoryName, // Get the name from the category object
                product.description,
                product.icon,
                product.screenshots
              )
          )
        ),
        catchError(this.handleError)
      );
  }
  // Post Product
  addProduct(product: any): Observable<any> {
    return this.http
      .post(API_ENDPOINTS.products, product)
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}
