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
  map: google.maps.Map;
  originPlaceId: string;
  destinationPlaceId: string;
  travelMode: google.maps.TravelMode;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  mapInfoDetails!: any;
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  charterDetails:any;
  charterLocation = {
    Id: 0,
    departingLatitude: 0,
    departingLongitude: 0,
    destinationLatitude: 0,
    destinationLongitude: 0,
    departingFrom: '',
    destination: ''
  }
  locationMarker: any;
  constructor(private activatedRoute: ActivatedRoute,
    private yachtSearchService: YachtSearchService,
    private service: ReservationService,
     private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterId = Number(res['id']);
      this.charterLocation.Id = this.charterId;
    });
    this.getCharterDetailsById();
    this.initMap();
  }
  getCharterDetailsById() {
    this.yachtSearchService.charterDetailsById(this.charterId).subscribe((res: any) => {
      this.charterDetails = res?.charterDetails;
      this.charterLocation.departingFrom = this.charterDetails?.departingFrom;
      this.charterLocation.departingLatitude = this.charterDetails?.departingLatitude;
      this.charterLocation.departingLongitude = this.charterDetails?.departingLongitude;
      this.charterLocation.destination = this.charterDetails?.destination;
      this.charterLocation.destinationLatitude = this.charterDetails?.destinationLatitude;
      this.charterLocation.destinationLongitude = this.charterDetails?.destinationLongitude;
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
  this.charterLocation.departingFrom = address.formatted_address;
  this.charterLocation.departingLatitude = address.geometry.location.lat();
  this.charterLocation.departingLongitude = address.geometry.location.lng();
  this.center = {
    lat: this.charterLocation?.departingLatitude,
    lng: this.charterLocation.departingLongitude
  };
  this.addLocationMarker();
}
handleCharterDestinationAddressChange(address: any)
{
  this.charterLocation.destination = address.formatted_address;
  this.charterLocation.destinationLatitude = address.geometry.location.lat();
  this.charterLocation.destinationLongitude = address.geometry.location.lng();
  this.center = {
    lat: this.charterLocation.destinationLatitude,
    lng: this.charterLocation.destinationLongitude
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

 initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      mapTypeControl: false,
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    }
  );

  this.AutocompleteDirectionsHandler(map);
}

  AutocompleteDirectionsHandler(maps:any) {
    this.map = maps;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(maps);

    const originInput = document.getElementById(
      "origin-input"
    ) as HTMLInputElement;
    const destinationInput = document.getElementById(
      "destination-input"
    ) as HTMLInputElement;
    const modeSelector = document.getElementById(
      "mode-selector"
    ) as HTMLSelectElement;

    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );

    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id: string, mode: google.maps.TravelMode) {
    const radioButton = document.getElementById(id) as HTMLInputElement;

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.routes();
    });
  }

  setupPlaceChangedListener(
    autocomplete: google.maps.places.Autocomplete,
    mode: string
  ) {
    autocomplete.bindTo("bounds", this.map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.routes();
    });
  }

  routes() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}

