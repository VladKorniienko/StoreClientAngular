
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../core/services/auth.service";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
@Injectable()

export class AuthInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // No need to add the token to the headers, as it's already in an HttpOnly cookie
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    // Handle the 401 error by refreshing the token
                    return this.authService.refreshToken();
                } else {
                    return throwError(error);
                }
            })
        );
    }
}
