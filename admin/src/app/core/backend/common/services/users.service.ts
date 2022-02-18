import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApi } from '../api/users.api';
// import { NbAuthService } from '@nebular/auth';
import { IUser } from '../../../../shared/interfaces/totalUsers';
import { BoatUser, BoatUserData, BookingReview, User } from '../../../../shared/interfaces/BoatUser';
import { AnyARecord } from 'dns';

@Injectable()
export class UsersService extends BoatUserData {
  constructor(private api: UsersApi) {
    super();
  }
  getBoatUsers(roleName: string): Observable<BoatUser[]> {
    return this.api.getBoatUsers(roleName);
  }
  getTotalUsers(userRole: string, hostRole: string): Observable<IUser> {
    return this.api.getTotalUsers(userRole,hostRole);
  }
  getUserInfoById(id: string) {
    return this.api.getUserInfoById(id);
  }
  getReviewByUserId(reviewerId: string): Observable<BookingReview[]> {
    return this.api.getReviewByUserId(reviewerId);
  }
  SuspendUser(userId: string) {
    return this.api.SuspendUser(userId);
  }
  RegisterAdmin(user: User) {
    return this.api.RegisterAdmin(user);
  }
}
