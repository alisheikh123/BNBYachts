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

  getEventById(eventId: number) {
    return this.http.get(this.boatApiUrl + '/api/app/event/event-by-id/' + eventId).pipe(
      catchError(this.errorService.handleError)
      );
  }

  updateEvent(updatedEvent: any) {
    return this.http.put(this.boatApiUrl + '/api/app/event/event/', updatedEvent).pipe(
      catchError(this.errorService.handleError)
    );
  }
  getAssignedBoats(ids: number[]) {
    let url:string='/api/app/event/assigned-boats?Ids='+0;
      ids.forEach(item => {
         url  += '&Ids=' + item;
      });
      return this.http.get(this.boatApiUrl + url).pipe(
        catchError(this.errorService.handleError));
    }
    getEventByBoatId(boatId: number) {
      return this.http.get(this.boatApiUrl + '/api/app/event/events-by-boat-id/' + boatId).pipe(
        catchError(this.errorService.handleError));
    }
    getBoatsByHostId(userId : string) {
      return this.http.get(this.boatApiUrl + '/api/app/event/boats-by-host-id/'+ userId).pipe(
        catchError(this.errorService.handleError));
    }

}
