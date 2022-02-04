import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../Error/error.service';

@Injectable()
export class HelpCenterService {
  private readonly apiURl = environment.CORE_API_URL + "/api/app/help-center/";
  private readonly apiBookingsURl = environment.BOOKING_API_URL + "/api/app/user-booking-list/";
  private readonly apiDisputeURl = environment.BOOKING_API_URL + "/api/app/dispute/";
  private readonly apiFindUsURl = environment.BOAT_API_URL + "/api/app/find-boats/";
  constructor(private http: HttpClient,private errorService:ErrorService) { }

  send(contactUs: any) {
    return this.http.post(this.apiURl + 'contact-us',contactUs).pipe(catchError(this.errorService.handleError));
  }

  getBookingsLookup(){
    return this.http.get(this.apiBookingsURl + 'my-bookings').pipe(catchError(this.errorService.handleError));
  }

  addDispute(data: any) {
    return this.http.post(this.apiDisputeURl + 'dispute',data).pipe(catchError(this.errorService.handleError));
  }

  findUsBoats(latitude:number,longitude:number){
    return this.http.post(this.apiFindUsURl + 'find-us-boats?latitude='+latitude+'&longitude='+longitude,null).pipe(catchError(this.errorService.handleError));  
  }

  getQuestions(){
    return this.http.get(this.apiURl+ 'frequent-questions').pipe(catchError(this.errorService.handleError));  
  }
}
