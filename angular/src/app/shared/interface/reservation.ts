export interface IEventReservation
{
    checkoutTime:any,
    eventBookingId:number,
    isPosted: boolean,
    isHost: boolean

}
export interface ICharterReservation
{
    charterId:number,
    isPosted: boolean,
    isHost: boolean,
    bookingId:number

}
