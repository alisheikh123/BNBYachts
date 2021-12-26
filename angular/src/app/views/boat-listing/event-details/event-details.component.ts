import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(config: NgbRatingConfig, private toastr: ToastrService,
     private yachtSearchService: YachtSearchService,
      private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute) {
    config.max = 5;
    config.readonly = true;
  }
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
  isSubmitted: boolean = false;
  USER_DEFAULTS = UserDefaults;
  @ViewChild('popOver') public popover: NgbPopover;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.eventId = Number(res['id']);
    });
    this.getEventDetailsById();
  }


  getEventDetailsById() {
    this.yachtSearchService.eventDetailsById(this.eventId).subscribe((res: any) => {
      this.eventDetails = res.eventDetails;
      this.eventSchedule = res.eventSchedule;
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
    if ((this.eventFilterDetails.adults + this.eventFilterDetails.childrens) > 0) {
      let bookingModel = {
        eventId: this.eventId,
        eventDate: this.eventDetails.startDateTime,
        noOfGuests: this.eventFilterDetails.adults + this.eventFilterDetails.childrens,
        hostId: this.eventDetails.boat.creatorId,
        bookingStatus: 0
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

  openPopover() {
    this.popOverFilterData.adults = this.eventFilterDetails.adults;
    this.popOverFilterData.childrens = this.eventFilterDetails.childrens;
    this.popover.open();
  }
  updateGuests() {
    this.eventFilterDetails.adults = this.popOverFilterData.adults;
    this.eventFilterDetails.childrens = this.popOverFilterData.childrens;
    this.popover.close();
  }

  onChangeDate(isIncrease: boolean) {
    this.dateScheduleIndex = isIncrease ? this.dateScheduleIndex + 1 : this.dateScheduleIndex - 1;
    this.yachtSearchService.eventDetailsById(this.eventSchedule[this.dateScheduleIndex]?.eventId).subscribe((res: any) => {
      this.eventId = this.eventSchedule[this.dateScheduleIndex]?.eventId;
      this.eventDetails = res?.eventDetails;
    })
  }
}
