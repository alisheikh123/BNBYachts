import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  boatApiUrl: string = environment.BOAT_API_URL;
  constructor(private http: HttpClient) { }

  getBoats() {
    return this.http.get(this.boatApiUrl + '/api/app/event/boats').pipe(
      catchError(this.handleError));
  }

  getBoatBookedDates(boatId:number) {
    return this.http.get(this.boatApiUrl + '/api/app/event/boat-booked-dates/'+boatId).pipe(
      catchError(this.handleError));
  }

  saveEvent(eventData:any) {
    return this.http.post(this.boatApiUrl + '/api/app/event/save-event',eventData).pipe(
      catchError(this.handleError));
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
