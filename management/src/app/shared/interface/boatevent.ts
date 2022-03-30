export interface BoatEventDTO{
    id:number;
    description: string | null,
    title: string | null,
    locationLat :number | null;
    locationLong :number | null;
    location : string | null
    startDateTime: Date | null;
    endDateTime : Date  | null;
    boatId : number;
    creationTime: Date;
}