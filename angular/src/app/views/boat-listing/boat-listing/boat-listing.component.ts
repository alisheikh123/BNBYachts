import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgbActiveModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WishlistsService } from 'src/app/core/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boat-listing',
  templateUrl: './boat-listing.component.html',
  styleUrls: ['./boat-listing.component.scss'],
})
export class BoatListingComponent implements OnInit {
  //assetsUrl = environment.BOAT_API_URL + '/boatgallery/';
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
  boats: any[] = [];
  mapDetails: any;
  markers: any[] = [];
  defaultFeatures: any;
  Array: number[] = [];
  indexToRemove: number[] = [];
  isfrmChecked: boolean;
  unfilteredBoats: any[];
  bathroomCount: number = 0;
  roomCount: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
  activeModal: any;
  isLoggedIn = false;

  constructor(
    private yachtSearch: YachtSearchDataService,
    private yachtService: YachtSearchService,
    config: NgbRatingConfig,
    private modal: NgbModal,
    private wishlistService: WishlistsService,
    private toastr: ToastrService
  ) {
    config.max = 5;
    config.readonly = true;

  }

  ngOnInit(): void {
    this.boats = this.yachtSearch.getBoats();
    // save original befor befor applying additional filters in local storage
    this.mapDetails = this.yachtSearch.getFilters();
    this.getDefaultFeatures();

    this.filterMarkers();
    this.center = {
      lat: this.mapDetails?.latitude,
      lng: this.mapDetails?.longitude
    };
    if (localStorage.getItem('userId') != null) {
      this.isLoggedIn = true;
      this.getUserWishlistBoats();
    }
    localStorage.setItem('originalBoats', JSON.stringify(this.boats));
  }

  filterMarkers() {
    this.boats.forEach((element: any) => {
      let marker = {
        boatId: element.id,
        position: {
          lat: element.latitude,
          lng: element.longitude,
        },
        draggable: false,
        title: element.name,
        options: { animation: google.maps.Animation.DROP },
      };
      this.markers.push(marker);
    });
  }
  getDefaultFeatures() {
    this.yachtService.defaultFeatures().subscribe((res: any) => {
      this.defaultFeatures = res;
    });
  }
  toggleAdditionalFilters(event: any) {
    if (event.currentTarget.checked) {
      this.Array.push(event.target.value);
    } else {
      let index = this.Array.indexOf(event.target.value);
      this.Array.splice(index, 1);
    }
  }
  applyAdditionalFilters() {
    // get original unfiltered boats before applying filter
    this.boats = JSON.parse(localStorage.getItem('originalBoats') || '{}');

    if (this.roomCount > 0) {
      this.indexToRemove = [];
      this.boats.forEach((boat: any, index) => {
        if (boat.totalBedrooms != this.roomCount) {
          this.indexToRemove.push(index);
          this.indexToRemove.sort((a, b) => b - a);
        }
      });
      this.indexToRemove.forEach((entry: any, index) => {
        this.boats.splice(entry, 1);
      });
    }
    if (this.bathroomCount > 0) {
      this.indexToRemove = [];
      this.boats.forEach((boat: any, index) => {
        if (boat.totalWashrooms != this.bathroomCount) {
          this.indexToRemove.push(index);
          this.indexToRemove.sort((a, b) => b - a);
        }
      });
      this.indexToRemove.forEach((entry: any, index) => {
        this.boats.splice(entry, 1);
      });
    }
    //for additional filters
    this.boats.forEach((boat: any, index) => {
      this.Array.forEach((elem: any) => {
        var rep = boat.boatFeatures.filter((res: any) => res.offeredFeaturesId == elem);
        if (rep.length == 0) {
          var res = this.boats.splice(index, 1);
        }
      });
    });
    this.activeModal.close();
  }
  applyPriceFilter(minPrice: number, maxPrice: number) {
    // get original unfiltered boats before applying filter
    this.boats = JSON.parse(localStorage.getItem('originalBoats') || '{}');
    this.indexToRemove = [];
    this.boats.forEach((boat: any, index) => {
      if (boat.perDayCharges <= minPrice || boat.perDayCharges >= maxPrice) {
        this.indexToRemove.push(index);
        this.indexToRemove.sort((a, b) => b - a);
      }
    });
    this.indexToRemove.forEach((entry: any, index) => {
      this.boats.splice(entry, 1);
    });
    this.activeModal.close();
  }
  openInfoWindow(marker: MapMarker, data: any) {
    this.mapInfoDetails = this.boats.find((res) => res.id == data?.boatId);
    this.infoWindow.open(marker);
  }
  openModal(template: TemplateRef<any>) {
    this.activeModal = this.modal.open(template, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: 'custom-modal custom-small-modal' });
  }
  increment(input: string) {
    input == 'fromRoom' ? this.roomCount++ : this.bathroomCount++;
  }
  decrement(input: string) {
    input == 'fromRoom' ? this.roomCount-- : this.bathroomCount--;
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
      this.boats.forEach(res => {
        let findBoat = allUserWishlists.find((item: any) => item.boatId == res.id);
        if (findBoat != null) {
          res.isAddedToMyWishlist = true;
          res.wishlistId = findBoat.id;
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
  closeModal(){
    this.modal.dismissAll();
  }

}
