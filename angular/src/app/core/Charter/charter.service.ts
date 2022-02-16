import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../Error/error.service';

@Injectable({
  providedIn: 'root'
})
export class CharterService {

  apiCharterURl = environment.BOAT_API_URL;
  apiCharterPrefix = '/api/app/charter'
  constructor(private http: HttpClient,private errorService:ErrorService) { }

  getCharterDetailById(charterId:number) {
    return this.http.get(this.apiCharterURl + this.apiCharterPrefix + '/charter-detail-by-id/'+charterId).pipe(
      catchError(this.errorService.handleError));
  }
}
