import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  CORE_API_URL = environment.CORE_API_URL;
  USER_API_URL = '/api/app/admin/'

  constructor(private http: HttpClient, private errorService: ErrorService) {
  }
  getBoatsUser(roleName : string, searchModel:any) {
    return this.http.get(this.CORE_API_URL + this.USER_API_URL +'boat-owers-and-users?roleName=' + roleName +" &SearchText=" + searchModel.searchTerm +"&CurrentPage=" +searchModel.pageNumber + "&ItemsPerPage=" + searchModel.pagesize).pipe(catchError(this.errorService.handleError));
  }  
  getTotalUsers(userRole : string, hostRole:string) {
    return this.http.get(this.CORE_API_URL + this.USER_API_URL +'total-users?userRole=' + userRole +" &hostRole=" + hostRole).pipe(catchError(this.errorService.handleError));
  }  
}
