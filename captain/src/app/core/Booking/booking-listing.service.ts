import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class BookingListingService {

  bookingApiUrl: string = environment.BOOKING_API_URL + '/api/app/user-booking-list';
  charterBookingApiUrl:string = environment.BOOKING_API_URL+'/api/app/charter-booking'
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getBookings(param:any) {
   return this.http.get(this.bookingApiUrl + '/boatel-bookings?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(catchError(this.errorService.handleError));
  }
  getCharterBookings(param:any) {
    return this.http.get(this.bookingApiUrl + '/charter-bookings?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(catchError(this.errorService.handleError));
  }
  getEventBookings(param:any) {
    return this.http.get(this.bookingApiUrl + '/event-bookings?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(catchError(this.errorService.handleError));
  }
  getBookingDetailbyId(BookId: any) {
    return this.http.get(this.bookingApiUrl + '/boatel-booking/' + BookId).pipe(catchError(this.errorService.handleError));
  }
  getHostBookings() {
    return this.http.get(this.bookingApiUrl + '/host-boatel-bookings').pipe(catchError(this.errorService.handleError));
  }
  getCharterBookingDetailById(charterBookingId: number) {
    return this.http.get(this.charterBookingApiUrl+'/charter-booking-detail-by-id/' + charterBookingId).pipe(catchError(this.errorService.handleError));
  }
}
