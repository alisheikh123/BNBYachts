// // import { NbAuthService } from '@nebular/auth';
// // import { OidcSecurityService } from 'angular-auth-oidc-client';
// import { Injectable } from '@angular/core';
// import {
//   HttpResponse,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LoaderService } from '../services/loader.service';
// import { tap } from 'rxjs/operators';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoaderInterceptorService implements HttpInterceptor {

//   private requests: HttpRequest<any>[] = [];
//   private pendingRequests: number = 0;
//   headers: any;
//   constructor(private loaderService: LoaderService) { }

//   removeRequest(req: HttpRequest<any>) {
//     const i = this.requests.indexOf(req);
//     if (i >= 0) {
//       this.requests.splice(i, 1);
//     }
//     this.loaderService.isLoading.next(this.requests.length > 0);
//   }
// //   canActivate( next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> | Promise<any> | any { }
// //   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  | Promise<any> | any {
// //     let token = this.oidcSecurityService.getAccessToken();
// //     if (token) {
// //         request = this.addToken(request, token);
// //     }
// //        this.onStart();
// //         return next.handle(request)
// //             .pipe(
// //                 tap(
// //                     (event: HttpEvent<any>) => { },
// //                     (err: any) => {
// //                         this.pendingRequests--;
// //                         this.onEnd();
// //                         this.catchError(err);
// //                     },
// //                     () => {
// //                         this.pendingRequests--;
// //                         if (this.pendingRequests == 0) {
// //                             // this.onEnd();
// //                         }
// //                     }
// //                 )
// //             );
// // }
// // private addToken(request: HttpRequest<any>, token: string) {
// //     return request.clone({
// //         setHeaders: {
// //             'Authorization': `Bearer ${token}`
// //         }
// //     });
// // }
// // private onStart(): void {
// //   this.pendingRequests++;
// //   this.loaderService.isLoading.next(true);
// // }
// // private onEnd(): void {
// //    this.loaderService.isLoading.next(false);
// // }
// // private catchError(error: Response | any) {
// //   let errMsg: string = "";
// //   //const body = error;
// //   errMsg = `${error.status} - ${error.statusText || ""}`;
// //   if (error.status == 0) {
// //       //this.toastr.error('Error', 'Api Not Working', { timeOut: 3000, closeButton: true, progressBar: true });
// //   } else if (error.status == 401) {
// //       // this.router.navigate(["/login"]);
// //   } else {
// //       if (error.error) {
// //           //this.toastr.error("Error", error.error.message, { timeOut: 3000, closeButton: true, progressBar: true });
// //       } else {
// //           //this.toastr.error("Error", "Oops! Something went wrong. Please try again.", { timeOut: 3000, closeButton: true, progressBar: true });
// //       }
// //   }
// //   return Observable.throw(errMsg);
// // }
// // }
//   // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Promise<any> | any {
//   //   let token = this.nbAuth.getToken().subscribe((res:any)=>{
//   //     console.log(res);
//   //   });
//   //   if (token) {
//   //     // req = this.addToken(req, token);
//   //   }
//   //   this.requests.push(req);
//   //   this.loaderService.isLoading.next(true);
//   //   return Observable.create((observer:any) => {
//   //     const subscription = next.handle(req)
//   //       .subscribe(
//   //         event => {
//   //           if (event instanceof HttpResponse) {
//   //             this.removeRequest(req);
//   //             observer.next(event);
//   //           }
//   //         },
//   //         err => {
//   //           alert('Error: ' + err);
//   //           this.removeRequest(req);
//   //           observer.error(err);
//   //         },
//   //         () => {
//   //           this.removeRequest(req);
//   //           observer.complete();
//   //         });
//   //     return () => {
//   //       this.removeRequest(req);
//   //       subscription.unsubscribe();
//   //     };
//   //   });
//   // }
//   private addToken(request: HttpRequest<any>, token: string) {
//     return request.clone({
//         setHeaders: {
//             'Authorization': `Bearer ${token}`
//         }
//     });
// }
// }