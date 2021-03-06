import { BookedServicesComponent } from './../../views/host/boatel-bookings/booked-services/booked-services.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';
import { Observable } from 'rxjs';
import { CharterBookingRequestable } from 'src/app/shared/interface/charter';

@Injectable({
  providedIn: 'root'
})
export class BookingListingService {

  bookingApiUrl: string = environment.BOOKING_API_URL + '/api/app/user-booking-list';
  charterBookingApiUrl:string = environment.BOOKING_API_URL+'/api/app/charter-booking';
  eventBookingApiUrl:string = environment.BOOKING_API_URL+'/api/app/charter-booking';

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
  getCharterBookingDetailById(charterBookingId: number):Observable<CharterBookingRequestable> {
    return this.http.get<CharterBookingRequestable>(this.charterBookingApiUrl+'/charter-booking-detail-by-id/' + charterBookingId).pipe(catchError(this.errorService.handleError));
  }
  getHostUpcomingBoatelBooking(param:any)
  {
    return this.http.get(this.bookingApiUrl+'/host-upcoming-boatel-bookings/?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(catchError(this.errorService.handleError));
  }
  getHostUpcomingCharterBooking(param:any)
  {
    return this.http.get(this.bookingApiUrl+'/host-upcoming-charter-bookings/?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(catchError(this.errorService.handleError));
  }
  getHostUpcomingEventBooking(param:any)
  {
    return this.http.get(this.bookingApiUrl+'/host-upcoming-event-bookings/?filter=' + param.filter +'&bookingType='+ param.bookingType + '&month=' + param.month + '&year=' + param.year + '&pageNo=' + param.pageNo + '&pageSize=' + param.pageSize).pipe(catchError(this.errorService.handleError));
  }
  getEventBookingDetailById(eventBookingId: number) {
    return this.http.get(this.charterBookingApiUrl+'/charter-booking-detail-by-id/' + eventBookingId).pipe(catchError(this.errorService.handleError));
  }
}
