import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class BillingsService {
  apiUrl: string = environment.PAYMENTS_API_URL+'/api/app/stripe-account/';
  constructor(private http: HttpClient,private errorService:ErrorService) { }

  getUserTransactions() {
    return this.http.get(this.apiUrl + 'customer-transactions').pipe(
      catchError(this.errorService.handleError));
  }
}
