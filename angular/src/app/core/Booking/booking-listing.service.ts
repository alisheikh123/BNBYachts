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
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getBookings(filterType:number,reservationfilterType:number,month?: string, year?: string,pageNo?: number, pageSize?: number) {
    return this.http.get(this.bookingApiUrl + '/boatel-bookings?filter=' + filterType +'&bookingType='+ reservationfilterType + '&month=' + month + '&year=' + year + '&pageNo=' + pageNo + '&pageSize=' + pageSize).pipe(catchError(this.errorService.handleError));
  }
  getCharterBookings(filterType:number,reservationfilterType:number,month?: string, year?: string,pageNo?: number, pageSize?: number) {
    return this.http.get(this.bookingApiUrl + '/charter-bookings?filter=' + filterType +'&bookingType='+ reservationfilterType + '&month=' + month + '&year=' + year + '&pageNo=' + pageNo + '&pageSize=' + pageSize).pipe(catchError(this.errorService.handleError));
  }
  getEventBookings(filterType:number,reservationfilterType:number,month?: string, year?: string,pageNo?: number, pageSize?: number) {
    return this.http.get(this.bookingApiUrl + '/event-bookings?filter=' + filterType +'&bookingType='+ reservationfilterType + '&month=' + month + '&year=' + year + '&pageNo=' + pageNo + '&pageSize=' + pageSize).pipe(catchError(this.errorService.handleError));
  }
  getBookingDetailbyId(BookId: any) {
    return this.http.get(this.bookingApiUrl + '/boatel-booking/' + BookId).pipe(catchError(this.errorService.handleError));
  }
  getHostBookings() {
    return this.http.get(this.bookingApiUrl + '/host-boatel-bookings').pipe(catchError(this.errorService.handleError));
  }
}
