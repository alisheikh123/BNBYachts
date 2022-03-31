export interface StripePaymentRefundRequestable{
    bookingId:number;
    refundAmount:number;
    isHost:boolean;
    bookingType:number;

}