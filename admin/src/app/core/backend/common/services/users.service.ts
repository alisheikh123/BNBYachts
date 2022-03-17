import { AdminProfileModal } from './../../../../shared/interfaces/BoatUser';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApi } from '../api/users.api';
import { IUser } from '../../../../shared/interfaces/totalUsers';
import { BoatUser, BoatUserData, BookingReview, SetPasswordModal, User } from '../../../../shared/interfaces/BoatUser';

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
  getReviewByUserId(revieweeId: string): Observable<BookingReview[]> {
    return this.api.getReviewByUserId(revieweeId);
  }
  SuspendUser(userId: string) {
    return this.api.SuspendUser(userId);
  }
  RegisterAdmin(user: User) {
    return this.api.RegisterAdmin(user);
  }
  SetAdminPassword(admin: SetPasswordModal) {
    return this.api.SetAdminPassword(admin);
  }
  UpdateAdminProfile(admin: AdminProfileModal) {
    return this.api.UpdateAdminProfile(admin);
  }
  UpdateProfilePicture(file : any) {
    return this.api.UpdateProfilePicture(file);
  }
}
