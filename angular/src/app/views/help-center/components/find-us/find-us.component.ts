import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelpCenterService } from 'src/app/core/help-center/help-center.service';
import { NoFoundModalComponent } from 'src/app/views/home/components/no-found-modal/no-found-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss']
})
export class FindUsComponent implements OnInit {
  searchParam = {
    location: '',
    latitude: 0,
    longitude: 0
  };
  officesLocations = [{
    name: 'California, USA',
    latitude: 36.778261,
    longitude: -119.4179324
  }];
  officesList: any;

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
  markers: any[] = [];
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  isSubmitted: boolean = false;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  mapInfoDetails!: any;
  constructor(private service: HelpCenterService, private modal: NgbModal) { }

  ngOnInit(): void {
  }

  //Address Change
  handleAddressChange(address: any) {
    this.searchParam.location = address.formatted_address;
    this.searchParam.latitude = address.geometry.location.lat();
    this.searchParam.longitude = address.geometry.location.lng();
    this.officesList = this.officesLocations.filter(res => res?.latitude == this.searchParam.latitude && res?.longitude == this.searchParam.longitude);
    if (this.officesList?.length > 0) {
      this.center = {
        lat: this.searchParam.latitude,
        lng: this.searchParam.longitude
      }
      this.addMarkers();
    }
    else {
      let modal = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true })
    }
  }

  addMarkers() {
    this.officesList.forEach((element: any) => {
      let marker = {
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
}
