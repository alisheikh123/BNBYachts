import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharterService {
  boatApiUrl: string = environment.BOAT_API_URL;
  bookingApiUrl: string = environment.BOOKING_API_URL;

  constructor(private http: HttpClient) { }
  getBoats() {
    return this.http.get(this.boatApiUrl + '/api/app/charter/boats').pipe(
      catchError(this.handleError));
  }
  getSelectedBoatDetail(boatId:number){
    return this.http.get(this.boatApiUrl + '/api/app/charter/booked-charters/' + boatId).pipe(
      catchError(this.handleError));
  }
  saveCharter(formData:any)
  {
    return this.http.post<any>(this.boatApiUrl + '/api/app/charter/charters',formData).pipe(
      catchError(this.handleError));
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

