import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boat-listing',
  templateUrl: './boat-listing.component.html',
  styleUrls: ['./boat-listing.component.scss']
})
export class BoatListingComponent implements OnInit {

  assetsUrl = environment.API_URL+'/boatgallery/';

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
  mapInfoDetails!:any;
  //lat = 31.4697;
  //lng = 74.2728;
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  infoContent = '';
  boats: any[] = [];
  mapDetails: any;
  markers: any[] = [];

  constructor(private yachtSearch: YachtSearchDataService) { }

  ngOnInit(): void {
    this.boats = this.yachtSearch.searchResult?.boatsResult;
    debugger;
    this.mapDetails = this.yachtSearch.searchResult?.mapOptions;
    this.filterMarkers();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.mapDetails?.latitude,
        lng: this.mapDetails?.longitude
      }
    })
  }

  filterMarkers() {
    this.boats.forEach((element: any) => {
      let marker = {
        boatId:element.id,
        position: {
          lat: element.latitude,
          lng: element.longitude

        },
        draggable: false,
        title: element.name,
        options: { animation: google.maps.Animation.DROP }
      };
      this.markers.push(marker);
    });
  }
  openInfoWindow(marker: MapMarker, data: any){
    debugger;
this.mapInfoDetails = this.boats.find(res=>res.id == data?.boatId);
this.infoWindow.open(marker);

  }
}
