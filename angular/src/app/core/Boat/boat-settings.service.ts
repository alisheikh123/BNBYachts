import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoatSettingsService {
  apiBoat = environment.BOAT_API_URL;
  constructor(private http: HttpClient) { }

  updateBoat(boat:any){
    return this.http.put(this.apiBoat + "/api/app/boat-settings/boat",boat).pipe(
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
