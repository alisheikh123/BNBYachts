import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class YachtSearchService {
  apiUrl: string = environment.BOAT_API_URL+'/api';
  apiCoreURL: string = environment.CORE_API_URL+'/api';
  apiBookingUrl:string  = environment.BOOKING_API_URL+'/api';

  constructor(private http: HttpClient) { }

  boatelSearch(params: any) {
    return this.http.post(this.apiUrl + '/app/host-boat/get-boatels-by-filters', params).pipe(
      catchError(this.handleError));
  }

  updateCalendar(params: any) {
    return this.http.post(this.apiUrl + '/BoatCalendarUpdate', params).pipe(
      catchError(this.handleError));
  }
  boatDetailsById(id: any) {
    return this.http.get(this.apiUrl + '/app/host-boat/boat-details-by-id/' + id).pipe(
      catchError(this.handleError));
  }
  hostDetailsById(id:string) {
    return this.http.get(this.apiCoreURL + '/app/user/user-details-by-id/'+id).pipe(
      catchError(this.handleError));
  }
  charterSearch(param: any) {
    return this.http.post(this.apiUrl + '/app/host-boat/get-charters-by-filters', param).pipe(
      catchError(this.handleError));
  }
  charterDetailsById(id: number) {
    return this.http.get(this.apiUrl + '/app/host-boat/charter-details-by-id/' + id).pipe(
      catchError(this.handleError));
  }
  eventSearch(param: any) {
    return this.http.post(this.apiUrl + '/app/host-boat/get-events-by-filters', param).pipe(
      catchError(this.handleError));
  }
  eventDetailsById(id: number) {
    return this.http.get(this.apiUrl + '/app/host-boat/event-details-by-id/' + id).pipe(
      catchError(this.handleError));
  }
  defaultFeatures() {
    return this.http.get(this.apiUrl + '/app/host-boat/default-features').pipe(
      catchError(this.handleError));
  }
  updateCharter(boat:any){
    return this.http.put(this.apiUrl + "/app/charter/charter",boat).pipe(
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
