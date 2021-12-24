import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WishlistsService } from 'src/app/core/wishlist/wishlist.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
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
  mapDetails: any;
  markers: any[] = [];
  constructor(private yachtSearch: YachtSearchDataService, config: NgbRatingConfig,private wishlistService:WishlistsService,private toastr:ToastrService) {
    config.max = 5;
    config.readonly = true;
  }
  WISHLIST_TYPES = WishlistTypes;

  ngOnInit(): void {
    this.events = this.yachtSearch.getBoats();
    this.mapDetails = this.yachtSearch.getFilters();

    this.filterMarkers();
    this.center = {
      lat: this.mapDetails?.latitude,
      lng: this.mapDetails?.longitude
    };
    this.getUserWishlistBoats();
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

  addToWishList(event: any) {
    this.wishlistService.addToWishlist(event?.id,this.WISHLIST_TYPES.Event).subscribe((res: any) => {
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
    this.wishlistService.removeToWishlist(event?.wishlistId,this.WISHLIST_TYPES.Event).subscribe((res: any) => {
      if (res?.returnStatus) {
        event.isAddedToMyWishlist = false;
        this.toastr.success("Event removed from wishlists", "Wishlist");
      }
    })
  }

}
