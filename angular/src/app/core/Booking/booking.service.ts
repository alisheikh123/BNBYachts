import { ErrorService } from './../Error/error.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookingService {
  bookingApiUrl: string = environment.BOOKING_API_URL;
  bookingReview:string = '/api/app/review/if-review-already-posted/';
  bookingCancellation:string = '/api/app/boat-booking/booking-cancellation-detail/';
  boatApiUrl: string = environment.BOAT_API_URL+'/api';
  paymentApiUrl: string = environment.PAYMENTS_API_URL;
  constructor(private http: HttpClient,private errorService: ErrorService) { }

  boatelBooking(model: any) {
    return this.http.post<any>(this.bookingApiUrl + '/api/app/boat-booking/boatel-booking', model).pipe(
      catchError(this.errorService.handleError));
  }

  charterBooking(model: any) {
    return this.http.post<any>(this.bookingApiUrl + '/api/app/boat-booking/charter-booking', model).pipe(
      catchError(this.errorService.handleError));
  }
  eventBooking(model: any) {
    return this.http.post<any>(this.bookingApiUrl + '/api/app/boat-booking/event-booking', model).pipe(
      catchError(this.errorService.handleError));
  }

  modifyboatelBooking(model: any) {
    return this.http.post(this.bookingApiUrl + '/api/app/boat-booking/modify-boatel-booking', model).pipe(
      catchError(this.errorService.handleError));
  }



  getBoatInfo(boatId: any) {
    return this.http.get(this.boatApiUrl + '/boat-details/' + boatId).pipe(
      catchError(this.errorService.handleError));
  }

  saveCancellation(model: any) {
    const data = JSON.stringify(model);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(this.bookingApiUrl + '/api/app/boat-booking/booking-cancel', data, {
      headers: headerOptions
    }).pipe(
      catchError(this.errorService.handleError));
  }

  getRefundable(bookingId: number, refundAmount: number) {
    return this.http.get(this.paymentApiUrl + '/api/refund/' + bookingId + '/' + refundAmount).pipe(
      catchError(this.errorService.handleError));
  }

  addReview(review:any) {
    return this.http.post(this.bookingApiUrl + '/api/app/review/review',review).pipe(
      catchError(this.errorService.handleError));
  }
  getReviews(bookingId:number){
    return this.http.get(this.bookingApiUrl + '/api/app/review/booking-reviews/'+bookingId).pipe(
      catchError(this.errorService.handleError));
  }
  getBoatReviews(boatId:number , reviewSorting : number){
    return this.http.get(this.bookingApiUrl + '/api/app/review/boat-reviews/'+ boatId + '?reviewSorting=' + reviewSorting).pipe(
      catchError(this.errorService.handleError));
  }
  isReviewPosted(bookingId:number) {
    return this.http.get(this.bookingApiUrl + this.bookingReview +bookingId).pipe(
      catchError(this.errorService.handleError));
  }
  getBookingCancellationDetail(bookingId:number):Observable<object>
  {
    return this.http.get(this.bookingApiUrl +this.bookingCancellation+bookingId).pipe(
      catchError(this.errorService.handleError));
  }

  getmyBookings(boatId:number){
    return this.http.get(this.bookingApiUrl +'/api/app/booking-list/my-bookings/'+boatId).pipe(
      catchError(this.errorService.handleError));
  }
  savecharterBookingCancellation(charterBookingCancellationRequestable:any)
  {
    return this.http.post(this.bookingApiUrl + '/api/app/charter-booking/cancel-charter-booking',charterBookingCancellationRequestable).pipe(
      catchError(this.errorService.handleError));
  }
  saveEventBookingCancellation(eventBookingCancellationRequestable:any)
  {
    return this.http.post(this.bookingApiUrl + '/api/app/event-booking/cancel-event-booking',eventBookingCancellationRequestable).pipe(
      catchError(this.errorService.handleError));
  }
  getReviewByUserId(revieweeId:string){
    return this.http.get(this.bookingApiUrl +'/api/app/review/reviews-by-reviewee-id/'+revieweeId).pipe(catchError(this.errorService.handleError));
  }
  getEventBookingDetailById(eventBookingId:number)
  {
    return this.http.get(this.bookingApiUrl +'/api/app/event-booking/event-booking-detail-by-id/'+eventBookingId).pipe(
      catchError(this.errorService.handleError));
  }
  getBookingCancelDetail(bookingId:number)
  {
    return this.http.get(this.bookingApiUrl +'/api/app/event-booking/booking-cancel-detail/'+bookingId).pipe(catchError(this.errorService.handleError));
  }
}
