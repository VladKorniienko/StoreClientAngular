import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import { User } from '@shared/models/User/user';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

  // Get User by ID
  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(API_ENDPOINTS.usersWithId(id), {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  // Get all Users
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(API_ENDPOINTS.users, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  // Buy Product for User
  buyProductForUser(productId: string): Observable<void> {
    const userId = this.getUserId();
    return this.http
      .put<void>(API_ENDPOINTS.buyProductWithId(userId, productId), '', {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        tap(), // Refresh user after buying product
        catchError(this.handleError)
      );
  }

  // Get User ID from local storage
  getUserId(): string {
    return localStorage.getItem('authenticatedUserId') || '';
  }

  // Change User Info
  changeUserInfo(user: User): Observable<void> {
    return this.http
      .put<void>(API_ENDPOINTS.usersWithId(user.id), user, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(tap(), catchError(this.handleError));
  }

  // Make User Admin
  makeAdmin(userId: string): Observable<void> {
    return this.http
      .put<void>(API_ENDPOINTS.makeAdmin(userId), '', {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  // Revoke Admin
  revokeAdmin(userId: string): Observable<void> {
    return this.http
      .put<void>(API_ENDPOINTS.revokeAdmin(userId), '', {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  // Delete User
  deleteUser(userId: string): Observable<void> {
    return this.http
      .delete<void>(API_ENDPOINTS.usersWithId(userId), {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  // Error Handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Error Code: ${error.status}\nMessage: ${error.message}`;
    console.error('An error occurred:', errorMessage); // Log the error to console (customize as needed)
    return throwError(() => new Error(errorMessage));
  }
}
