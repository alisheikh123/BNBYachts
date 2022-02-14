import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersApi } from '../api/users.api';
import { BoatUser, BoatUserData } from '../../../interfaces/common/users';
// import { NbAuthService } from '@nebular/auth';
import { IUser } from '../../../../shared/interfaces/totalUsers';

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
}
