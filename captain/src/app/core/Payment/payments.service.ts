import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  paymentsApiUrl: string = environment.PAYMENTS_API_URL;
  constructor(private http: HttpClient) { }

  getUserPaymentMethods() {
    return this.http.get(this.paymentsApiUrl + '/api/app/stripe-account/customers-card').pipe(
      catchError(this.handleError));
  }

  createCustomer(userData: any) {
    return this.http.post(this.paymentsApiUrl + '/api/app/stripe-account/customer',userData).pipe(
      catchError(this.handleError));
  }

  pay(data: any) {
    return this.http.post(this.paymentsApiUrl + '/api/app/stripe-account/pay', data).pipe(catchError(this.handleError));
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
}
