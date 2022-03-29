import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ServiceTypes } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';
import { NoFoundModalComponent } from '../../home/components/no-found-modal/no-found-modal.component';

@Component({
  selector: 'app-boats-location-map',
  templateUrl: './boats-location-map.component.html',
  styleUrls: ['./boats-location-map.component.scss']
})
export class BoatsLocationMapComponent implements OnInit {

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

  getBoatDetails() {
    this.yachtSearchService.getBoatListByCity(this.cityName).subscribe((res: any) => {
      if(res?.data?.length > 0)
      {
        this.boatDetails = res.data;
        this.boatDetails.forEach((element: any) => {
          this.center = [{
            lat: element?.latitude,
            lng: element?.longitude,
          }];
        });
        this.addLocationMarker();
      }
      else {
          let modalRef = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true });
          modalRef.componentInstance.yachtType = this.YachtTypes.boatel;
        }
    })
  }
  openInfoWindow(marker: MapMarker, data: any) {
    this.mapInfoDetails = this.boatDetails.find((res: any) => res.id == data?.boatId);
    this.infoWindow.open(marker);
  }
  addLocationMarker() {
    this.boatDetails.forEach((marke : any) => {
      this.locationMarker = {
      boatId: marke.id,
      position: {
        lat: marke?.latitude,
        lng: marke?.longitude

      },
      draggable: false,
      title: marke.name,
      options: { animation: google.maps.Animation.DROP }
      }
      this.markLocation.push(this.locationMarker);
    });
  }
  goBack() {
    this.route.navigate(['/']);
  }


}
