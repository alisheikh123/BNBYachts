import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  apiCoreURl = environment.BOAT_API_URL;
  constructor(private http: HttpClient) { }

  getUserBoats(pageNo:number,pageSize:number) {
    return this.http.get(this.apiCoreURl + '/api/app/host-boat/host-boats?pageNo=' + pageNo + '&pageSize=' + pageSize).pipe(
      catchError(this.handleError));;
  }
   ///Exception handler
   handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
