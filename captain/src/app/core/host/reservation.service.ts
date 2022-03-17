import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  bookingApiUrl: string = environment.BOOKING_API_URL;
  boatApiUrl: string = environment.BOAT_API_URL+'/api';
  charterApiUrl:string = this.boatApiUrl + '/app/charter/update-charter-location';
  eventApiUrl:string = this.boatApiUrl + '/app/event/update-event-location';
  constructor(private http: HttpClient) { }

  updateBoatLocation(boatLocation: any) {
    return this.http.post(this.boatApiUrl + '/app/host-boat/update-boat-location', boatLocation).pipe(
      catchError(this.handleError));
  }
  updateCharterLocation(charterLocation: any) {
    return this.http.put(this.charterApiUrl, charterLocation).pipe(
      catchError(this.handleError));
  }
  updateEventLocation(eventLocation: any) {
    return this.http.put(this.eventApiUrl , eventLocation).pipe(
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
