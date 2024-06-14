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
    return this.http.get<User>(API_ENDPOINTS.usersWithId(id), {
      headers: this.headers,
      withCredentials: true,
    });
  }

  // Get all Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_ENDPOINTS.users, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  // Buy Product for User
  buyProductForUser(productId: string): Observable<void> {
    const userId = this.getUserId();
    return this.http.put<void>(
      API_ENDPOINTS.buyProductWithId(userId, productId),
      '',
      {
        headers: this.headers,
        withCredentials: true,
      }
    );
  }

  // Get User ID from local storage
  getUserId(): string {
    return localStorage.getItem('authenticatedUserId') || '';
  }

  // Change User Info
  changeUserInfo(user: User): Observable<void> {
    return this.http.put<void>(API_ENDPOINTS.usersWithId(user.id), user, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  // Make User Admin
  makeAdmin(userId: string): Observable<void> {
    return this.http.put<void>(API_ENDPOINTS.makeAdmin(userId), '', {
      headers: this.headers,
      withCredentials: true,
    });
  }

  // Revoke Admin
  revokeAdmin(userId: string): Observable<void> {
    return this.http.put<void>(API_ENDPOINTS.revokeAdmin(userId), '', {
      headers: this.headers,
      withCredentials: true,
    });
  }

  // Delete User
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.usersWithId(userId), {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
