import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  endpoint: string = 'https://localhost:7218/api/Products';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  // Get all Products
  getProducts(): Observable<any> {
    let api = `${this.endpoint}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Post Product
  addProduct(product: any): Observable<any> {
    let api = `${this.endpoint}`;
    return this.http.post(api, product).pipe(catchError(this.handleError));
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
