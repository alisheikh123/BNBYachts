import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/core/Booking/booking.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss']
})
export class BoatDetailsComponent implements OnInit {

  constructor(config: NgbRatingConfig,private toastr: ToastrService, private yachtSearchService: YachtSearchService, private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute) { 
    config.max = 5;
    config.readonly = true;
  }
  boatId: string = '';
  boatDetails: any;
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  guidId!: Guid;
  boatFilterDetails = {
    checkinDate: '',
    checkoutDate: '',
    adults: 0,
    childrens: 0
  };
  boatHost: any;
  showMore: boolean = false;
  isSubmitted: boolean = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = res['id'];
    });
    this.getBoatDetailsById();
    if (this.yachtParamService.getFilters()) {
      this.boatFilterDetails = this.yachtParamService.getFilters();
    }
  }
  calculateDays() {
    if (this.boatFilterDetails.checkinDate != '' && this.boatFilterDetails.checkoutDate != '') {
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
  getBoatDetailsById() {
    this.yachtSearchService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatDetails = res;
      //this.getHostDetails(this.boatDetails?.creatorId);
      //console.log(this.boatDetails);
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
    if (this.boatFilterDetails.checkinDate && this.boatFilterDetails.checkoutDate && (this.boatFilterDetails.adults + this.boatFilterDetails.childrens) > 0) {
      let userId = Guid.create();
      let bookingModel = {
        id: Guid.create()?.toString(),
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
      this.bookingService.boatelBooking(bookingModel).subscribe(res => {
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
              this.toastr.success('Boat reserved successfully.','Success');
            }
          });
        }
      })
    }
  }

}
