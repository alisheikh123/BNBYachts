import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  boatApiUrl: string = environment.BOAT_API_URL+'/api';
  coreApiUrl: string = environment.CORE_API_URL +'/api';

  constructor(private http: HttpClient) { }

  getLookups() {
    return this.http.get(this.boatApiUrl + '/app/host-boat/host-on-boarding-lookup').pipe(
      catchError(this.handleError));
  }
  addBoat(boat:any) {
    return this.http.post(this.boatApiUrl + '/app/host-boat/host-boats',boat).pipe(
      catchError(this.handleError));
  }
  addHostRole(){
    return this.http.get(this.coreApiUrl + '/AddHostRole').pipe(
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
