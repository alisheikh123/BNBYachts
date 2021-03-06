import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityResponseModel } from 'src/app/shared/interface/entityResponseModel';
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

  pay(data: any):Observable<EntityResponseModel> {
    return this.http.post<EntityResponseModel>(this.paymentsApiUrl + '/api/app/stripe-account/pay', data).pipe(catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
