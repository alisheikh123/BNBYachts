import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookingService {
  bookingApiUrl: string = environment.BOOKING_API_URL;
  boatApiUrl: string = environment.BOAT_API_URL+'/api';
  paymentApiUrl: string = environment.PAYMENTS_API_URL;
  constructor(private http: HttpClient) { }

  boatelBooking(model: any) {
    return this.http.post<any>(this.bookingApiUrl + '/api/app/boat-booking/boatel-booking', model).pipe(
      catchError(this.handleError));
  }

  charterBooking(model: any) {
    return this.http.post<any>(this.bookingApiUrl + '/api/app/boat-booking/charter-booking', model).pipe(
      catchError(this.handleError));
  }
  eventBooking(model: any) {
    return this.http.post<any>(this.bookingApiUrl + '/api/app/boat-booking/event-booking', model).pipe(
      catchError(this.handleError));
  }

  modifyboatelBooking(model: any) {
    return this.http.post(this.bookingApiUrl + '/api/app/boat-booking/modify-boatel-booking', model).pipe(
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

  getBoatInfo(boatId: any) {
    return this.http.get(this.boatApiUrl + '/boat-details/' + boatId).pipe(catchError(this.handleError));
  }

  saveCancellation(model: any) {
    const data = JSON.stringify(model);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(this.bookingApiUrl + '/bookingcancel', data, {
      headers: headerOptions
    }).pipe(
      catchError(this.handleError));
  }

  getRefundable(bookingId: number, refundAmount: number) {
    return this.http.get(this.paymentApiUrl + '/refund/' + bookingId + '/' + refundAmount).pipe(catchError(this.handleError));
  }

  addReview(review:any) {
    return this.http.post(this.bookingApiUrl + '/api/app/review/review',review).pipe(catchError(this.handleError));
  }
  getReviews(bookingId:number){
    return this.http.get(this.bookingApiUrl + '/api/app/review/booking-reviews/'+bookingId).pipe(catchError(this.handleError));
  }
  getBoatReviews(boatId:number){
    return this.http.get(this.bookingApiUrl + '/api/app/review/boat-reviews/'+boatId).pipe(catchError(this.handleError));
  }
  isReviewPosted(bookingId:number) {
    return this.http.get(this.bookingApiUrl + '/api/app/review/if-review-already-posted/'+bookingId).pipe(catchError(this.handleError));
  }
}
