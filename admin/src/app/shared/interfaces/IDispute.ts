import { Observable } from "rxjs";

export interface IDispute{
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
}