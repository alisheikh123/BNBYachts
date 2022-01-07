import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  apiBoat = environment.BOAT_API_URL+"/api/app/boat-calendar";
  constructor(private http: HttpClient,private errorService:ErrorService) { }

  getBoatCalendar(boatId:number,month:number) {
    return this.http.get(this.apiBoat + '/boat-calendar/'+boatId+'?month='+month).pipe(
      catchError(this.errorService.handleError));;
  }
}
