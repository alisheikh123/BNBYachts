
import { utils } from 'src/app/shared/utility/utils';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';
import { NotLoggedInComponent } from '../../auth/components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-event-modify-reservation',
  templateUrl: './event-modify-reservation.component.html',
  styleUrls: ['./event-modify-reservation.component.scss']
})
export class EventModifyReservationComponent implements OnInit {
  eventModifyObject =
    {
      eventBookingId: 0,
      dateScheduleIndex: 0
    };
  eventFilterDetails = {
    adults: 1,
    childrens: 0,
    eventDate: new Date()
  };
  booking = {
    amount: 0
  };
  popOverFilterData = {
    adults: 0,
    childrens: 0
  }
  eventBookingDetail: any;
  USER_DEFAULTS = UserDefaults;
  showMore: boolean = false;
  readAll: boolean = false;
  boatHost: any;
  eventSchedule: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsUrlprofile = environment.S3BUCKET_URL + '/profilePicture/';
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';
  eventDetails: any;
  eventCapcityValidation: any;
  eventBookedGuests: any;
  isEventGuestValidation: boolean = false;
  isSubmitted: boolean = false;
  approvalPolicyString: any = "Short description about the host Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud";
  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService,
    private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService,
    private activatedRoute: ActivatedRoute, private service: BookingService, private bookingListService: BookingListingService,
    private modal: NgbModal, private authService: AuthService) {
    config.max = 5;
    config.readonly = true;
  }
  @ViewChild('modifyReservation') modifyPop: TemplateRef<any>;
  @ViewChild('popOver') public popover: NgbPopover;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.eventModifyObject.eventBookingId = Number(res['id']);
    });
    this.getEventDetailsById();
  }
  getEventDetailsById() {
    this.service.getEventBookingDetailById(this.eventModifyObject.eventBookingId).subscribe((eventBookingDetail: any) => {
      this.eventBookingDetail = eventBookingDetail.data;
      this.eventBookedGuests = this.eventBookingDetail?.adults + this.eventBookingDetail?.children;
      this.eventFilterDetails.adults = this.eventBookingDetail?.adults;
      this.eventFilterDetails.childrens = this.eventBookingDetail?.children;
      this.yachtSearchService.eventDetailsById(this.eventBookingDetail.eventId).subscribe((res: any) => {
        this.eventDetails = res.eventDetails;
        this.eventSchedule = res.eventSchedule;
        this.calculatePricing();
        this.getHostDetails(this.eventDetails?.boat.creatorId);
      })
    });

  }
  calculatePricing() {
    if ((this.eventFilterDetails?.adults + this.eventFilterDetails?.childrens) > 0 && this.eventDetails != null) {

      let startDateTime = utils.concatinateDateTime(this.eventBookingDetail?.eventDate,this.eventDetails?.startDateTime);

      let remaingHours = moment.duration(moment(startDateTime).diff(moment().format("YYYY-MM-DD hh:mm a"))).asHours();
      let reservationFeeCalculation = 0;
      let findCalendar = this.eventDetails?.boat.boatCalendars.find((element: any) =>
      utils.convertToDate(element.fromDate) == utils.convertToDate(this.eventDetails?.startDateTime)&&
      utils.convertToDate(element.toDate) ==utils.convertToDate(this.eventDetails?.startDateTime)
      && element.isAvailable
    );
      if (findCalendar) {
        this.booking.amount = findCalendar.amount;
      }
      else {
        this.booking.amount = this.eventDetails?.amountPerPerson;
        if (remaingHours > 72) {
          this.eventDetails.deductedAmount = 0;
          reservationFeeCalculation =
            this.eventDetails?.amountPerPerson * this.eventBookingDetail?.noOfGuests;
          this.eventDetails.refundableAmount = this.eventDetails.deductedAmount + reservationFeeCalculation;

        }
        if (remaingHours == 72 || (remaingHours < 72 && remaingHours >= 24)) {
          this.eventDetails.deductedAmount = ((this.eventDetails?.amountPerPerson * this.eventBookingDetail?.noOfGuests) * 50) / 100;
          reservationFeeCalculation = ((this.eventDetails?.amountPerPerson * this.eventBookingDetail?.noOfGuests) * 50) / 100;
          this.eventDetails.refundableAmount = reservationFeeCalculation;


        }
        if (remaingHours < 24) {
          this.eventDetails.deductedAmount = this.eventDetails?.amountPerPerson * this.eventBookingDetail?.noOfGuests;
          this.eventDetails.refundableAmount = 0;

        }
      }
    }
  }
  getHostDetails(userId: string) {
    this.yachtSearchService.hostDetailsById(userId).subscribe(res => {
      this.boatHost = res;
    })
  }
  openPopover() {
    this.popOverFilterData.adults = this.eventFilterDetails.adults;
    this.popOverFilterData.childrens = this.eventFilterDetails.childrens;
    this.popover.open();
  }
  updateGuests() {
    let modifiedGuest = this.eventBookingDetail.adults + this.eventBookingDetail.children;
    if (modifiedGuest > this.eventBookedGuests) {
      this.isEventGuestValidation = true;
      this.popover.open();
    }
    else {
      this.eventFilterDetails.adults = this.eventBookingDetail?.adults;
      this.eventFilterDetails.childrens = this.eventBookingDetail?.children;
      this.eventBookingDetail.noOfGuests = this.eventBookingDetail?.adults + this.eventBookingDetail?.children;
      this.calculatePricing();
      this.isEventGuestValidation = false;
      this.popover.close();
    }
  }
  reserveEvent() {
    this.isSubmitted = true;
    if (this.authService.authenticated) {
      if ((this.eventFilterDetails.adults + this.eventFilterDetails.childrens) > 0) {
        let modifyBookingModel = {
          id: this.eventModifyObject.eventBookingId,
          eventId: this.eventBookingDetail?.eventId,
          eventDate: this.eventDetails.startDateTime,
          noOfGuests: this.eventBookingDetail?.adults + this.eventBookingDetail?.children,
          adults: this.eventBookingDetail?.adults,
          children: this.eventBookingDetail?.children,
          hostId: this.eventDetails.boat.creatorId,
          bookingStatus: 0,
          paymentStatus: 0,
          bankingDetailsId: '',
          reviews: {
            reviewerId: '',
            revieweeId: 0,
            reviewDescription: '',
            ratings: 0,
            bookingId: 0
          },
          userName:'',
          boatId: this.eventDetails.boatId
        };
        let eventRefundableModel = {
          bookingId: Number(this.eventModifyObject.eventBookingId),
          deductedAmount: this.eventDetails.deductedAmount.toString(),
          refundableAmount: this.eventDetails.refundableAmount.toString(),
          userId: "",
          isNotificationSent: true,
          totalAmount: (this.eventDetails.deductedAmount + this.eventDetails.refundableAmount).toString()
        };
        this.bookingService.modifyEventBooking(modifyBookingModel, eventRefundableModel).subscribe(res => {
          this.modal.dismissAll();
          this.toastr.success('Event reservation Successfully Modified.', 'Success');
          this.router.navigate(['/boat-listing/all-reservations'], { relativeTo: this.activatedRoute });
        });
      }
    }
    else {
      let modal = this.modal.open(NotLoggedInComponent, { windowClass: 'custom-modal custom-small-modal', centered: true });
    }
  }
  featureFilter(isFavroute: boolean, isHealthSafetyFeature: boolean) {
    if (isHealthSafetyFeature == false) {
      return this.eventDetails?.boat.boatFeatures.filter((res: any) => res.offeredFeatures.isGuestFavourite == isFavroute && res.offeredFeatures.isSafetyFeature == false);
    }
    else if (isHealthSafetyFeature) {
      return this.eventDetails?.boat.boatFeatures.filter((res: any) => res.offeredFeatures.isSafetyFeature == isHealthSafetyFeature);
    }

  }
  cancelpopup() {
    this.modal.dismissAll();
  }
  openModal(modifytemplate: TemplateRef<any>) {
    this.modal.open(modifytemplate, { centered: true });
  }
}