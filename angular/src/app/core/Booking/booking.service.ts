import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookingService {
  bookingApiUrl: string = environment.BOOKING_API_URL;
  boatApiUrl: string = environment.BOAT_API_URL;
  paymentApiUrl: string = environment.PAYMENTS_API_URL;
  constructor(private http: HttpClient) { }

  boatelBooking(model: any) {
    return this.http.post(this.bookingApiUrl + '/boatelbooking', model).pipe(
      catchError(this.handleError));
  }
  modifyboatelBooking(model: any) {
    return this.http.post(this.bookingApiUrl + '/modifyboatelbooking', model).pipe(
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


  /* Ali */
  bookingDetail() {
    return this.http.get(this.bookingApiUrl + '/boatelbookingdetail').pipe(catchError(this.handleError));
  }
  upcomingbookingDetail() {
    return this.http.get(this.bookingApiUrl + '/upcomingboatelbookingdetail').pipe(catchError(this.handleError));

  }
  pastbookingDetail() {
    return this.http.get(this.bookingApiUrl + '/pastboatelbookingdetail').pipe(catchError(this.handleError));
  }
  getBoatInfo(boatId: any) {
    return this.http.get(this.boatApiUrl + '/boat-details/' + boatId).pipe(catchError(this.handleError));
  }
  getBookingBoatDetail(BookingId: any) {
    return this.http.get(this.bookingApiUrl + '/boatelbooking/' + BookingId).pipe(catchError(this.handleError));
  }

  saveCancellation(model: any) {
    return this.http.post(this.bookingApiUrl + '/bookingcancel', model).pipe(
      catchError(this.handleError));
  }

  getRefundable(bookingId: number, refundAmount: number) {
    return this.http.get(this.paymentApiUrl + '/refund/' + bookingId + '/' + refundAmount).pipe(catchError(this.handleError));
  }

  /* Ali */
}
