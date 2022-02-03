import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-bnb-google-map',
  templateUrl: './bnb-google-map.component.html',
  styleUrls: ['./bnb-google-map.component.scss']
})
export class BnbGoogleMapComponent implements OnInit {

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
  mapStyles ={
    width:'100%',
    height:'560px'
  }
  markers: any[] = [];
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  @Input() mapData:any;
  @Input() mapLocations:any;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor() { }

  ngOnInit(): void {
    this.center = {
      lat: this.mapLocations.latitude,
      lng: this.mapLocations.longitude
    };
    this.addMarkers();
  }
  addMarkers() {
    debugger;
    this.mapData.forEach((element: any) => {
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
