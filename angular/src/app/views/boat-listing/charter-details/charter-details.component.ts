import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-charter-details',
  templateUrl: './charter-details.component.html',
  styleUrls: ['./charter-details.component.scss']
})
export class CharterDetailsComponent implements OnInit {
  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService, private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute, private modal: NgbModal) {
    config.max = 5;
    config.readonly = true;
  }
  charterId: number;
  charterDetails: any;
  charterSchedule: any;
  @ViewChild('allFeaturesModal', { static: true }) templateRef: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';
  dateScheduleIndex = 0;
  charterFilterDetails = {
    departureDate: new Date(),
    adults: 1,
    childrens: 0
  };
  popOverFilterData = {
    adults: 0,
    childrens: 0
  }
  boatHost: any;
  showMore: boolean = false;
  isSubmitted: boolean = false;
  USER_DEFAULTS = UserDefaults;
  charterCapcityValidation:any;
  @ViewChild('popOver') public popover: NgbPopover;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterId = Number(res['id']);
    });
    this.getCharterDetailsById();
  }


  getCharterDetailsById() {
    this.yachtSearchService.charterDetailsById(this.charterId).subscribe((res: any) => {
      this.charterDetails = res?.charterDetails;
      this.charterSchedule = res.charterSchedule;
      this.getHostDetails(this.charterDetails?.boat.creatorId);
    })
  }

  getHostDetails(userId: string) {
    this.yachtSearchService.hostDetailsById(userId).subscribe(res => {
      this.boatHost = res;
    })
  }

  featureFilter(isFavroute: boolean, isHealthSafetyFeature: boolean) {
    if (isHealthSafetyFeature == false) {
      return this.charterDetails?.boat.boatFeatures.filter((res: any) => res.offeredFeatures.isGuestFavourite == isFavroute && res.offeredFeatures.isSafetyFeature == false);
    }
    else if (isHealthSafetyFeature) {
      return this.charterDetails?.boat.boatFeatures.filter((res: any) => res.offeredFeatures.isSafetyFeature == isHealthSafetyFeature);
    }

  }

  ruleFilter(isHealthSafetyRule: boolean) {
    return this.charterDetails?.boat.boatRules.filter((res: any) => res.offeredFeatures.isGuestFavourite == isHealthSafetyRule);
  }

  reserveCharter() {
    this.isSubmitted = true;
    if ((this.charterFilterDetails.adults + this.charterFilterDetails.childrens) > 0) {
      let bookingModel = {
        charterId: this.charterId,
        departureDate: this.charterDetails.departureFromDate,
        noOfAdults: this.charterFilterDetails.adults,
        noOfChildrens: this.charterFilterDetails.childrens,
        hostId: this.charterDetails.boat.creatorId,
        bookingStatus: 0
      };
      this.bookingService.charterBooking(bookingModel).subscribe(res => {
        let bookingId = res?.data?.id;
        if (res.returnStatus) {
          let boatCalendar = {
            isAvailable: false,
            toDate: this.charterFilterDetails?.departureDate,
            fromDate: this.charterFilterDetails?.departureDate,
            boatEntityId: this.charterDetails?.boatId
          }
          this.yachtSearchService.updateCalendar(boatCalendar).subscribe(res => {
            if (res) {
              this.yachtParamService.setFilters(this.charterFilterDetails);
              this.router.navigate(['/payments/charter-payments', this.charterId, bookingId], { relativeTo: this.activatedRoute });
              this.toastr.success('Calendar reserved, please proceed with payments.', 'Success');
            }
          });
        }
      })
    }
  }
  openPopover() {
    this.popOverFilterData.adults = this.charterFilterDetails.adults;
    this.popOverFilterData.childrens = this.charterFilterDetails.childrens;
    this.popover.open();
  }
  updateGuests() {
    this.charterFilterDetails.adults = this.popOverFilterData.adults;
    this.charterFilterDetails.childrens = this.popOverFilterData.childrens;
    this.charterCapcityValidation = this.charterFilterDetails.adults + this.charterFilterDetails.childrens>this.charterDetails?.guestCapacity?"Please Enter Valid Guests":this.popover.close();
  }

  showAllFeatures() {
    this.modal.open(this.templateRef, { centered: true, windowClass: 'custom-modal custom-small-modal' });
  }

  onChangeDate(isIncrease: boolean) {
    this.dateScheduleIndex = isIncrease ? this.dateScheduleIndex + 1 : this.dateScheduleIndex - 1;
    this.yachtSearchService.charterDetailsById(this.charterSchedule[this.dateScheduleIndex]?.charterId).subscribe((res: any) => {
      this.charterDetails = res?.charterDetails;
    })
  }
}
