import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Observable } from "rxjs";
import { IUser } from '../../../shared/interfaces/totalUsers';

export interface BoatUser{
    id : string
    name :string
    imagePath : string
    creationTime :Date
    about : string
    phoneNumber : string
    phoneNumberConfirmed :boolean
    email :string
}
export abstract class BoatUserData {
    abstract getBoatUsers(roleName : string): Observable<BoatUser[]>;
    abstract getTotalUsers(userRole : string, hostRole:string) :  Observable<IUser>
  }
