import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
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


  boatId:number;
  boatDetails: any;
  bookingId: any;
  currentCookingId: any;
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  guidId!: Guid;
  boatDetail:any;
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
  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService,
  private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService,
   private activatedRoute: ActivatedRoute, private service: BookingService,private bookingListService:BookingListingService) {
    config.max = 5;
    config.readonly = true;
  }

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
        this.service.getBoatInfo(res?.boatId).subscribe((boatdetail: any) => {
          debugger;
          this.bookingModifyDetail.boatDetail = boatdetail;
          console.log(this.bookingModifyDetail);
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
        creationTime: "",
        creatorId: "",
        lastModificationTime: "",
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




}



