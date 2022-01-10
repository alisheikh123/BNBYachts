import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-charter-location-setting',
  templateUrl: './charter-location-setting.component.html',
  styleUrls: ['./charter-location-setting.component.scss']
})
export class CharterLocationSettingComponent implements OnInit {
  charterId: number;
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
  charterDetails:any;
  charterLocation = {
    charterId: 0,
    departurelatitude: 0,
    departurelongitude: 0,
    destinationlatitude: 0,
    destinationlongitude: 0,
    departureFromlocation: '',
    destinationlocation: ''
  }
  locationMarker: any;
  constructor(private activatedRoute: ActivatedRoute,
    private yachtSearchService: YachtSearchService,
    private service: ReservationService,
     private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterId = Number(res['id']);
      this.charterLocation.charterId = this.charterId;
    });
    this.getCharterDetailsById();
  }
  getCharterDetailsById() {
    this.yachtSearchService.charterDetailsById(this.charterId).subscribe((res: any) => {
      this.charterDetails = res?.charterDetails;
      this.center = {
        lat: res?.departingLatitude,
        lng: res?.departingLongitude
      };
      this.addLocationMarker();
    })
  }
  goBack() {
    this.route.navigate(['host/host-boat-listing']);
 }
 addLocationMarker(){
  this.locationMarker = {
    position: {
      lat: this.center?.lat,
      lng: this.center?.lng

    },
    draggable: false,
    title: this.charterDetails?.name,
    options: { animation: google.maps.Animation.DROP }
  };
}

handleCharterDepartFromAddressChange(address: any)
{
  this.charterLocation.departureFromlocation = address.formatted_address;
  this.charterLocation.departurelatitude = address.geometry.location.lat();
  this.charterLocation.departurelongitude = address.geometry.location.lng();
  this.center = {
    lat: this.charterLocation?.departurelatitude,
    lng: this.charterLocation.departurelongitude
  };
  this.addLocationMarker();
}
handleCharterDestinationAddressChange(address: any)
{
  this.charterLocation.destinationlocation = address.formatted_address;
  this.charterLocation.destinationlatitude = address.geometry.location.lat();
  this.charterLocation.destinationlongitude = address.geometry.location.lng();
  this.center = {
    lat: this.charterLocation.destinationlatitude,
    lng: this.charterLocation.destinationlongitude
  };
  this.addLocationMarker();
}

updateCharterLocation() {
  this.service.updateCharterLocation(this.charterLocation).subscribe(res => {
    if (res) {
      this.toastr.success("Charter Location updated successfully", "Location");
      this.goBack();
    }
    else {
      this.toastr.error("something went wrong!", "Location");
    }

  })
}
}
