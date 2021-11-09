import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss']
})
export class BoatDetailsComponent implements OnInit {

  constructor(private yachtSearchService: YachtSearchService, private yachtParamService: YachtSearchDataService, private activatedRoute: ActivatedRoute,) { }
  boatId: string = '';
  boatDetails: any;
  assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
  boatFilterDetails = {
    checkinDate: '',
    checkoutDate: '',
    adults: 0,
    childrens: 0
  };
  boatHost :any;
  showMore : boolean  = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = res['id'];
    });
    this.getBoatDetailsById();
    if (this.yachtParamService.searchResult?.mapOptions) {
      this.boatFilterDetails = this.yachtParamService.searchResult?.mapOptions;
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
    else{
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

  getHostDetails(userId:string){
    this.yachtSearchService.hostDetailsById(userId).subscribe(res=>{
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

}
