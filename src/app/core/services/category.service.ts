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
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(API_ENDPOINTS.categories, {
      headers: this.headers,
    });
  }

  // Post product
  addProduct(product: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.products, product);
  }
}
