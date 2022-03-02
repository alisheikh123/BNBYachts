import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    latitude: 33.6845673,
    longitude: -117.8265049
  }];
  officesList: any;
  isSubmitted: boolean = false;
  mapInfoDetails!: any;
  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  //Address Change
  handleAddressChange(address: any) {
    this.searchParam.location = address.formatted_address;
    this.searchParam.latitude = address.geometry.location.lat();
    this.searchParam.longitude = address.geometry.location.lng();
    this.officesList = this.officesLocations.filter(res => res?.latitude == this.searchParam.latitude && res?.longitude == this.searchParam.longitude);
    if (this.officesList?.length == 0) {
      //let modal = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true })
    }
  }
}
