import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { utils } from 'src/app/shared/utility/utils';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-modify-reservation',
  templateUrl: './modify-reservation.component.html',
  styleUrls: ['./modify-reservation.component.scss']
})
export class ModifyReservationComponent implements OnInit {


  boatId: string = '';
  boatDetails: any;
  bookingId: any;
  currentCookingId: any;
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  guidId!: Guid;
  bookingModifyDetail: any;
  currentcheckInDate: any;
  currentcheckOutDate: any;
  boatFilterDetails = {
    checkinDate: new Date(),
    checkoutDate: new Date(),
    adults: 0,
    childrens: 0
  };
  testDate: any;
  boatHost: any;
  showMore: boolean = false;
  isSubmitted: boolean = false;
  oneNightCharges: any;
  perdayFee: any;
  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService, private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute, private service: BookingService) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.bookingId = res['id'];
    });
    if (this.yachtParamService.getFilters()) {
      this.boatFilterDetails = this.yachtParamService.getFilters();
    }
    this.getBookingDetail();
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
    if (this.currentcheckOutDate <= checkoutLatest) {
      this.perdayFee = 0;


    }
    if (this.currentcheckOutDate == checkoutLatest) {
      this.perdayFee = 0;


    }
    if (this.currentcheckOutDate > checkoutLatest) {

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
      return this.bookingId.boatDetails.boatFeatures.filter((res: any) => res.offeredFeatures.isGuestFavourite == isFavroute && res.offeredFeatures.isSafetyFeature == false);
    }
    else if (isHealthSafetyFeature) {
      return this.bookingId.boatDetails.boatFeatures.filter((res: any) => res.offeredFeatures.isSafetyFeature == isHealthSafetyFeature);
    }

  }

  ruleFilter(isHealthSafetyRule: boolean) {
    return this.boatDetails.boatRules.filter((res: any) => res.offeredFeatures.isGuestFavourite == isHealthSafetyRule);
  }

  reserveBoat() {
    this.isSubmitted = true;
    if (this.boatFilterDetails.checkinDate && this.boatFilterDetails.checkoutDate && (this.boatFilterDetails.adults + this.boatFilterDetails.childrens) > 0) {
      let userId = Guid.create();
      let bookingModel = {
        id: this.currentCookingId,
        creationTime: "2021-11-04T15:25:23.927Z",
        creatorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lastModificationTime: "2021-11-04T15:25:23.927Z",
        lastModifierId: userId.toString(),
        checkinDate: this.boatFilterDetails.checkinDate,//"2021-11-04T15:25:23.927Z",
        checkoutDate: this.boatFilterDetails.checkoutDate,//"2021-11-04T15:25:23.927Z",
        bookingStatus: 0,
        paymentStatus: 0,
        noOfAdults: this.boatFilterDetails.adults,
        noOfChildrens: this.boatFilterDetails.childrens,

        boatId: this.boatId,
        bankingDetailsId: Guid.create().toString(),
        userId: userId.toString(),
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
            hostBoatId: this.boatId
          }
          this.yachtSearchService.updateCalendar(boatCalendar).subscribe(res => {
            if (res) {
              this.yachtParamService.setFilters(this.boatFilterDetails);
              this.router.navigate(['/boat-listing/booking-payment', this.boatId], { relativeTo: this.activatedRoute });
              this.toastr.success('Boat reserved successfully.', 'Success');
            }
          });
        }
      })
    }
  }



  getBookingDetail() {
    this.service.getBookingBoatDetail(this.bookingId).subscribe((res: any) => {
      this.bookingModifyDetail = res;
      res.forEach((elem: any) => {

        // // From BookingDetail
        this.currentcheckInDate = elem?.checkinDate;
        this.currentcheckOutDate = elem?.checkoutDate;
        this.boatFilterDetails.checkinDate = this.currentcheckInDate;
        this.boatFilterDetails.checkoutDate = this.currentcheckOutDate;
        this.boatFilterDetails.adults = elem.noOfAdults;
        this.boatFilterDetails.childrens = elem.noOfChildrens;
        this.boatId = elem.boatId;
        this.currentCookingId = elem.id;
        elem.checkinDate = utils.formatDate(elem?.checkinDate);
        elem.checkoutDate = utils.formatDate(elem?.checkoutDate);
        this.service.getBoatInfo(elem.boatId).subscribe((boatdetail: any) => {
          elem.boatDetail = boatdetail;
          this.oneNightCharges = elem.boatDetail.perDayCharges;
        });


      });

      this.boatFilterDetails.checkinDate = new Date(this.bookingModifyDetail[0].checkinDate);//this.bookingModifyDetail[0].checkinDate;
      this.boatFilterDetails.checkoutDate = new Date(this.bookingModifyDetail[0].checkoutDate);


    });
  }
}



