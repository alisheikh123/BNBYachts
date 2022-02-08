import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { LoaderService } from "../loader/services/loader.service";

@Injectable({
    providedIn: "root"
})
export class HttpConfigInterceptor implements HttpInterceptor {
    private pendingRequests: number = 0;
    headers: any;
    constructor(private loader: LoaderService, private router: Router, private oidcSecurityService : OidcSecurityService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.oidcSecurityService.getAccessToken();
        if (token) {
            request = this.addToken(request, token);
        }
            //  this.onStart();
            return next.handle(request)
                .pipe(
                    tap(
                        (event: HttpEvent<any>) => { },
                        (err: any) => {
                            this.pendingRequests--;
                            this.onEnd();
                            this.catchError(err);
                        },
                        () => {
                            this.pendingRequests--;
                            if (this.pendingRequests == 0) {
                                // this.onEnd();
                            }
                        }
                    )
                );
    }
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    private onStart(): void {
        this.pendingRequests++;
        this.loader.isLoading.next(true);
    }
    private onEnd(): void {
        this.loader.isLoading.next(false);
    }
    private catchError(error: Response | any) {
        let errMsg: string = "";
        //const body = error;
        errMsg = `${error.status} - ${error.statusText || ""}`;
        if (error.status == 0) {
            //this.toastr.error('Error', 'Api Not Working', { timeOut: 3000, closeButton: true, progressBar: true });
        } else if (error.status == 401) {
            // this.router.navigate(["/login"]);
        } else {
            if (error.error) {
                //this.toastr.error("Error", error.error.message, { timeOut: 3000, closeButton: true, progressBar: true });
            } else {
                //this.toastr.error("Error", "Oops! Something went wrong. Please try again.", { timeOut: 3000, closeButton: true, progressBar: true });
            }
        }
        return Observable.throw(errMsg);
    }
}
