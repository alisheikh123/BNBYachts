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

  getAllBoats(pageNo: number, pageSize: number) {
    return this.http.get(this.boatApiUrl +this.apiBoatPrefix+'/host-boats?pageNo=' + pageNo + '&pageSize=' + pageSize).pipe(catchError(this.errorService.handleError));
  }

  getAllCharters(pageNo?:number,pageSize?:number) {
    return this.http.get(this.boatApiUrl +this.apiCharterPrefix+'/charters?pageNo='+pageNo+'&pageSize='+pageSize).pipe(catchError(this.errorService.handleError));
  }

  getAllEvents(page:number,pageSize:number) {
    return this.http.get(this.boatApiUrl +this.apiEventPrefix+'/events?pageNo='+page+'&pageSize='+pageSize).pipe(catchError(this.errorService.handleError));
  }

  updateBoatStatus(boatId: number) {
    return this.http.get(this.boatApiUrl + '/api/host-boat-status/' + boatId).pipe(catchError(this.errorService.handleError));
  }

}

