import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import { Category } from '@shared/models/Category/category';
import { Genre } from '@shared/models/Genre/genre';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  // Get all categories
  getCategories(): Observable<Array<Category>> {
    return this.http
      .get<Array<Category>>(API_ENDPOINTS.categories, { headers: this.headers })
      .pipe(catchError(this.handleError));
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