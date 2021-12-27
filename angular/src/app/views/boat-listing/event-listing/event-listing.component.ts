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
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})
export class EventListingComponent implements OnInit {

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
  events: any[] = [];
  allEvents: any[] = [];
  mapDetails: any;
  markers: any[] = [];
  defaultFeatures: any[];
  constructor(private boatService: YachtSearchService, private yachtSearch: YachtSearchDataService,
    config: NgbRatingConfig, private wishlistService: WishlistsService, private toastr: ToastrService, private modal: NgbModal) {
    config.max = 5;
    config.readonly = true;
  }
  WISHLIST_TYPES = WishlistTypes;
  isFilterAdded: boolean = false;
  eventFilter = {
    minPrice: 0,
    maxPrice: 0
  };
  moreFilters = {
    bathrooms: 0,
    bedrooms: 0
  };

  ngOnInit(): void {
    this.allEvents = this.yachtSearch.getBoats();
    this.events = Object.assign([], this.allEvents);
    this.mapDetails = this.yachtSearch.getFilters();

    this.filterMarkers();
    this.center = {
      lat: this.mapDetails?.latitude,
      lng: this.mapDetails?.longitude
    };
    this.getDefaultFeatures();
    if (localStorage.getItem('userId') != null) {
      this.getUserWishlistBoats();
    }
  }
  filterMarkers() {
    this.events.forEach((element: any) => {
      let marker = {
        charterId: element.id,
        position: {
          lat: element.locationLat,
          lng: element.locationLong
        },
        draggable: false,
        title: element.boat.name,
        options: { animation: google.maps.Animation.DROP }
      };
      this.markers.push(marker);
    });
  }
  openInfoWindow(marker: MapMarker, data: any) {
    this.mapInfoDetails = this.events.find(res => res.id == data?.charterId);
    this.infoWindow.open(marker);
  }

  getDefaultFeatures() {
    this.boatService.defaultFeatures().subscribe((res: any) => {
      this.defaultFeatures = res;
    });
  }

  addToWishList(event: any) {
    this.wishlistService.addToWishlist(event?.id, this.WISHLIST_TYPES.Event).subscribe((res: any) => {
      if (res?.returnStatus) {
        event.isAddedToMyWishlist = true;
        event.wishlistId = res.data;
        this.toastr.success("Event added to wishlists", "Wishlist");
      }
    })
  }
  getUserWishlistBoats() {
    this.wishlistService.getUserWishlists(this.WISHLIST_TYPES.Event).subscribe((res: any) => {
      let allUserWishlists = res?.data;
      this.events.forEach(res => {
        let findEvent = allUserWishlists.find((item: any) => item?.eventId == res?.id);
        if (findEvent != null) {
          res.isAddedToMyWishlist = true;
          res.wishlistId = findEvent.id;
        }
      })
    });
  }
  removeToWishList(event: any) {
    this.wishlistService.removeToWishlist(event?.wishlistId, this.WISHLIST_TYPES.Event).subscribe((res: any) => {
      if (res?.returnStatus) {
        event.isAddedToMyWishlist = false;
        this.toastr.success("Event removed from wishlists", "Wishlist");
      }
    })
  }

  applyFilter() {
    this.isFilterAdded = true;
    let filterdEvents = (this.eventFilter.minPrice + this.eventFilter.maxPrice > 0) ? this.allEvents.filter(res => res.amountPerPerson >= this.eventFilter.minPrice && res.amountPerPerson <= this.eventFilter.maxPrice) : this.allEvents;
    this.events = Object.assign([], filterdEvents);
  }

  openModal(template: TemplateRef<any>) {
    let modalOpen = this.modal.open(template, { centered: true, windowClass: 'custom-modal custom-small-modal' });
  }
  applyAdditionalFilters() {
    this.isFilterAdded = true;
    // get original unfiltered boats before applying filter
    this.events = Object.assign([], this.allEvents);
    if (this.moreFilters.bathrooms + this.moreFilters.bedrooms > 0) {
      this.events = this.events.filter(res => res?.boat?.totalBedrooms >= this.moreFilters.bedrooms && res?.boat?.totalWashrooms >= this.moreFilters.bathrooms);
    }
    //for additional filters
    let selectedFeaturs = this.defaultFeatures.filter((res: any) => res?.isChecked == true);
    this.events.forEach((event: any, index) => {
      selectedFeaturs.forEach((elem: any) => {
        var find = event?.boat.boatFeatures.find((res: any) => res.offeredFeaturesId == elem.id);
        if (!find) {
          this.events.splice(index, 1);
        }
      });
    });
    this.modal.dismissAll();
  }
  increment(isBedroom: boolean) {
    this.moreFilters.bedrooms = (isBedroom ? this.moreFilters.bedrooms + 1 : this.moreFilters.bedrooms);
    this.moreFilters.bathrooms = (!isBedroom ? this.moreFilters.bathrooms + 1 : this.moreFilters.bathrooms);
  }
  decrement(isBedroom: boolean) {
    this.moreFilters.bedrooms = (isBedroom && this.moreFilters.bedrooms > 0 ? this.moreFilters.bedrooms - 1 : this.moreFilters.bedrooms);
    this.moreFilters.bathrooms = (!isBedroom && this.moreFilters.bathrooms > 0 ? this.moreFilters.bathrooms - 1 : this.moreFilters.bathrooms);
  }
  close() {
    this.modal.dismissAll();
  }

}
