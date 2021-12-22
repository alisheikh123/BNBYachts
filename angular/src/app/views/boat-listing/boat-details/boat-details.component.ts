import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbPopover, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserDefaults } from 'src/app/shared/enums/user-roles';
import { environment } from 'src/environments/environment';
import { NotLoggedInComponent } from '../../auth/components/not-logged-in/not-logged-in.component';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss']
})
export class BoatDetailsComponent implements OnInit {
  bookingId: any;

  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService, private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute,private authService:AuthService,private modal:NgbModal) {
    config.max = 5;
    config.readonly = true;
  }
  boatId: number;
  boatDetails: any;
  //assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';

  guidId!: Guid;
  boatFilterDetails = {
    checkinDate: new Date(),
    checkoutDate: new Date(),
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
  @ViewChild('popOver') public popover: NgbPopover;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = Number(res['id']);
    });
    this.getBoatDetailsById();
    if (this.yachtParamService.getFilters()) {
      this.boatFilterDetails = this.yachtParamService.getFilters();
    }
    if (this.boatFilterDetails.checkinDate == null && this.boatFilterDetails.checkoutDate == null) {
      this.boatFilterDetails.checkinDate = new Date();
      this.boatFilterDetails.checkoutDate = new Date();
      this.boatFilterDetails.adults = 1;
    }
  }
  calculateDays() {
    if (this.boatFilterDetails.checkinDate != null && this.boatFilterDetails.checkoutDate != null) {
      var date1 = new Date(this.boatFilterDetails.checkinDate);
      var date2 = new Date(this.boatFilterDetails.checkoutDate);
      var Time = date2.getTime() - date1.getTime();
      var Days = Math.floor(Time / (1000 * 3600 * 24));
      return Days < 0 ? 0 : Days + 1;
    }
    else {
      return 0;
    }
  }
  getBoatDetailsById() {
    this.yachtSearchService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatDetails = res;
      this.getHostDetails(this.boatDetails?.creatorId);
    })
  }

  getHostDetails(userId: string) {
    this.yachtSearchService.hostDetailsById(userId).subscribe(res => {
      this.boatHost = res;
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
    if(this.authService.authenticated){
      if (this.boatFilterDetails.checkinDate && this.boatFilterDetails.checkoutDate && (this.boatFilterDetails.adults + this.boatFilterDetails.childrens) > 0) {
        let bookingModel = {
          creationTime: new Date(),
          checkinDate: this.boatFilterDetails.checkinDate,//"2021-11-04T15:25:23.927Z",
          checkoutDate: this.boatFilterDetails.checkoutDate,//"2021-11-04T15:25:23.927Z",
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
    else{
      let modal = this.modal.open(NotLoggedInComponent,{windowClass: 'custom-modal custom-small-modal',centered:true})
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
