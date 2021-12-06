import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
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
  constructor(private yachtSearch: YachtSearchDataService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.events = this.yachtSearch.getBoats();
    this.mapDetails = this.yachtSearch.getFilters();

    this.filterMarkers();
    this.center = {
      lat: this.mapDetails?.latitude,
      lng: this.mapDetails?.longitude
    };
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

}
