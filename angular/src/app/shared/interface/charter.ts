import { BookingStatus, PaymentStatus } from "../enums/booking.constants";

export class CharterBookingRequestable {
    charterId: number;
    departureDate: Date;
    arrivalDate: Date;
    noOfAdults: number;
    noOfChildrens: number;
    paymentStatus: PaymentStatus;
    bankingDetailsId: number;
    userId: string;
    reviews?: number;
    hostId: string;
    bookingStatus: BookingStatus;
    userName: string;
    boatId?: number;
}