import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/core/Error/error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationsUrl = environment.NOTIFICATION_APP_URL +'/api/app/in-app-notification';

  constructor(private http: HttpClient,private errorService: ErrorService) { }

  getNotificationCount(){
    return this.http.get(this.notificationsUrl + '/notification-count').pipe(catchError(this.errorService.handleError));
  }

  getNotificationMessage() {
    debugger;
    return this.http.get(environment.NOTIFICATION_APP_URL +'/api/app/in-app-notification').pipe(
      catchError(this.errorService.handleError));
  }

  deleteNotifications(): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.notificationsUrl}/deletenotifications`;
    return this.http.delete(url, { headers: headers })
      .pipe(
        catchError(this.errorService.handleError)
      );
  }


}