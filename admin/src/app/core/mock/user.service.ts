import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BoatUserData } from '../data/user';

@Injectable()
export class UserService extends BoatUserData {
  CORE_API_URL = environment.CORE_API_URL;
  USER_API_URL = '/api/app/admin/'
  // private users = {
  //   nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
  //   eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
  //   jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
  //   lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
  //   alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
  //   kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  // };
  constructor(private http: HttpClient) {
    super();
  }
  getBoatUsers(roleName : string):any {
    return this.http.get(this.CORE_API_URL + this.USER_API_URL +'boat-owers-and-users?roleName=' + roleName);
  }
  getBoatsUser(roleName : string, searchModel:any) {
    return this.http.get(this.CORE_API_URL + this.USER_API_URL +'boat-owers-and-users?roleName=' + roleName +" &SearchText=" + searchModel.searchTerm +"&CurrentPage=" +searchModel.pageNumber + "&ItemsPerPage=" + searchModel.pagesize);
  }
  getTotalUsers(userRole : string, hostRole:string) {
    return this.http.get(this.CORE_API_URL + this.USER_API_URL +'total-users?userRole=' + userRole +" &hostRole=" + hostRole).pipe();
  }
}
