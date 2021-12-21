import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CharterService {
  bookingApiUrl: string = environment.BOOKING_API_URL;
  charterApiUrl:string = environment.CHARTER_API_URL;

  constructor(private http: HttpClient,private errorService:ErrorService) { }
  getBoats() {
    return this.http.get(this.charterApiUrl + '/boats').pipe(
      catchError(this.errorService.handleError));
  }
  getSelectedBoatDetail(boatId:number){
    return this.http.get(this.charterApiUrl + '/booked-charters/' + boatId).pipe(
      catchError(this.errorService.handleError));
  }
  saveCharter(formData:any)
  {
    return this.http.post<any>(this.charterApiUrl + '/charters',formData).pipe(
      catchError(this.errorService.handleError));
  }
}