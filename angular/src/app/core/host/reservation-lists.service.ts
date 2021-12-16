import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationListsService {
  bookingApiUrl: string = environment.BOOKING_API_URL + '/api/app/booking-list';

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getBookedServices(serviceType:number) {
    return this.http.get(this.bookingApiUrl + '/booked-services?serviceType='+serviceType).pipe(
      catchError(this.errorService.handleError));
  }
  getBoatelBookingRequests(Month?: string, Year?: string) {
    return this.http.get(this.bookingApiUrl + '/bookings-requests?month=' + Month + '&year=' + Year).pipe(
      catchError(this.errorService.handleError));
  }
  getDroppedServices() {
    return this.http.get(this.bookingApiUrl + '/dropped-services').pipe(
      catchError(this.errorService.handleError));
  }

  changeStatus(bookingId: number, status: boolean) {
    return this.http.put(this.bookingApiUrl + '/reservation-status/' + bookingId+'?isAccpeted='+status,null).pipe(
      catchError(this.errorService.handleError));
  }

}
