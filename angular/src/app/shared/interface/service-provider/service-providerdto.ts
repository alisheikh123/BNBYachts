import { ServiceProviderType } from "../../enums/service-provider-type";
import { TimeSlotDto } from "./timeslotdto";

export interface ServiceProviderDTO{
     id:number;
     userId:string;
    companyName: string;
    companyProfilePicture :string;
     description : string;
    location :string;
     latitude: number;
     longitude:number;
     bio:string;
     experience :  string;
     fee :number;
     paymentOption: number;
     serviceProviderType: ServiceProviderType
     fromDate : Date;
     toDate :Date;
     AccountName: string;
     bankName:string; 
     zipCode :string;
     iban :string;
     swift: string;
    supportiveDoc: string;
    timeSlots: TimeSlotDto [];
    creationTime : Date;
    userName:string;
    avaliableDate:string;
    userImagePath:string;
    paymentType:string;
}