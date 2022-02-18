import { Observable } from "rxjs";

export interface IDispute{
    id : number;
    bookingId : number
    disputeReason : string
    bookingType : string
    reason : string
    status : string
    creatorId : number
    creationTime : Date
}

export abstract class DisputesData {
      abstract getDisputesData(): Observable<IDispute[]>;
      abstract getDisputeById(id : number) : Observable<IDispute>;
}