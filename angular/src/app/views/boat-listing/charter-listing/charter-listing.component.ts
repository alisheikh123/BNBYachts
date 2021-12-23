import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WishlistsService } from 'src/app/core/wishlist/wishlist.service';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
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
  mapDetails: any;
  markers: any[] = [];
  constructor(private yachtSearch: YachtSearchDataService, config: NgbRatingConfig, private wishlistService: WishlistsService, private toastr: ToastrService) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.charters = this.yachtSearch.getBoats();
    this.mapDetails = this.yachtSearch.getFilters();

    this.filterMarkers();
    this.center = {
      lat: this.mapDetails?.departureLatitude,
      lng: this.mapDetails?.departureLongitude
    };
    this.getUserWishlistBoats();
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
  addToWishList(boat: any) {
    this.wishlistService.addToWishlist(boat?.id).subscribe((res: any) => {
      if (res?.returnStatus) {
        boat.isAddedToMyWishlist = true;
        boat.wishlistId = res?.data;
        this.toastr.success("Boat added to wishlists", "Wishlist");
      }
    })
  }
  getUserWishlistBoats() {
    this.wishlistService.getUserWishlists().subscribe((res: any) => {
      let allUserWishlists = res?.data;
      this.charters.forEach(res => {
        let findBoat = allUserWishlists.find((item: any) => item?.boatId == res?.boat.id);
        if (findBoat != null) {
          res.boat.isAddedToMyWishlist = true;
          res.boat.wishlistId = findBoat.id;
        }
      })
    });
  }
  removeToWishList(boat: any) {
    this.wishlistService.removeToWishlist(boat?.wishlistId).subscribe((res: any) => {
      if (res?.returnStatus) {
        boat.isAddedToMyWishlist = false;
        this.toastr.success("Boat removed from wishlists", "Wishlist");
      }
    })
  }

}
