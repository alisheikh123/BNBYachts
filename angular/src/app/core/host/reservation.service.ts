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
  constructor(private http:HttpClient) { }

  getBoatelBookingRequests(){
    return this.http.get(this.bookingApiUrl + '/get-my-reservations').pipe(
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
