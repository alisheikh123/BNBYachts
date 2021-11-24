import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class YachtSearchService {
  apiUrl: string = environment.BOAT_API_URL;
  apiCoreURL: string = environment.CORE_API_URL;

  constructor(private http: HttpClient) { }

  boatelSearch(params: any) {
    return this.http.post(this.apiUrl + '/FilterBoatelBoats',params).pipe(
      catchError(this.handleError));
  }
  
  updateCalendar(params: any) {
    return this.http.post(this.apiUrl + '/BoatCalendarUpdate',params).pipe(
      catchError(this.handleError));
  }
  boatDetailsById(id:number) {
    return this.http.get(this.apiUrl + '/boat-details/'+id).pipe(
      catchError(this.handleError));
  }
  hostDetailsById(id:string) {
    debugger;
    return this.http.get(this.apiCoreURL + '/GetUserDetailsById/'+id).pipe(
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
