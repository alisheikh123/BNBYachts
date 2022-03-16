import { Observable } from "rxjs";

export interface IDispute{
    id : number;
    bookingId : number
    disputeReason : string
    bookingType : string
    reason : string
    statusName : string
    status : number
    creatorId : number
    creationTime : Date
}
export interface ChangeStatus
{
    id : number;
    status : number
}
export abstract class DisputesData {
      abstract getDisputesData(): Observable<IDispute[]>;
      abstract getDisputeById(id : number) : Observable<IDispute>;
      abstract ChangeDisputeStatus(status : ChangeStatus);

}