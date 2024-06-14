import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import { Genre } from '@shared/models/Genre/genre';
import { Product } from '@shared/models/Product/product';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

  // Get all genres
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(API_ENDPOINTS.genres, {
      headers: this.headers,
    });
  }

  // Post product
  addProduct(product: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.products, product);
  }
}
