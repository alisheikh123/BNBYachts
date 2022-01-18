import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-boat-loation-settings',
  templateUrl: './boat-loation-settings.component.html',
  styleUrls: ['./boat-loation-settings.component.scss']
})
export class BoatLoationSettingsComponent implements OnInit {

  boatId: number;
  boatDetails: any;
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
  boatLocation = {
    boatId: 0,
    latitude: 0,
    longitude: 0,
    location: ''
  }
  locationMarker: any;
  constructor(private activatedRoute: ActivatedRoute,
    private yachtSearchService: YachtSearchService,
    private service: ReservationService,
    private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = Number(res['id']);
      this.boatLocation.boatId = this.boatId;
    });
    this.getBoatDetailsById();
  }

  getBoatDetailsById() {
    this.yachtSearchService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatDetails = res;
      this.center = {
        lat: res?.latitude,
        lng: res?.longitude
      };
      ///Location Marker
      this.addLocationMarker();
    })
  }

  addLocationMarker() {
    this.locationMarker = {
      position: {
        lat: this.center?.lat,
        lng: this.center?.lng

      },
      draggable: false,
      title: this.boatDetails?.name,
      options: { animation: google.maps.Animation.DROP }
    };
  }

  handleAddressChange(address: any) {
    this.boatLocation.location = address.formatted_address;
    this.boatLocation.latitude = address.geometry.location.lat();
    this.boatLocation.longitude = address.geometry.location.lng();
    this.center = {
      lat: this.boatLocation?.latitude,
      lng: this.boatLocation?.longitude
    };
    this.addLocationMarker();
  }


  updateLocation() {
    this.service.updateBoatLocation(this.boatLocation).subscribe(res => {
      if (res) {
        this.toastr.success("Boatel Location updated successfully", "Location");
        this.goBack();
      }
      else {
        this.toastr.error("something went wrong!", "Location");
      }

    })
  }

  goBack() {
    this.route.navigate(['host/host-boat-listing']);
  }


}
