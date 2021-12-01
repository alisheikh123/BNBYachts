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
  boatApiUrl: string = environment.BOAT_API_URL;
  constructor(private http: HttpClient) { }

  getBoatelBookingRequests() {
    return this.http.get(this.bookingApiUrl + '/get-my-reservations').pipe(
      catchError(this.handleError));
  }
  changeStatus(bookingId: number, status: boolean) {
    return this.http.get(this.bookingApiUrl + '/update-reservations-status/' + bookingId + '/' + status).pipe(
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

  getHostBoats() {
    return this.http.get(this.boatApiUrl + '/host-boat-details').pipe(catchError(this.handleError));
  }

}
