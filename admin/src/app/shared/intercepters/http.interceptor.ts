import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoaderService } from '../loader/services/loader.service';

@Injectable()
export class httpConfigurationClient implements HttpInterceptor {

  constructor(private router: Router, private oidcSecurityService: OidcSecurityService, private loaderService : LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('accessToken');
    if(token){
      req = this.addToken(req, token);
    }
    this.loaderService.isLoading.next(true);
    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
        return throwError(error);
      }));
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`
        }
    });
  }
}
