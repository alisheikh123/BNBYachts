import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AllHostBoatsService {
  boatApiUrl = environment.BOAT_API_URL;
  apiBoatPrefix = "/api/app/host-boat";
  apiEventPrefix = "/api/app/event";
  apiCharterPrefix = "/api/app/charter";

  constructor(private http:HttpClient,private errorService:ErrorService) { }

  getAllBoats() {
    return this.http.get(this.boatApiUrl +this.apiBoatPrefix+'/host-boats').pipe(catchError(this.errorService.handleError));
  }

  getAllCharters() {
    return this.http.get(this.boatApiUrl +this.apiCharterPrefix+'/charters').pipe(catchError(this.errorService.handleError));
  }

  getAllEvents() {
    return this.http.get(this.boatApiUrl +this.apiEventPrefix+'/events').pipe(catchError(this.errorService.handleError));
  }

  updateBoatStatus(boatId: number) {
    return this.http.get(this.boatApiUrl + '/host-boat-status/' + boatId).pipe(catchError(this.errorService.handleError));
  }

}

