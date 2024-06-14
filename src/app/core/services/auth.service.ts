import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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
import { UserDataService } from './user-data.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router,
    private userDataService: UserDataService,
    private userService: UserService
  ) {}

  register(userToRegister: UserRegister): Observable<User> {
    return this.http.post<User>(API_ENDPOINTS.register, userToRegister, {
      headers: this.headers,
    });
  }

  signIn(userToLogin: UserLogin): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(API_ENDPOINTS.login, userToLogin, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        switchMap((res: SignInResponse) => {
          localStorage.setItem('authenticatedUserId', res.id);
          localStorage.setItem('authenticatedUserRole', res.role);
          return this.userService.getUser(res.id); // Fetch user details after login
        }),
        tap((user: User) => {
          this.userDataService.setCurrentUser(user); // Update current user data
          this.router.navigate(['users', user.id]);
        })
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
    this.userDataService.clearCurrentUser();
    this.router.navigate(['login']);
    return this.http.post(API_ENDPOINTS.logout, '', {
      headers: this.headers,
      withCredentials: true,
    });
  }

  refreshToken(): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(API_ENDPOINTS.refresh, '', {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        switchMap((res: SignInResponse) => {
          localStorage.setItem('authenticatedUserId', res.id);
          localStorage.setItem('authenticatedUserRole', res.role);
          return this.userService.getUser(res.id); // Fetch user details after token refresh
        }),
        tap((user: User) => {
          this.userDataService.setCurrentUser(user); // Update current user data
        })
      );
  }

  changePassword(passwordInfo: PasswordInfo): Observable<any> {
    return this.http.put(API_ENDPOINTS.changePassword, passwordInfo, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
