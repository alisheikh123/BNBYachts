import { ErrorService } from './error.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  CORE_API_URL = environment.CORE_API_URL;
  constructor(private http: HttpClient, private errorService: ErrorService) {
  }
  getBoatsUser(roleName : string, searchModel:any) {
    return this.http.get(this.CORE_API_URL + '/api/app/admin/boat-owers-and-users?roleName=' + roleName +" &SearchText=" + searchModel.searchTerm +"&CurrentPage=" +searchModel.pageNumber + "&ItemsPerPage=" + searchModel.pagesize).pipe(catchError(this.errorService.handleError));
  }  
  getTotalUsers(userRole : string, hostRole:any) {
    return this.http.get(this.CORE_API_URL + '/api/app/admin/total-users?userRole=' + userRole +" &hostRole=" + hostRole).pipe(catchError(this.errorService.handleError));
  }  
}
