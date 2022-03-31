export interface BoatCharterDTO{
    id:number;
    description: string | null,
    departureFromDate: Date | null;
    departureToDate : Date | null;
    departingLatitude : number | null;
    departingLongitude : number | null;
    departingFrom : string | null;
    destination : string | null;
    destinationLatitude : number | null;
    destinationLongitude : number | null;
    returnDate : Date | null;
    returnAddress : string | null;
    returnLocationLat : number | null;
    returnLocationLng : number | null;
    boatId : number;
    creationTime: Date;
}