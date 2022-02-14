import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class UsersApi {

  CORE_API_URL = environment.CORE_API_URL;
  USER_API_URL = 'api/app/admin/'
  constructor(private api: HttpService) {}
  getBoatUsers(roleName: string) {
    return  this.api.get(`${this.USER_API_URL}boat-owers-and-users?roleName=${roleName}`);    
  }
  getTotalUsers(userRole : string, hostRole:string) {
    return this.api.get(`${this.USER_API_URL}total-users?userRole=${userRole}&hostRole=${hostRole}`).pipe();
  }
}
