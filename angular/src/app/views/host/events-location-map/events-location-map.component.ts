import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ServiceTypes } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';
import { NoFoundModalComponent } from '../../home/components/no-found-modal/no-found-modal.component';

@Component({
  selector: 'app-events-location-map',
  templateUrl: './events-location-map.component.html',
  styleUrls: ['./events-location-map.component.scss']
})
export class EventsLocationMapComponent implements OnInit {

  
  cityName: string;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  boatDetails: any;
  mapOptions: google.maps.MapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 18,
    minZoom: 3,
  };
  YachtTypes = ServiceTypes;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  mapInfoDetails!: any;
  zoom = 11;
  center: [google.maps.LatLngLiteral];
  locationMarker: any;
  markLocation : any =[];
  constructor(private activatedRoute: ActivatedRoute, private modal: NgbModal,
    private yachtSearchService: YachtSearchService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.cityName = res['city'];
    });
    this.getBoatDetails();
  }
  openInfoWindow(marker: MapMarker, data: any) {
    this.mapInfoDetails = this.boatDetails.find((res: any) => res.id == data?.eventId);
    this.infoWindow.open(marker);
  }
  getBoatDetails() {
    this.yachtSearchService.getEventsListByCity(this.cityName).subscribe((res: any) => {
      if(res?.data?.length > 0) {
      this.boatDetails = res.data;
      this.boatDetails.forEach((element: any) => {
        this.center = [{
          lat: element?.locationLat,
          lng: element?.locationLong,
        }];
        ///Location Marker
      });
      this.addLocationMarker();
    }
    else {
        let modalRef = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true });
        modalRef.componentInstance.yachtType = this.YachtTypes.event;
      }
    })
  }

  addLocationMarker() {
    this.boatDetails.forEach((marke : any) => {
      this.locationMarker = {
      eventId: marke.id,
      position: {
        lat: marke?.locationLat,
        lng: marke?.locationLong

      },
      draggable: false,
      title: marke.title,
      options: { animation: google.maps.Animation.DROP }
      }
      this.markLocation.push(this.locationMarker);
    });
  }
  goBack() {
    this.route.navigate(['/']);
  }


}
