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
import { PasswordInfo } from '@shared/models/Auth/password-info';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  register(userToRegister: UserRegister): Observable<User> {
    return this.http
      .post<User>(API_ENDPOINTS.register, userToRegister, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorHandler));
  }

  signIn(userToLogin: UserLogin): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(API_ENDPOINTS.login, userToLogin, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        tap((res: SignInResponse) => {
          localStorage.setItem('authenticatedUserId', res.id);
          localStorage.setItem('authenticatedUserRole', res.role);
          this.userInfoService.updateUser({
            id: res.id,
            role: res.role,
            userName: '',
            email: '',
            balance: 0,
            products: [],
          });
          this.router.navigate(['users', res.id]);
        }),
        catchError(this.handleError('Login failed'))
      );
  }

  getUserId(): string | null {
    return localStorage.getItem('authenticatedUserId');
  }

  getUserRole(): string {
    return localStorage.getItem('authenticatedUserRole') || '';
  }

  get isLoggedIn(): boolean {
    return this.getUserId() !== null;
  }

  logout(): Observable<any> {
    localStorage.clear();
    this.router.navigate(['login']);
    return this.http
      .post(API_ENDPOINTS.logout, '', {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.errorHandler));
  }

  refreshToken(): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(API_ENDPOINTS.refresh, '', {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        tap((res: SignInResponse) => {
          localStorage.setItem('authenticatedUserId', res.id);
          localStorage.setItem('authenticatedUserRole', res.role);
          this.userInfoService.updateUser({
            id: res.id,
            role: res.role,
            userName: '',
            email: '',
            balance: 0,
            products: [],
          });
        }),
        catchError(this.handleError('Error refreshing token'))
      );
  }

  changePassword(passwordInfo: PasswordInfo): Observable<any> {
    return this.http
      .put(API_ENDPOINTS.changePassword, passwordInfo, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  private handleError(message: string) {
    return (error: any): Observable<never> => {
      console.error(message, error);
      return throwError(error);
    };
  }
}
