import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {
  BOOKING_API_URL = environment.BOOKING_API_URL;
  constructor(private http: HttpClient, private errorService: ErrorService) {
  }
  getDisputeList(searchModel:any) {
    return this.http.get(this.BOOKING_API_URL + '/api/app/dispute/dispute-list?searchText='+searchModel.searchTerm + '&CurrentPage='+ searchModel.pageNumber +'&ItemsPerPage=' + searchModel.pageSize).pipe(catchError(this.errorService.handleError));
  }  
}
