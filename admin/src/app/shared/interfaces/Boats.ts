import { Observable } from 'rxjs';

export interface BoatsDetail{
    id : number
    name : string;
    description : string;
    location : string;
    length : number;
    totalBedrooms : number;
    totalWashrooms : number
    isBoatelServicesOffered : boolean
    boatelCapacity : number
    boatelAvailabilityDays : number
    checkinTime : Date;
    checkoutTime : Date;
    perDayCharges : number;
    isActive : boolean;
    taxFee : number;
    creatorId : string;
    creationTime : Date;
    boatType : BoatTypes ;
    boatGalleries :BoatGallery[];
}
export enum BoatTypes
{
    PowerBoat = 0,
    Pontoon = 1,
    FishingBoat = 2,
    SailBoat = 3,
    Yacht = 4,
    HouseBoat = 5
}
export interface BoatGallery{
    id : number;
    fileName : string;
    fileType : string;
    fileData : string;
    title : string;
    sortOrder : number;
    imagePath :string;
    isCoverPic : boolean
    boatEntityId : number;
}
export abstract class BoatsData{
    abstract getBoatsByUserId(userId : string) : Observable<BoatsDetail[]>
}