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
  constructor(config: NgbRatingConfig, private toastr: ToastrService, private yachtSearchService: YachtSearchService, private router: Router, private bookingService: BookingService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute,private modal:NgbModal) {
    config.max = 5;
    config.readonly = true;
  }
  charterId: number;
  charterDetails: any;
  //assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  @ViewChild('allFeaturesModal', { static: true }) templateRef: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  assetsCoreUrl = environment.CORE_API_URL + '/user-profiles/';


  charterFilterDetails = {
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
  USER_DEFAULTS = UserDefaults;
  @ViewChild('popOver') public popover: NgbPopover;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterId = Number(res['id']);
    });
    this.getCharterDetailsById();
    if (this.yachtParamService.getFilters()) {
      this.charterFilterDetails = this.yachtParamService.getFilters();
    }
  }


  getCharterDetailsById() {
    this.yachtSearchService.charterDetailsById(this.charterId).subscribe((res: any) => {
      this.charterDetails = res;
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
  }

  openPopover() {
    this.popOverFilterData.adults = this.charterFilterDetails.adults;
    this.popOverFilterData.childrens = this.charterFilterDetails.childrens;
    this.popover.open();
  }
  updateGuests() {
    this.charterFilterDetails.adults = this.popOverFilterData.adults;
    this.charterFilterDetails.childrens = this.popOverFilterData.childrens;
    this.popover.close();
  }

  showAllFeatures(){
    this.modal.open(this.templateRef, {centered: true ,windowClass:'custom-modal custom-small-modal'});
  }
}
