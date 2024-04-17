import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '@shared/models/User/user';
import { SignInResponse } from '@shared/models/Auth/signInResponse';
import { API_ENDPOINTS } from '@shared/config/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  register(user: User): Observable<User> {
    return this.http
    .post<User>(API_ENDPOINTS.register, user)
    .pipe(catchError(this.errorHandler));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<SignInResponse>(API_ENDPOINTS.login, user)
      .subscribe((res: SignInResponse) => {
        localStorage.setItem('authenticatedUserId', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken)
        this.router.navigate(['users/' + res.id]);
      });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  getUserProfile(id: string): Observable<User> {
    let api = `${this.endpoint}/Users/${id}`;
    return this.http.get<User>(api, { headers: this.headers }).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.Code}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
