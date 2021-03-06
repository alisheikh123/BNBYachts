import { ErrorService } from './../Error/error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StripePaymentRefundRequestable } from 'src/app/shared/interface/refund';
import { EntityResponseModel } from 'src/app/shared/interface/entityResponseModel';

@Injectable()
export class BookingService {
  bookingApiUrl: string = environment.BOOKING_API_URL;
  bookingReview:string = '/api/app/review/if-review-already-posted/';
  bookingCancellation:string = '/api/app/boat-booking/booking-cancellation-detail/';
  boatApiUrl: string = environment.BOAT_API_URL+'/api';
  paymentApiUrl: string = environment.PAYMENTS_API_URL;
  headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
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

  modifyEventBooking(model: any,data:any):Observable<any[]>{
    let modifybooking =  this.http.post(this.bookingApiUrl + '/api/app/event-booking/modify-event-booking', model).pipe(
      catchError(this.errorService.handleError));
    let modifyrefundable =  this.http.post(this.bookingApiUrl + '/api/app/event-booking/modify-event-booking-refundable', data).pipe(
        catchError(this.errorService.handleError));
           return forkJoin([modifybooking,modifyrefundable]);
  }
  getBoatInfo(boatId: any) {
    return this.http.get(this.boatApiUrl + '/app/host-boat/boat-details-by-id/' + boatId).pipe(
      catchError(this.errorService.handleError));
  }

  saveCancellation(model: any) {
    const data = JSON.stringify(model);
    return this.http.post<boolean>(this.bookingApiUrl + '/api/app/boat-booking/booking-cancel', data, {
      headers: this.headerOptions
    }).pipe(
      catchError(this.errorService.handleError));
  }

  getRefundable(bookingId: number, refundAmount: number, isHost: boolean, bookingType :number):Observable<EntityResponseModel> {
    let stripePaymentRefund: StripePaymentRefundRequestable = {
      bookingId: bookingId,
      refundAmount: refundAmount,
      isHost: isHost,
      bookingType: bookingType
    }
    
    return this.http.post<EntityResponseModel>(this.paymentApiUrl + '/api/app/stripe-account/refund-payment',stripePaymentRefund, {
      headers: this.headerOptions
    }).pipe(
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
