import { Observable } from 'rxjs';

export interface ServiceFee{
    id : number
    boatTypeId : number;
    boatType : string;
    serviceFee : string;
}
export interface AddServiceFee{
    id : number
    boatTypeId : number;
    serviceFee : string;
}
export abstract class ServiceFeeData{
    abstract getServiceFees() : Observable<ServiceFee[]>
    abstract deleteServiceFee(id : number);
    abstract AddServiceFee(service : AddServiceFee);
    abstract UpdateServiceFee(service : AddServiceFee);
    abstract getServiceFeeByBoatType(BoatTypeId : number);
}