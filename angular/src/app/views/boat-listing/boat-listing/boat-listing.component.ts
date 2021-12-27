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
import { WishlistTypes } from 'src/app/shared/enums/wishlist.constants';

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
  indexToRemove: number[] = [];
  isfrmChecked: boolean;
  unfilteredBoats: any[];
  bathroomCount: number = 0;
  roomCount: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
  activeModal: any;
  isLoggedIn = false;
  allBoats :any[]= [];
  isFilterAdded :boolean = false;
  WISHLIST_TYPES = WishlistTypes;

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
    this.allBoats  = this.yachtSearch.getBoats();
    this.boats = Object.assign([], this.allBoats);
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
  
  applyAdditionalFilters() {
    this.isFilterAdded = true;
    this.boats = Object.assign([], this.allBoats);
    if (this.bathroomCount + this.roomCount > 0) {
      this.boats = this.boats.filter(res => res?.totalBedrooms >= this.roomCount && res?.totalWashrooms >= this.bathroomCount);
    }
    //for additional filters
    debugger;
    let selectedFeaturs = this.defaultFeatures.filter((res: any) => res?.isChecked == true);
    this.boats.forEach((boat: any, index) => {
      selectedFeaturs.forEach((elem: any) => {
        var find = boat?.boatFeatures.find((res: any) => res.offeredFeaturesId == elem.id);
        if (!find) {
          this.boats.splice(index, 1);
        }
      });
    });
    this.modal.dismissAll();
  }

  applyPriceFilter(minPrice: number, maxPrice: number) {
    this.isFilterAdded = true;
    // get original unfiltered boats before applying filter
        this.boats = Object.assign([], this.allBoats);//JSON.parse(localStorage.getItem('originalBoats') || '{}');
    this.indexToRemove = [];
    this.boats.forEach((boat: any, index) => {
      if (boat.perDayCharges < minPrice || boat.perDayCharges > maxPrice) {
        this.indexToRemove.push(index);
        this.indexToRemove.sort((a, b) => b - a);
      }
    });
    this.indexToRemove.forEach((entry: any, index) => {
      this.boats.splice(entry, 1);
    });
    this.activeModal.close();
  }
  reset(){
    this.isFilterAdded = false; 
    this.boats = Object.assign([], this.allBoats);
    this.minPrice = 0;
    this.maxPrice = 0;
    this.defaultFeatures.forEach((element:any) => {
      element.isChecked = false;      
    });
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
    this.wishlistService.addToWishlist(boat?.id,this.WISHLIST_TYPES.Boatel).subscribe((res: any) => {
      if (res?.returnStatus) {
        boat.isAddedToMyWishlist = true;
        boat.wishlistId = res?.data;
        this.toastr.success("Boat added to wishlists", "Wishlist");
      }
    })
  }
  getUserWishlistBoats() {
    this.wishlistService.getUserWishlists(this.WISHLIST_TYPES.Boatel).subscribe((res: any) => {
      let allUserWishlists = res?.data;
      this.allBoats.forEach(res => {
        let findBoat = allUserWishlists.find((item: any) => item.boatId == res.id);
        if (findBoat != null) {
          res.isAddedToMyWishlist = true;
          res.wishlistId = findBoat.id;
        }
      });
    });
  }
  removeToWishList(boat: any) {
    this.wishlistService.removeToWishlist(boat?.wishlistId,this.WISHLIST_TYPES.Boatel).subscribe((res: any) => {
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
