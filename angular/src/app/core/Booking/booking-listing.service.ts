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

  getBookings(filterType:number,month?: string, year?: string) {
    return this.http.get(this.bookingApiUrl + '/boatel-bookings?filter=' + filterType + '&month=' + month + '&year=' + year).pipe(catchError(this.errorService.handleError));
  }
  getBookingDetailbyId(BookingId: any) {
    return this.http.get(this.bookingApiUrl + '/boatel-booking/' + BookingId).pipe(catchError(this.errorService.handleError));
  }
  getHostBookings() {
    return this.http.get(this.bookingApiUrl + '/host-boatel-bookings').pipe(catchError(this.errorService.handleError));
  }
}
