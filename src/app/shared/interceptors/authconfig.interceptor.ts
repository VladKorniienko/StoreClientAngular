import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, public router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // No need to add the token to the headers, as it's already in an HttpOnly cookie
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Check if the request is for the refresh token endpoint
          if (request.url.includes(API_ENDPOINTS.refresh)) {
            localStorage.clear();
            this.router.navigate(['login']);
            // If it is, do not try to refresh the token
            return throwError(error);
          } else {
            // If it's not, try to refresh the token
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                // After refreshing the token, retry the original request
                return next.handle(request);
              })
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
}
