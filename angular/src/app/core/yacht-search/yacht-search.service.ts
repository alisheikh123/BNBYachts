import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class YachtSearchService {
  apiUrl: string = environment.BOAT_API_URL+'/api';
  apiCoreURL: string = environment.CORE_API_URL+'/api';

  constructor(private http: HttpClient) { }

  boatelSearch(params: any) {
    return this.http.post(this.apiUrl + '/FilterBoatelBoats', params).pipe(
      catchError(this.handleError));
  }

  updateCalendar(params: any) {
    return this.http.post(this.apiUrl + '/BoatCalendarUpdate', params).pipe(
      catchError(this.handleError));
  }
  boatDetailsById(id: any) {
    return this.http.get(this.apiUrl + '/boat-details/' + id).pipe(
      catchError(this.handleError));
  }
  hostDetailsById(id:string) {
    return this.http.get(this.apiCoreURL + '/GetUserDetailsById/'+id).pipe(
      catchError(this.handleError));
  }
  charterSearch(param: any) {
    return this.http.post(this.apiUrl + '/FilterChartersBoats', param).pipe(
      catchError(this.handleError));
  }
  charterDetailsById(id: number) {
    return this.http.get(this.apiUrl + '/charter-details/' + id).pipe(
      catchError(this.handleError));
  }
  eventSearch(param: any) {
    return this.http.post(this.apiUrl + '/FilterEventsBoats', param).pipe(
      catchError(this.handleError));
  }
  eventDetailsById(id: number) {
    return this.http.get(this.apiUrl + '/event-details/' + id).pipe(
      catchError(this.handleError));
  }
  defaultFeatures() {
    return this.http.get(this.apiUrl + '/get-default-features').pipe(
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
