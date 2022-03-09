import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../../../environments/environment';
import { AdminProfileModal } from '../../../../shared/interfaces/BoatUser';

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
  getUserInfoById(id:string) {
    return this.api.get(`api/GetUserDetailsById/${id}`);
  }
  getReviewByUserId(revieweeId : string) {
    return this.api.getBooking(`api/app/review/reviews-by-reviewee-id/${revieweeId}`);
  }
  SuspendUser(userId : string) {
    return this.api.postwithoutData(`${this.USER_API_URL}${userId}/suspend-user`);
  }
  RegisterAdmin(adminData : any) {
    return this.api.post(`${this.USER_API_URL}admin-register`,adminData);
  }
  SetAdminPassword(adminData : any) {
    return this.api.post(`${this.USER_API_URL}set-admin-password`,adminData);
  }
  UpdateAdminProfile(admin: AdminProfileModal) {
    return this.api.put(`api/app/user/admin-profile`,admin);
  }
}
