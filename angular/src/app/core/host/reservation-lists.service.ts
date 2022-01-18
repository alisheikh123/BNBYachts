import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NumericLiteral } from 'typescript';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationListsService {
  bookingApiUrl: string = environment.BOOKING_API_URL + '/api/app/booking-list';
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getBookedServices(param:any) {
    return this.http.get(this.bookingApiUrl + '/booked-services?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }

  getEventBookedServices(param:any) {
    return this.http.get(this.bookingApiUrl + '/events-booked-services?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }

  getCharterBookedServices(param:any) {
    return this.http.get(this.bookingApiUrl + '/charters-booked-services?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }

  getBoatelBookingRequests(param:any) {
    return this.http.get(this.bookingApiUrl + '/bookings-requests?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }
  getCharterBookings(param:any) {
    return this.http.get(this.bookingApiUrl + '/charters-requests?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }
  getEventBookings(param:any) {
    return this.http.get(this.bookingApiUrl + '/events-requests?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }
  getDroppedServices() {
    return this.http.get(this.bookingApiUrl + '/dropped-services').pipe(
      catchError(this.errorService.handleError));
  }

  changeStatus(bookingId: number, status: boolean, reason: string,serviceType:number) {
    return this.http.put(this.bookingApiUrl + '/reservation-status/' + bookingId + '?isAccpeted=' + status + '&rejectionReason=' + reason+'&serviceType='+serviceType, null).pipe(
      catchError(this.errorService.handleError));
  }

}
