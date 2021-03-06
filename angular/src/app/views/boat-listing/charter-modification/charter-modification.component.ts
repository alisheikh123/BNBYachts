import { utils } from 'src/app/shared/utility/utils';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';
import { NotLoggedInComponent } from '../../auth/components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-charter-modification',
  templateUrl: './charter-modification.component.html',
  styleUrls: ['./charter-modification.component.scss']
})
export class CharterModificationComponent implements OnInit {

  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService, private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute, private modal: NgbModal, private authService:AuthService) {
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
  readAll: boolean = false;
  isSubmitted: boolean = false;
  USER_DEFAULTS = UserDefaults;
  charterCapcityValidation:any;
  @ViewChild('popOver') public popover: NgbPopover;
  approvalPolicyString: any = "Short description about the host Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterId = Number(res['id']);
    });
    this.getCharterDetailsById();
  }

  getCharterDetailsById() {
    this.yachtSearchService.charterDetailsById(this.charterId).subscribe((res: any) => {
      this.charterDetails = res?.charterDetails;
      this.charterDetails.totalDays = utils.getDaysBetweenTwoDates(this.charterDetails?.departureFromDate,this.charterDetails?.departureToDate)
       this.charterDetails.DepartureTime = utils.getTime(this.charterDetails?.departureFromDate);
       this.charterDetails.ArrivalTime = utils.getTime(this.charterDetails?.departureToDate);
       this.charterDetails.ReturnTime =utils.getTime(this.charterDetails?.returnDate);
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
    if(this.authService.authenticated) {
      if ((this.charterFilterDetails.adults + this.charterFilterDetails.childrens) > 0) {
        let bookingModel = {
          charterId: this.charterId,
          departureDate: this.charterDetails.departureFromDate,
          arrivalDate:this.charterDetails.departureToDate,
          noOfAdults: this.charterFilterDetails.adults,
          noOfChildrens: this.charterFilterDetails.childrens,
          hostId: this.charterDetails.boat.creatorId,
          bookingStatus: 0,
          boatId:this.charterDetails.boatId
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
    else {
      let modal = this.modal.open(NotLoggedInComponent,{windowClass: 'custom-modal custom-small-modal',centered:true})
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
    this.charterCapcityValidation = ((this.charterFilterDetails.adults + this.charterFilterDetails.childrens>this.charterDetails?.guestCapacity)||(this.charterFilterDetails.adults + this.charterFilterDetails.childrens<1))?"Entered guest capacity is not available":this.popover.close();
  }

  showAllFeatures() {
    this.modal.open(this.templateRef, { centered: true, windowClass: 'custom-modal custom-small-modal' });
  }

  onChangeDate(isIncrease: boolean) {
    this.dateScheduleIndex = isIncrease ? this.dateScheduleIndex + 1 : this.dateScheduleIndex - 1;
    this.yachtSearchService.charterDetailsById(this.charterSchedule[this.dateScheduleIndex]?.charterId).subscribe((res: any) => {
      this.charterDetails = res?.charterDetails;
      this.charterDetails.DepartureTime = utils.getTime(this.charterDetails?.departureFromDate)
      this.charterDetails.ArrivalTime = utils.getTime(this.charterDetails?.departureToDate)
      this.charterDetails.ReturnTime = utils.getTime(this.charterDetails?.returnDate)
    })
  }
}
