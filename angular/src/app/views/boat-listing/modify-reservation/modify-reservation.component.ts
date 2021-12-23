import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { utils } from 'src/app/shared/utility/utils';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-modify-reservation',
  templateUrl: './modify-reservation.component.html',
  styleUrls: ['./modify-reservation.component.scss']
})
export class ModifyReservationComponent implements OnInit {


  boatId: number;
  boatDetails: any;
  bookingId: any;
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  boatDetail: any;
  bookingModifyDetail: any;
  currentcheckOutDate: any;
  boatFilterDetails = {
    checkinDate: new Date(),
    checkoutDate: new Date(),
    adults: 0,
    childrens: 0
  };
  popOverFilterData = {
    adults: 0,
    childrens: 0
  }
  boatHost: any;
  showMore: boolean = false;
  isSubmitted: boolean = false;
  oneNightCharges: any;
  perdayFee: any;
  USER_DEFAULTS = UserDefaults;
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';
  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService,
    private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService,
    private activatedRoute: ActivatedRoute, private service: BookingService, private bookingListService: BookingListingService) {
    config.max = 5;
    config.readonly = true;
  }
  @ViewChild('popOver') public popover: NgbPopover;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.bookingId = res['id'].toString();
    });
    if (this.yachtParamService.getFilters()) {
      this.boatFilterDetails = this.yachtParamService.getFilters();
    }

    this.getBookingDetail();

  }
  getBookingDetail() {
    this.bookingListService.getBookingDetailbyId(this.bookingId).subscribe((res: any) => {
      this.bookingModifyDetail = res;
      this.boatFilterDetails.checkinDate = new Date(this.bookingModifyDetail?.checkinDate);
      this.boatFilterDetails.checkoutDate = new Date(this.bookingModifyDetail?.checkoutDate);
      this.service.getBoatInfo(res?.boatId).subscribe((boatdetail: any) => {
        this.bookingModifyDetail.boatDetail = boatdetail;
      });

    });
  }
  goBack() {
    this.router.navigate(['/boat-listing/all-reservations']);
  }

  calculateDays() {
    if (this.boatFilterDetails.checkinDate != null && this.boatFilterDetails.checkoutDate != null) {
      var date1 = new Date(this.boatFilterDetails.checkinDate);
      var date2 = new Date(this.boatFilterDetails.checkoutDate);
      var Time = date2.getTime() - date1.getTime();
      var Days = Time / (1000 * 3600 * 24);
      return Days < 0 ? 0 : Days + 1;
    }
    else {

      return 0;

    }

  }
  changecheckoutDate(checkout: any) {
     let checkoutLatest = utils.formatDate(checkout);
    let currentcheckOutDate = utils.formatDate(this.bookingModifyDetail?.checkoutDate);
    if (currentcheckOutDate <= checkoutLatest) {
      this.perdayFee = 0;
    }
    if (currentcheckOutDate == checkoutLatest) {
      this.perdayFee = 0;


    }
    if (currentcheckOutDate > checkoutLatest) {

      this.perdayFee = this.oneNightCharges;


    }

  }
  toDate(dob: any) {
    const [year, month, day] = dob.split('-');
    const obj = {
      year: parseInt(year), month: parseInt(month), day:
        parseInt(day.split(' ')[0].trim())
    };
    let obj2 = JSON.stringify(obj);
    return obj2;

  }

  getHostDetails(userId: string) {
    this.yachtSearchService.hostDetailsById(userId).subscribe(res => {
      this.boatHost = res;
    })
  }

  featureFilter(isFavroute: boolean, isHealthSafetyFeature: boolean) {
    if (isHealthSafetyFeature == false) {
      return this.bookingModifyDetail?.boatDetail?.boatFeatures.filter((res: any) => res.offeredFeatures.isGuestFavourite == isFavroute && res.offeredFeatures.isSafetyFeature == false);
    }
    else if (isHealthSafetyFeature) {
      return this.bookingModifyDetail?.boatDetail?.boatFeatures.filter((res: any) => res.offeredFeatures.isSafetyFeature == isHealthSafetyFeature);
    }

  }

  ruleFilter(isHealthSafetyRule: boolean) {
    return this.boatDetails.boatRules.filter((res: any) => res.offeredFeatures.isGuestFavourite == isHealthSafetyRule);
  }

  reserveBoat() {
    this.isSubmitted = true;
    if (this.boatFilterDetails.checkinDate && this.boatFilterDetails.checkoutDate && (this.bookingModifyDetail?.noOfAdults + this.bookingModifyDetail?.noOfChildrens) > 0) {
      let userId = Guid.create();
      let bookingModel = {
        id: this.bookingModifyDetail?.id,
        checkinDate: this.boatFilterDetails.checkinDate,//"2021-11-04T15:25:23.927Z",
        checkoutDate: this.boatFilterDetails.checkoutDate,//"2021-11-04T15:25:23.927Z",
        bookingStatus: 0,
        paymentStatus: 0,
        noOfAdults: this.bookingModifyDetail?.noOfAdults,
        noOfChildrens: this.bookingModifyDetail?.noOfChildrens,
        boatId: this.bookingModifyDetail?.boatId,
        userId: null,
        hostId: null,
        userName: null,
        reviews: null
      };
      this.bookingService.modifyboatelBooking(bookingModel).subscribe(res => {
        if (res) {
          let boatCalendar = {
            creationTime: new Date(),
            creatorId: userId.toString(),
            lastModificationTime: new Date(),
            lastModifierId: userId.toString(),
            isAvailable: false,
            toDate: this.boatFilterDetails.checkoutDate,
            fromDate: this.boatFilterDetails.checkinDate,
            boatEntityId: this.bookingModifyDetail?.boatId
          }
          this.yachtSearchService.updateCalendar(boatCalendar).subscribe(res => {
            if (res) {
              this.yachtParamService.setFilters(this.boatFilterDetails);
              this.toastr.success('Boat reservation Successfully Modified.', 'Success');
              this.router.navigate(['/boat-listing/all-reservations'], { relativeTo: this.activatedRoute });

            }
          });
        }
      })
    }
    else {
      this.toastr.success('Unable to Modify the reservation', 'Success');
    }
  }

  openPopover() {
    this.popOverFilterData.adults = this.boatFilterDetails.adults;
    this.popOverFilterData.childrens = this.boatFilterDetails.childrens;
    this.popover.open();
  }

  updateGuests() {
    this.boatFilterDetails.adults = this.popOverFilterData.adults;
    this.boatFilterDetails.childrens = this.popOverFilterData.childrens;
    this.popover.close();
  }

}



