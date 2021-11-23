import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookingService {
  bookingApiUrl: string = environment.BOOKING_API_URL;
  boatApiUrl:string = environment.BOAT_API_URL;
  constructor(private http:HttpClient) { }

  boatelBooking(model:any){
    return this.http.post(this.bookingApiUrl + '/boatelbooking',model).pipe(
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


  /* Ali */
  bookingDetail(userId:any){
      return this.http.get(this.bookingApiUrl+'/boatelbookingdetail/'+userId).pipe(catchError(this.handleError));
  }
  upcomingbookingDetail(userId:any,upcoming:any){
      return this.http.get(this.bookingApiUrl+'/upcomingboatelbookingdetail/'+userId,upcoming).pipe(catchError(this.handleError));
  
  }
  pastbookingDetail(userId:any,past:any){
      return this.http.get(this.bookingApiUrl+'/pastboatelbookingdetail/'+userId,past).pipe(catchError(this.handleError));
  }
  getBoatInfo(boatId:any){
    return this.http.get(this.boatApiUrl+'/filtered-boat-details/'+boatId).pipe(catchError(this.handleError));
  }
  getBookingBoatDetail(BookingId:any){
    return this.http.get(this.bookingApiUrl+'/boatelbooking/'+BookingId).pipe(catchError(this.handleError));
  }
saveCancellation(model:any){
  console.log(model);
     const data = JSON.stringify(model);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(this.bookingApiUrl + '/bookingcancel', data, {
      headers: headerOptions
}).pipe(
      catchError(this.handleError));
  }
  
   /* Ali */
}
