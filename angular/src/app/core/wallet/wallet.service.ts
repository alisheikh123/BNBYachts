import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  apiUrl: string = environment.PAYMENTS_API_URL + '/api/app/stripe-account/';
  apiBookingUrl: string = environment.BOOKING_API_URL + '/api/app/booking-payment/';
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getAccount() {
    return this.http.get(this.apiUrl + 'account-details').pipe(
      catchError(this.errorService.handleError));
  }
  addBank(data: any) {
    return this.http.post(this.apiUrl + 'connect-account', data).pipe(
      catchError(this.errorService.handleError));
  }

  getUnPaidBookings(){
    return this.http.get(this.apiBookingUrl + 'un-paid-bookings').pipe(
      catchError(this.errorService.handleError));
  }
  getBookingsBalance(data:any){
    return this.http.post(this.apiUrl + 'calculate-funds',data).pipe(
      catchError(this.errorService.handleError));
  }
  transferToBank(accountId:string,amount:number){
    return this.http.post(this.apiUrl + 'send-to-bank-amount/'+accountId+'?amount='+amount,null).pipe(
      catchError(this.errorService.handleError));
  }

  setBookingStatusPaid(data:any){
    return this.http.post(this.apiBookingUrl + 'set-booking-paid',data).pipe(
      catchError(this.errorService.handleError));
  }

  getAllTransactions(accountId:string){
    return this.http.get(this.apiUrl + 'transaction-details/'+accountId).pipe(
      catchError(this.errorService.handleError));
  }
}
