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

  getBookedServices(serviceType: number, pageNo: number, pageSize: number) {
    return this.http.get(this.bookingApiUrl + '/booked-services?serviceType=' + serviceType + '&pageNo=' + pageNo + '&pageSize=' + pageSize).pipe(
      catchError(this.errorService.handleError));
  }
  getBoatelBookingRequests(param:any) {
    return this.http.get(this.bookingApiUrl + '/bookings-requests?month=' + param.month + '&year=' + param.year + '&serviceType=' + param.serviceType + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }
  getCharterBookings(param:any) {
    return this.http.get(this.bookingApiUrl + '/bookings-requests?month=' + param.month + '&year=' + param.year + '&serviceType=' + param.serviceType + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
      catchError(this.errorService.handleError));
  }
  getEventBookings(param:any) {
    return this.http.get(this.bookingApiUrl + '/bookings-requests?month=' + param.month + '&year=' + param.year + '&serviceType=' + param.serviceType + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(
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
