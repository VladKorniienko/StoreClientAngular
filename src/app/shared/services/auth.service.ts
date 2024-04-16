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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://localhost:7084/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}`;
    return this.http.post(api, user).pipe(catchError(this.errorHandler));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<SignInResponse>(`${this.endpoint}/Account/login`, user)
      .subscribe((res: SignInResponse) => {
        localStorage.setItem('id', res.id);
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
  getUserProfile(id: string): Observable<any> {
    let api = `${this.endpoint}/Users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
