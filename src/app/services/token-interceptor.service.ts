import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TokenStorageService } from "./token-storage.service";

export const IGNORED_STATUSES = new HttpContextToken<number[]>(() => []);

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const ignoredStatuses = req.context.get(IGNORED_STATUSES);

    const token: string = this.tokenStorageService.getToken()!;

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (ignoredStatuses?.includes(err.status)) {
          // rethrow error to be catched locally
          return throwError(() => err);
        }

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError(() => new Error('error interceptor'));

      })
    );
  }
  
  
}
