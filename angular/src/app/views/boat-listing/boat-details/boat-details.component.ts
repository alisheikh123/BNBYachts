import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbDateStruct, NgbModal, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { find } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';
import { CalendarService } from '../../../core/calendar/calendar.service';
import { NotLoggedInComponent } from '../../auth/components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss']
})
export class BoatDetailsComponent implements OnInit {
  booking = {
    amount :0,
    days:0
  };
  bookingId: any;
  boatId: number;
  boatDetails: any;
  //assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';

  guidId!: Guid;
  minDate: any;
  maxDate: any;
  boatFilterDetails = {
    checkinDate: new Date(),
    checkoutDate: new Date(),
    checkinTime: "",
    checkoutTime: "",
    adults: 1,
    childrens: 0
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
  boatelCapcityValidation: any;
  myBookings: any = [];
  @ViewChild('popOver') public popover: NgbPopover;
  approvalPolicyString: any = "Short description about the host Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud";

  constructor(config: NgbRatingConfig, private toastr: ToastrService,
    private yachtSearchService: YachtSearchService, private router: Router,
    private bookingService: BookingService, private yachtParamService: YachtSearchDataService,
    private activatedRoute: ActivatedRoute, private authService: AuthService, private modal: NgbModal) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = Number(res['id']);
    });
    this.getBoatDetailsById();
    if (this.yachtParamService.getFilters()) {
      this.boatFilterDetails = this.yachtParamService.getFilters();
    }
    if (this.boatFilterDetails.checkinDate == null && this.boatFilterDetails.checkoutDate == null) {
      this.boatFilterDetails.checkinDate = this.minDate;
      this.boatFilterDetails.checkoutDate = this.maxDate;
      this.boatFilterDetails.adults = 1;
    }
    this.getMyBookings();
  }
  isDisabled(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return this.myBookings.length > 0;
  }
  
  getBoatDetailsById() {
    this.yachtSearchService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatDetails = res;
      let findCalendar = res?.boatCalendars.find((res: any) => res.isAvailable == true);
      this.boatFilterDetails.checkinDate = new Date(findCalendar.fromDate);
      this.boatFilterDetails.checkoutDate = new Date(findCalendar.toDate);
      this.boatFilterDetails.checkoutDate = new Date(findCalendar.toDate);
      this.boatFilterDetails.checkinTime = moment(this.boatDetails?.checkinTime).format("h:mm a");
      this.boatFilterDetails.checkoutTime = moment(this.boatDetails?.checkoutTime).format("h:mm a");
      this.minDate = { year: new Date(findCalendar.fromDate).getFullYear(), month: new Date(findCalendar.fromDate).getMonth() + 1, day: new Date(findCalendar.fromDate).getDate() };
      this.maxDate = { year: new Date(findCalendar.toDate).getFullYear(), month: new Date(findCalendar.toDate).getMonth() + 1, day: new Date(findCalendar.toDate).getDate() };
      this.getHostDetails(this.boatDetails?.creatorId);
      this.calculatePricing();
    })
  }

  getHostDetails(userId: string) {
    this.yachtSearchService.hostDetailsById(userId).subscribe(res => {
      this.boatHost = res;
    })
  }

  getMyBookings() {
    this.bookingService.getmyBookings(this.boatId).subscribe((res: any) => {
      this.myBookings = res?.data;
    })
  }

  featureFilter(isFavroute: boolean, isHealthSafetyFeature: boolean) {
    if (isHealthSafetyFeature == false) {
      return this.boatDetails.boatFeatures.filter((res: any) => res.offeredFeatures.isGuestFavourite == isFavroute && res.offeredFeatures.isSafetyFeature == false);
    }
    else if (isHealthSafetyFeature) {
      return this.boatDetails.boatFeatures.filter((res: any) => res.offeredFeatures.isSafetyFeature == isHealthSafetyFeature);
    }

  }

  ruleFilter(isHealthSafetyRule: boolean) {
    return this.boatDetails.boatRules.filter((res: any) => res.offeredFeatures.isGuestFavourite == isHealthSafetyRule);
  }

  reserveBoat() {
    this.isSubmitted = true;
    if (this.authService.authenticated) {
      if (this.boatFilterDetails.checkinDate && this.boatFilterDetails.checkoutDate && (this.boatFilterDetails.adults + this.boatFilterDetails.childrens) > 0) {
        let bookingModel = {
          creationTime: new Date(),
          checkinDate: this.boatFilterDetails.checkinDate,//"2021-11-04T15:25:23.927Z",
          checkoutDate: this.boatFilterDetails.checkoutDate,//"2021-11-04T15:25:23.927Z",
          checkinTime: this.boatFilterDetails.checkinTime,
          checkoutTime: this.boatFilterDetails.checkoutTime,
          bookingStatus: 0,
          paymentStatus: 0,
          noOfAdults: this.boatFilterDetails.adults,
          noOfChildrens: this.boatFilterDetails.childrens,
          boatId: this.boatId,
          hostId: this.boatDetails.creatorId,
          reviews: null
        };
        this.bookingService.boatelBooking(bookingModel).subscribe(res => {
          this.bookingId = res?.data?.id;
          if (res.returnStatus) {
            let boatCalendar = {
              creationTime: new Date(),
              isAvailable: false,
              toDate: this.boatFilterDetails.checkoutDate,
              fromDate: this.boatFilterDetails.checkinDate,
              boatEntityId: this.boatId
            }
            this.yachtSearchService.updateCalendar(boatCalendar).subscribe(res => {
              if (res) {
                this.yachtParamService.setFilters(this.boatFilterDetails);
                this.router.navigate(['/payments/boatel-payments', this.boatId, this.bookingId], { relativeTo: this.activatedRoute });
                this.toastr.success('Calendar reserved, please proceed with payments.', 'Success');
              }
            });
          }
        })
      }
    }
    else {
      let modal = this.modal.open(NotLoggedInComponent, { windowClass: 'custom-modal custom-small-modal', centered: true })

    }
  }
  setMaxDate(item: any) {
    let date = new Date(item);
    this.boatFilterDetails.checkoutDate = this.boatFilterDetails.checkinDate;
    if (item != null) {
      date = new Date(item);
      this.minDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
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
    this.boatelCapcityValidation = (((this.boatFilterDetails.adults + this.boatFilterDetails.childrens) > (this.boatDetails?.boatelCapacity)) || ((this.boatFilterDetails.adults + this.boatFilterDetails.childrens) < 1)) ? "Entered guest capacity is not available" : this.popover.close();
  }

  calculatePricing() {
    let price = 0;
    if (this.boatFilterDetails.checkinDate != null && this.boatFilterDetails.checkoutDate != null && this.boatDetails != null) {
      var checkinDate = moment(this.boatFilterDetails.checkinDate).format("DD-MM-YYYY");
      var checkoutDate = moment(this.boatFilterDetails.checkoutDate).format("DD-MM-YYYY");
      for (var i = checkinDate; i <= checkoutDate; i = moment(i, "DD-MM-YYYY").add(1, 'days').format("DD-MM-YYYY")) {
        let findCalendar = this.boatDetails.boatCalendars.find((element: any) =>
          moment(element.fromDate).format("DD-MM-YYYY") == i &&
          moment(element.toDate).format("DD-MM-YYYY") == i && element.isAvailable
        );
        if (findCalendar) {
          price = price + findCalendar.amount;
        }
        else {
          price = price + this.boatDetails.perDayCharges
        }
      }
      this.booking.days = moment(checkoutDate,"DD-MM-YYYY").diff(moment(checkinDate,"DD-MM-YYYY"),'days')+1;
    }
    this.booking.amount = price;
  }
}
