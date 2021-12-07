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
    return this.http.post<any>(this.bookingApiUrl + '/boatelbooking', model).pipe(
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
  bookingDetail(month? : string,year?: string) {
    return this.http.get(this.bookingApiUrl + '/boatelbookingdetail?month='+month+'&year='+year).pipe(catchError(this.handleError));
  }
  upcomingbookingDetail(month? : string,year?: string) {
    return this.http.get(this.bookingApiUrl + '/upcomingboatelbookingdetail?month='+month+'&year='+year).pipe(catchError(this.handleError));

  }
  pastbookingDetail(month? : string,year?: string) {
    return this.http.get(this.bookingApiUrl + '/pastboatelbookingdetail?month='+month+'&year='+year).pipe(catchError(this.handleError));
  }
  getBoatInfo(boatId: any) {
    return this.http.get(this.boatApiUrl + '/boat-details/' + boatId).pipe(catchError(this.handleError));
  }
  getBookingBoatDetail(BookingId: any) {
    return this.http.get(this.bookingApiUrl + '/boatelbooking/' + BookingId).pipe(catchError(this.handleError));
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

  /* Ali */
  getUpcomingHostBookingDetail() {
    return this.http.get(this.bookingApiUrl + '/upcominghostboatelbookingdetail').pipe(catchError(this.handleError));
  }
}
