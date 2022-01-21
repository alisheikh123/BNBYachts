import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbModal, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { BookingListingService } from 'src/app/core/Booking/booking-listing.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { utils } from 'src/app/shared/utility/utils';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';



@Component({
  selector: 'app-modify-reservation',
  templateUrl: './modify-reservation.component.html',
  styleUrls: ['./modify-reservation.component.scss']
})
export class ModifyReservationComponent implements OnInit {


  boatId: number;
  boatDetails: any;
  bookingId: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
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
  readAll: boolean = false;
  isSubmitted: boolean = false;
  oneNightCharges: any;
  perdayFee: any;
  USER_DEFAULTS = UserDefaults;
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';
  minDate = {year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()};
  maxDate={year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()};
  deductedAmount:number;
  refundableAmount:any;
  totalDays:number;
  checkinDate:any;
  checkoutDate:any;
  Days:number;
  checkinTime:any;
  checkoutTime:any;
  totalAmount:any;
  prevDays:number;
  approvalPolicyString: any = "Short description about the host Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud";  
  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService,
    private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService,
    private activatedRoute: ActivatedRoute, private service: BookingService, private bookingListService: BookingListingService,
    private modal: NgbModal,) {
    config.max = 5;
    config.readonly = true;
  }
  @ViewChild('modifyReservation') modifyPop: TemplateRef<any>;
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
      this.boatFilterDetails.checkinDate = this.addDays(new Date(this.bookingModifyDetail?.checkinDate),1);
      this.boatFilterDetails.checkoutDate = this.addDays(new Date(this.bookingModifyDetail?.checkoutDate),1);
      this.checkinDate = new Date(this.bookingModifyDetail?.checkinDate);
      this.checkoutDate = new Date(this.bookingModifyDetail?.checkoutDate);
      this.Days = utils.differenceDates(this.checkinDate,this.checkoutDate);
      this.prevDays = utils.differenceDates(this.checkinDate,this.checkoutDate);
      this.minDate = {year:this.checkinDate.getFullYear(), month:this.checkinDate.getMonth()+1, day: this.checkinDate.getDate()};
      this.maxDate = {year:this.checkoutDate.getFullYear(), month:this.checkoutDate.getMonth()+1, day: this.checkoutDate.getDate()};
      this.totalAmount = this.bookingModifyDetail?.boatDetail?.perDayCharges * this.Days;
      const Time = Math.abs(new Date(this.bookingModifyDetail?.checkoutDate).valueOf() - new Date(this.bookingModifyDetail?.checkinDate).valueOf());
      this.totalDays = Math.ceil(Time / (1000 * 60 * 60 * 24))+1;
      this.service.getBoatInfo(res?.boatId).subscribe((boatdetail: any) => {
        this.bookingModifyDetail.boatDetail = boatdetail;
        this.checkinTime = this.bookingModifyDetail?.boatDetail?.checkinTime;
        this.checkoutTime = this.bookingModifyDetail?.boatDetail?.checkoutTime;
      });

    });
  }

  goBack() {
    this.router.navigate(['/boat-listing/all-reservations']);
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
  calculateRefundable(checkinDate:any,checkoutDate:any,checkinDateTime:any,checkoutDateTime:any,checkoutDateLatest:any)
  {
    let currentDate = utils.formatDate(new Date());
    let checkInDate  = moment(checkinDate,"DD-MM-YYYY").format("YYYY-MM-DD");
    let checkOutDate = moment(checkoutDate,"DD-MM-YYYY").format("YYYY-MM-DD");
    let checkoutDateLat = utils.formatDate(checkoutDateLatest);
    let currentTime = utils.formatTime(currentDate);
    let checkInTime = utils.formatTime(checkinDateTime);
    let checkOutTime = utils.formatTime(checkoutDateTime);
    let currentCombindDateTime = new Date(currentDate + ' ' + currentTime);
    let checkinCombindDateTime = new Date(checkInDate + ' ' + checkInTime);
    let checkoutCombindDateTime = new Date(checkOutDate + ' ' + checkOutTime);
    let checkoutLatestDateTime = new Date(checkoutDateLat+ ' '+ checkOutTime);
    let remaingHours =Math.ceil(new Date(checkinCombindDateTime).valueOf() - new Date(currentCombindDateTime).valueOf()) / 36e5;
    let hour = this.float2int(remaingHours);
    let noOfDays = utils.differenceWithoutAddition(checkinCombindDateTime,checkoutLatestDateTime);
    if (hour > 72) {
      this.deductedAmount = 0;
      this.refundableAmount =   (this.bookingModifyDetail?.boatDetail?.perDayCharges * this.totalDays)-(this.bookingModifyDetail?.boatDetail?.perDayCharges * noOfDays);
    }
    if (hour == 72 ||(hour < 72 && hour >= 24)) {
      this.deductedAmount = this.bookingModifyDetail?.boatDetail?.perDayCharges /2 ;

      this.refundableAmount = (this.bookingModifyDetail?.boatDetail?.perDayCharges * this.totalDays)- (this.bookingModifyDetail?.boatDetail?.perDayCharges * noOfDays)- this.deductedAmount;

    }
    if (hour < 24) {
      this.deductedAmount = this.bookingModifyDetail?.boatDetail?.perDayCharges * 1;
      this.refundableAmount =  (this.bookingModifyDetail?.boatDetail?.perDayCharges * this.totalDays)-(this.bookingModifyDetail?.boatDetail?.perDayCharges * noOfDays)- this.deductedAmount;
    }

  }


 float2int (value:any)
 {
    return value | 0;
 }
  changecheckoutDate(checkout: any) {
     if (this.boatFilterDetails.checkinDate != null && this.boatFilterDetails.checkoutDate != null) {
    let checkoutLatest = utils.formatDate(checkout);
    let currentcheckOutDate = utils.formatDate(this.bookingModifyDetail?.checkoutDate);
    this.Days=utils.differenceDates(this.checkinDate,checkout);
    var date1 = moment(this.bookingModifyDetail?.checkinDate).format('DD-MM-YYYY');
    var date2 = moment(this.bookingModifyDetail?.checkoutDate).format('DD-MM-YYYY');
    this.calculateRefundable(date1,date2,this.checkinTime,this.checkoutTime,checkoutLatest);
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

  }
  setMaxDate(item:any){
    let date = new Date(item);
    this.boatFilterDetails.checkoutDate = this.boatFilterDetails.checkinDate;
    if(item != null){
     date = new Date(item);
      this.minDate = {year : date.getFullYear(),month:date.getMonth()+1,day:date.getDate()};
    }
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
              this.modal.dismissAll();
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
  openModal(modifytemplate: TemplateRef<any>) {
      this.modal.open(modifytemplate,{centered:true});
  }
  cancelpopup() {
    this.modal.dismissAll();
  }  
}
