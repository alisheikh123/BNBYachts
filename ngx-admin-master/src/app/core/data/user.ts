import { Observable } from "rxjs";

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
// export class ListingBaseModel
//     {
//         PageNumber : number = 1;
//         PageSize:number = 10;
//         TotalCount:number;
//         SortBy :string;
//         SortAscending : boolean = true;
//     }
// export abstract class EntityResponseListModel<T>:ListingBaseModel
//     {
//         ReturnMessage : Array<string>();
//         Data : Array<BoatUser>();
//         export class EntityResponseListModel
//         {
//             ReturnMessage = new Array<string>();
//             ReturnStatus = true;
//             Data = Array<BoatUser>();
//         }
//     }
export abstract class BoatUserData {
    abstract getBoatUsers(roleName : string): BoatUser[];
  }
