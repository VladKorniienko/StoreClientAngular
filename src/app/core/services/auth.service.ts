import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '@shared/models/User/user';
import { SignInResponse } from '@shared/models/Auth/signInResponse';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import { UserRegister } from '@shared/models/User/user-register';
import { UserLogin } from '@shared/models/User/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) { }

  // Sign-up
  register(userToRegister: UserRegister): Observable<User> {
    return this.http
      .post<User>(API_ENDPOINTS.register, userToRegister, { headers: this.headers })
      .pipe(catchError(this.errorHandler));
  }

  // Sign-in
  signIn(userToLogin: UserLogin) {
    return this.http
      .post<SignInResponse>(API_ENDPOINTS.login, userToLogin, { headers: this.headers, withCredentials: true })
      .subscribe((res: SignInResponse) => {
        localStorage.setItem('authenticatedUserId', res.id);
        this.router.navigate(['users/' + res.id]);
      });
  }
  getUserId() {
    return localStorage.getItem('authenticatedUserId');
  }
  get isLoggedIn(): boolean {
    let isAuthenticated = this.getUserId();
    return isAuthenticated !== null ? true : false;
  }

  logout(): Observable<any> {
    return this.http.post(API_ENDPOINTS.logout, "", { headers: this.headers, withCredentials: true }).pipe(
      tap(() => {
        localStorage.clear();
        this.router.navigate(['login']);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  refreshToken(): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(API_ENDPOINTS.refresh, "", { headers: this.headers, withCredentials: true }).pipe(
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
