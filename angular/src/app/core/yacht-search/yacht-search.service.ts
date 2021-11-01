import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class YachtSearchService {
  apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  boatelSearch(params: any) {
    return this.http.post(this.apiUrl + '/FilterBoatelBoats',params).pipe(
      catchError(this.handleError));
  }
  charterSearch(param: any) {
    return this.http.get(this.apiUrl + '/').pipe(
      catchError(this.handleError));
  }
  eventSearch(param: any) {
    return this.http.get(this.apiUrl + '/').pipe(
      catchError(this.handleError));
  }


  ///Exception handler
  handleError(error: any) {
    debugger;
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
