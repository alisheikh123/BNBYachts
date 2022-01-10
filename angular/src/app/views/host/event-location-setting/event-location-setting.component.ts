import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from 'src/app/core/host/reservation.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-event-location-setting',
  templateUrl: './event-location-setting.component.html',
  styleUrls: ['./event-location-setting.component.scss']
})
export class EventLocationSettingComponent implements OnInit {
eventId: number;
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
  secondcenter!: google.maps.LatLngLiteral;
  eventDetails:any;
  EventLocation = {
    eventId: 0,
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
      this.eventId = Number(res['id']);
      this.EventLocation.eventId = this.eventId;
    });
    this.getEventDetailsById();
  }
  getEventDetailsById() {
    this.yachtSearchService.eventDetailsById(this.eventId).subscribe((res: any) => {
      this.eventDetails = res?.eventDetails;
      this.center = {
        lat: res?.latitude,
        lng: res?.longitude
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
    title: this.eventDetails?.boat?.name,
    options: { animation: google.maps.Animation.DROP }
  };
}

handleAddressChange(address: any)
{
  this.EventLocation.location = address.formatted_address;
  this.EventLocation.latitude = address.geometry.location.lat();
  this.EventLocation.longitude = address.geometry.location.lng();
  this.center = {
    lat: this.EventLocation?.latitude,
    lng: this.EventLocation.longitude
  };
  this.addLocationMarker();
}

updateEventLocation() {
  this.service.updateEventLocation(this.EventLocation).subscribe(res => {
    if (res) {
      this.toastr.success("Event Location updated successfully", "Location");
      this.goBack();
    }
    else {
      this.toastr.error("something went wrong!", "Location");
    }

  })
}
}



