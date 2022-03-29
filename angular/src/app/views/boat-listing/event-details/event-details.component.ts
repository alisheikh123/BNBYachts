import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addMs } from '@fullcalendar/core';
import { NgbModal, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BoatType } from 'src/app/shared/enums/boat-Type';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { ServiceFee } from 'src/app/shared/interface/Service-fee';
import { environment } from 'src/environments/environment';
import { NotLoggedInComponent } from '../../auth/components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(config: NgbRatingConfig, private toastr: ToastrService,
     private yachtSearchService: YachtSearchService,
      private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute, private modal: NgbModal, private authService:AuthService) {
    config.max = 5;
    config.readonly = true;
  }
  boatType = BoatType;
  serviceFee : ServiceFee;
  eventId: number;
  eventDetails: any;
  //assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';
  eventSchedule: any;
  dateScheduleIndex = 0;

  eventFilterDetails = {
    adults: 1,
    childrens: 0,
    eventDate:new Date()
  };
  popOverFilterData = {
    adults: 0,
    childrens: 0
  }
  boatHost: any;
  showMore: boolean = false;
  readAll: boolean = false;
  isSubmitted: boolean = false;
  USER_DEFAULTS = UserDefaults;
  eventCapcityValidation:any;
  booking = {
    amount :0
  };
  @ViewChild('popOver') public popover: NgbPopover;
  approvalPolicyString: any = "Short description about the host Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.eventId = Number(res['id']);
    });
    this.getEventDetailsById();
  }


  getEventDetailsById() {
    this.yachtSearchService.eventDetailsById(this.eventId).subscribe((res: any) => {
      this.yachtSearchService.getServiceFeeByBoatType(this.boatType.Event).subscribe((res: any) => {
        this.serviceFee = res.data;
      });
      this.eventDetails = res.eventDetails;
      this.eventSchedule = res.eventSchedule;
      this.calculatePricing();
      this.getHostDetails(this.eventDetails?.boat.creatorId);
    })
  }

  getHostDetails(userId: string) {
    this.yachtSearchService.hostDetailsById(userId).subscribe(res => {
      this.boatHost = res;
    })
  }

  featureFilter(isFavroute: boolean, isHealthSafetyFeature: boolean) {
    if (isHealthSafetyFeature == false) {
      return this.eventDetails?.boat.boatFeatures.filter((res: any) => res.offeredFeatures.isGuestFavourite == isFavroute && res.offeredFeatures.isSafetyFeature == false);
    }
    else if (isHealthSafetyFeature) {
      return this.eventDetails?.boat.boatFeatures.filter((res: any) => res.offeredFeatures.isSafetyFeature == isHealthSafetyFeature);
    }

  }

  ruleFilter(isHealthSafetyRule: boolean) {
    return this.eventDetails?.boat.boatRules.filter((res: any) => res.offeredFeatures.isGuestFavourite == isHealthSafetyRule);
  }

  reserveEvent() {
    this.isSubmitted = true;
    if(this.authService.authenticated) {
      if ((this.eventFilterDetails.adults + this.eventFilterDetails.childrens) > 0) {
        let bookingModel = {
          eventId: this.eventId,
          adults:this.eventFilterDetails.adults,
          children:this.eventFilterDetails.childrens,
          eventDate: this.eventDetails.startDateTime,
          noOfGuests: this.eventFilterDetails.adults + this.eventFilterDetails.childrens,
          hostId: this.eventDetails.boat.creatorId,
          bookingStatus: 0,
          boatId:this.eventDetails.boatId
        };
        this.bookingService.eventBooking(bookingModel).subscribe(res => {
          let bookingId = res?.data?.id;
          if (res.returnStatus) {
            let boatCalendar = {
              isAvailable: false,
              toDate: this.eventDetails?.eventDate,
              fromDate: this.eventDetails?.eventDate,
              boatEntityId: this.eventDetails?.boat?.id
            }
            this.yachtSearchService.updateCalendar(boatCalendar).subscribe(res => {
              if (res) {
                this.yachtParamService.setFilters(this.eventFilterDetails);
                this.router.navigate(['/payments/event-payments', this.eventId, bookingId], { relativeTo: this.activatedRoute });
                this.toastr.success('Calendar reserved, please proceed with payments.', 'Success');
              }
            });
          }
        })
      }
    }
    else {
      let modal = this.modal.open(NotLoggedInComponent,{windowClass: 'custom-modal custom-small-modal',centered:true});
    }
  }

  openPopover() {
    this.popOverFilterData.adults = this.eventFilterDetails.adults;
    this.popOverFilterData.childrens = this.eventFilterDetails.childrens;
    this.popover.open();
  }
  updateGuests() {
    this.eventFilterDetails.adults = this.popOverFilterData.adults;
    this.eventFilterDetails.childrens = this.popOverFilterData.childrens;
    this.eventCapcityValidation = (((this.eventFilterDetails.adults + this.eventFilterDetails.childrens)>this.eventDetails?.guestCapacity)||((this.eventFilterDetails.adults + this.eventFilterDetails.childrens)<1))?"Entered guest capacity is not available":this.popover.close();
    this.calculatePricing();
  }

  onChangeDate(isIncrease: boolean) {
    this.dateScheduleIndex = isIncrease ? this.dateScheduleIndex + 1 : this.dateScheduleIndex - 1;
    this.yachtSearchService.eventDetailsById(this.eventSchedule[this.dateScheduleIndex]?.eventId).subscribe((res: any) => {
      this.eventId = this.eventSchedule[this.dateScheduleIndex]?.eventId;
      this.eventDetails = res?.eventDetails;
    })
  }

  calculatePricing() {
    if ((this.eventFilterDetails?.adults + this.eventFilterDetails?.childrens) > 0  && this.eventDetails != null) {
        let findCalendar = this.eventDetails?.boat.boatCalendars.find((element: any) =>
          moment(element.fromDate).format("DD-MM-YYYY") == moment(this.eventDetails?.startDateTime).format("DD-MM-YYYY") &&
          moment(element.toDate).format("DD-MM-YYYY") == moment(this.eventDetails?.startDateTime).format("DD-MM-YYYY")
           && element.isAvailable
        );
        if (findCalendar) {
          this.booking.amount = findCalendar.amount;
        }
        else {
          this.booking.amount = this.eventDetails?.amountPerPerson;
        }
      }
    }
}
