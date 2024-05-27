import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import { User } from '@shared/models/User/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  // User profile
  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(API_ENDPOINTS.usersWithId(id), {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.errorHandler));
  }
  getUsers(): Observable<Array<User>> {
    return this.http
      .get<Array<User>>(API_ENDPOINTS.users, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.errorHandler));
  }
  buyProductForUser(productId: string): Observable<any> {
    return this.http
      .put<any>(
        API_ENDPOINTS.buyProductWithId(
          this.getUserId(),
          (productId = productId)
        ),
        '',
        {
          headers: this.headers,
          withCredentials: true,
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getUserId() {
    return localStorage.getItem('authenticatedUserId') || '';
  }

  changeUserInfo(user: User): Observable<void> {
    return this.http
      .put<void>(API_ENDPOINTS.usersWithId(user.id), user, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.errorHandler));
  }

  makeAdmin(userId: string): Observable<any> {
    return this.http.put(API_ENDPOINTS.makeAdmin(userId), '', {
      headers: this.headers,
      withCredentials: true,
    });
  }
  revokeAdmin(userId: string): Observable<any> {
    return this.http.put(API_ENDPOINTS.revokeAdmin(userId), '', {
      headers: this.headers,
      withCredentials: true,
    });
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.usersWithId(userId), {
      headers: this.headers,
      withCredentials: true,
    });
  }
  private errorHandler(error: any): Observable<never> {
    console.error('An error occurred', error); // Customize this as needed
    return throwError(error);
  }
}
