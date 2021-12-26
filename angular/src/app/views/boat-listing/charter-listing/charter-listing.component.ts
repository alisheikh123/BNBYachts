import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WishlistsService } from 'src/app/core/wishlist/wishlist.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { WishlistTypes } from 'src/app/shared/enums/wishlist.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-charter-listing',
  templateUrl: './charter-listing.component.html',
  styleUrls: ['./charter-listing.component.scss']
})
export class CharterListingComponent implements OnInit {

  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';

  mapOptions: google.maps.MapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  mapInfoDetails!: any;
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  infoContent = '';
  charters: any[] = [];
  allCharters: any[] = [];
  mapDetails: any;
  markers: any[] = [];
  defaultFeatures: any;
  constructor(private yachtSearch: YachtSearchDataService, config: NgbRatingConfig,
    private modal: NgbModal,
    private boatService: YachtSearchService,
    private wishlistService: WishlistsService, private toastr: ToastrService) {
    config.max = 5;
    config.readonly = true;
  }
  WISHLIST_TYPES = WishlistTypes;
  charterFilter = {
    minPrice: 0,
    maxPrice: 0,
    isFullBoatCharges: null,
    isRoundTrip: null
  };
  moreFilters = {
    bathrooms: 0,
    bedrooms: 0
  };
  isFilterAdded: boolean = false;

  ngOnInit(): void {
    this.allCharters = this.yachtSearch.getBoats();
    this.charters = Object.assign([], this.allCharters);
    this.mapDetails = this.yachtSearch.getFilters();

    this.filterMarkers();
    this.center = {
      lat: this.mapDetails?.departureLatitude,
      lng: this.mapDetails?.departureLongitude
    };
    if (localStorage.getItem('userId') != null) {
      this.getUserWishlistBoats();
    }
    this.getDefaultFeatures();
  }

  getDefaultFeatures() {
    this.boatService.defaultFeatures().subscribe((res: any) => {
      this.defaultFeatures = res;
    });
  }
  filterMarkers() {
    this.charters.forEach((element: any) => {
      let marker = {
        charterId: element.id,
        position: {
          lat: element.departingLatitude,
          lng: element.departingLongitude
        },
        draggable: false,
        title: element.boat.name,
        options: { animation: google.maps.Animation.DROP }
      };
      this.markers.push(marker);
    });
  }
  openInfoWindow(marker: MapMarker, data: any) {
    this.mapInfoDetails = this.charters.find(res => res.id == data?.charterId);
    this.infoWindow.open(marker);
  }
  addToWishList(charter: any) {
    this.wishlistService.addToWishlist(charter?.id, this.WISHLIST_TYPES.Charter).subscribe((res: any) => {
      if (res?.returnStatus) {
        charter.isAddedToMyWishlist = true;
        charter.wishlistId = res?.data;
        this.toastr.success("Charter added to wishlists", "Wishlist");
      }
    })
  }
  getUserWishlistBoats() {
    this.wishlistService.getUserWishlists(this.WISHLIST_TYPES.Charter).subscribe((res: any) => {
      let allUserWishlists = res?.data;
      if (allUserWishlists) {
        this.charters.forEach(res => {
          let findCharter = allUserWishlists.find((item: any) => item?.charterId == res?.id);
          if (findCharter != null) {
            res.isAddedToMyWishlist = true;
            res.wishlistId = findCharter.id;
          }
        })
      }
    });
  }
  removeToWishList(charter: any) {
    this.wishlistService.removeToWishlist(charter?.wishlistId, this.WISHLIST_TYPES.Charter).subscribe((res: any) => {
      if (res?.returnStatus) {
        charter.isAddedToMyWishlist = false;
        this.toastr.success("Charter removed from wishlists", "Wishlist");
      }
    })
  }
  applyFilter() {
    this.isFilterAdded = true;
    let filterCharter = (this.charterFilter.minPrice + this.charterFilter.maxPrice > 0) ? this.allCharters.filter(res => res.charterFee >= this.charterFilter.minPrice && res.charterFee <= this.charterFilter.maxPrice) : this.allCharters;
    if (this.charterFilter.isFullBoatCharges == true) {
      filterCharter = filterCharter.filter(res => res.isFullBoatCharges)
    }
    else if (this.charterFilter.isFullBoatCharges == false) {
      filterCharter = filterCharter.filter(res => !res.isFullBoatCharges)
    }
    if (this.charterFilter.isRoundTrip == true) {
      filterCharter = filterCharter.filter(res => res.isRoundTrip)
    }
    else if (this.charterFilter.isRoundTrip == false) {
      filterCharter = filterCharter.filter(res => !res.isRoundTrip)
    }
    this.charters = Object.assign([], filterCharter);
  }

  openModal(template: TemplateRef<any>) {
    let modalOpen = this.modal.open(template, {centered: true, windowClass: 'custom-modal custom-small-modal'});
  }
  applyAdditionalFilters() {
    this.isFilterAdded = true;
    // get original unfiltered boats before applying filter
    this.charters = Object.assign([], this.allCharters);
    if (this.moreFilters.bathrooms + this.moreFilters.bedrooms > 0) {
      this.charters = this.charters.filter(res => res?.boat?.totalBedrooms >= this.moreFilters.bedrooms && res?.boat?.totalWashrooms >= this.moreFilters.bathrooms);
    }
    //for additional filters
    let selectedFeaturs = this.defaultFeatures.filter((res: any) => res?.isChecked == true);
    this.charters.forEach((charter: any, index) => {
      selectedFeaturs.forEach((elem: any) => {
        var find = charter?.boat.boatFeatures.find((res: any) => res.offeredFeaturesId == elem.id);
        if (!find) {
          this.charters.splice(index, 1);
        }
      });
    });
    this.modal.dismissAll();
  }
  increment(isBedroom:boolean) {
    this.moreFilters.bedrooms = (isBedroom ? this.moreFilters.bedrooms + 1 : this.moreFilters.bedrooms);
    this.moreFilters.bathrooms = (!isBedroom ? this.moreFilters.bathrooms + 1 : this.moreFilters.bathrooms); 
  }
  decrement(isBedroom:boolean) {
    this.moreFilters.bedrooms = (isBedroom && this.moreFilters.bedrooms > 0 ? this.moreFilters.bedrooms - 1 : this.moreFilters.bedrooms);
    this.moreFilters.bathrooms = (!isBedroom && this.moreFilters.bathrooms > 0 ? this.moreFilters.bathrooms - 1 : this.moreFilters.bathrooms);
  }
  close(){
    this.modal.dismissAll();
  }

}
