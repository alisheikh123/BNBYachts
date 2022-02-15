import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharterService {

  apiCharterURl = environment.BOAT_API_URL;
  apiCharterPrefix = '/api/app/charter'
  constructor(private http: HttpClient) { }

  getCharterDetailById(charterId:number) {
    return this.http.get(this.apiCharterURl + this.apiCharterPrefix + '/charter-detail-by-id/'+charterId).pipe(
      catchError(this.handleError));
  }
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
