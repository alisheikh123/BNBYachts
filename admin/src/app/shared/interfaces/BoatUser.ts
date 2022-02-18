import { Observable } from "rxjs";
import { IUser } from "./totalUsers";

export interface BoatUser{
     id : string
     name :string
     imagePath : string
     creationTime :Date
     about : string
     phoneNumber : string
     isPhoneConfirmed :boolean
     email :string
     isActive : boolean;
 }
 export interface BookingReview{
    reviewerId : string;
    revieweeID : number;
    reviewDescription : string;
    ratings : number;
    bookingId : number
    creationTime : Date;
}
export interface User{
    FirstName : string
    LastName : string
    Email : string
    DOB : Date
    RoleId : string[]
}
 export abstract class BoatUserData {
     abstract getBoatUsers(roleName : string): Observable<BoatUser[]>;
     abstract getTotalUsers(userRole : string, hostRole:string) :  Observable<IUser>;
     abstract getUserInfoById(id : string) ;
     abstract getReviewByUserId(reviewerId : string) : Observable<BookingReview[]>;
     abstract SuspendUser(userId : string);
     abstract RegisterAdmin(user : User);
   }
 