import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  boatApiUrl: string = environment.BOAT_API_URL;
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  getBoats() {
    return this.http.get(this.boatApiUrl + '/api/app/event/boats').pipe(
      catchError(this.errorService.handleError));
  }

  getBoatBookedDates(boatId: number) {
    return this.http.get(this.boatApiUrl + '/api/app/event/boat-booked-dates/' + boatId).pipe(
      catchError(this.errorService.handleError));
  }

  saveEvent(eventData: any) {
    return this.http.post(this.boatApiUrl + '/api/app/event/save-event', eventData).pipe(
      catchError(this.errorService.handleError));
  }
}
