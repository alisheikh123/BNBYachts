import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDatepickerConfig, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { EventTypes, ServiceTypes } from 'src/app/shared/enums/yacht-search.constant';
import { NoFoundModalComponent } from '../no-found-modal/no-found-modal.component';

@Component({
  selector: 'app-yacht-search',
  templateUrl: './yacht-search.component.html',
  styleUrls: ['./yacht-search.component.scss']
})
export class YachtSearchComponent implements OnInit {

  boatelSearchParam = {
    location: '',
    latitude: 31.4697,
    longitude: 74.2728,
    checkinDate: null,
    checkoutDate: null,
    adults: 0,
    childrens: 0
  };
  minDate = {year: 0, month: 0, day: 0};
  charterSearchParam = {
    departureLoc: '',
    departureLatitude: 31.4697,
    departureLongitude: 74.2728,
    destinationLoc: '',
    destinationLatitude: 31.4697,
    destinationLongitude: 74.2728,
    departureDate: null,
    adults: 0,
    childrens: 0
  };

  EVENT_TYPES = EventTypes;
  eventSearchParam = {
    location: '',
    latitude: 31.4697,
    longitude: 74.2728,
    eventDate: null,
    adults: 0,
    childrens: 0,
    eventType: this.EVENT_TYPES.Adults
  };
  popOverFilterData = {
    adults: 0,
    childrens: 0
  }
  currentTab = 1;
  YachtTypes = ServiceTypes;
  isSubmitted = false;
  @ViewChild('popOver') public popover: NgbPopover;


  constructor(private yachtService: YachtSearchService, 
    private router: Router, private yachtSearchResults: YachtSearchDataService,
     private modal: NgbModal) { 
     }

  ngOnInit(): void {

  }

  botelSearch() {
    this.isSubmitted = true;
    if (this.boatelSearchParam.location != '') {
      this.yachtService.boatelSearch(this.boatelSearchParam).subscribe((res: any) => {
        if (res?.length > 0) {
          this.yachtSearchResults.setBoats(res);
          this.yachtSearchResults.setFilters(this.boatelSearchParam);
          this.router.navigate(["/boat-listing/boatel"]);
        }
        else {
          let modalRef = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true });
          modalRef.componentInstance.yachtType = this.YachtTypes.boatel;
        }
      });
    }
  }
  setMaxDate(item:any){
    let date = new Date(item);
    this.boatelSearchParam.checkoutDate = null;
    if(item != null){
     date = new Date(item);
      this.minDate = {year : date.getFullYear(),month:date.getMonth()+1,day:date.getDate()};
    }
  }
  //Address Change
  handleAddressChange(address: any) {
    this.boatelSearchParam.location = address.formatted_address;
    this.boatelSearchParam.latitude = address.geometry.location.lat();
    this.boatelSearchParam.longitude = address.geometry.location.lng();
  }

  openPopover() {
    this.popOverFilterData.adults = this.boatelSearchParam.adults;
    this.popOverFilterData.childrens = this.boatelSearchParam.childrens;
    this.popover.open();
  }
  updateGuests() {
    this.boatelSearchParam.adults = this.popOverFilterData.adults;
    this.boatelSearchParam.childrens = this.popOverFilterData.childrens;
    this.popover.close();
  }
  ///Charter
  updateCharterGuests() {
    this.charterSearchParam.adults = this.popOverFilterData.adults;
    this.charterSearchParam.childrens = this.popOverFilterData.childrens;
    this.popover.close();
  }
  handleCharterAddressChange(address: any, isDeparture: boolean) {
    if (isDeparture) {
      this.charterSearchParam.departureLoc = address.formatted_address;
      this.charterSearchParam.departureLatitude = address.geometry.location.lat();
      this.charterSearchParam.departureLongitude = address.geometry.location.lng();
    }
    else {
      this.charterSearchParam.destinationLoc = address.formatted_address;
      this.charterSearchParam.destinationLatitude = address.geometry.location.lat();
      this.charterSearchParam.destinationLongitude = address.geometry.location.lng();
    }
  }
  charterSearch() {
    this.isSubmitted = true;
    if (this.charterSearchParam.departureLoc && this.charterSearchParam.destinationLoc) {
      this.yachtService.charterSearch(this.charterSearchParam).subscribe((res: any) => {
        if (res?.length > 0) {
          this.yachtSearchResults.setBoats(res);
          this.yachtSearchResults.setFilters(this.charterSearchParam);
          this.router.navigate(["/boat-listing/charter"]);
        }
        else {
          let modalRef = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true });
          modalRef.componentInstance.yachtType = this.YachtTypes.charter;
        }
      });
    }
  }
  ///Events
  updateEventsGuests() {
    this.eventSearchParam.adults = this.popOverFilterData.adults;
    this.eventSearchParam.childrens = this.popOverFilterData.childrens;
    this.popover.close();
  }

  handleEventAddressChange(address: any) {
    this.eventSearchParam.location = address.formatted_address;
    this.eventSearchParam.latitude = address.geometry.location.lat();
    this.eventSearchParam.longitude = address.geometry.location.lng();
  }

  eventSearch() {
    this.isSubmitted = true;
    this.yachtService.eventSearch(this.eventSearchParam).subscribe((res: any) => {
      if (res?.length > 0) {
        this.yachtSearchResults.setBoats(res);
        this.yachtSearchResults.setFilters(this.eventSearchParam);
        this.router.navigate(["/boat-listing/events"]);
      }
      else {
        let modalRef = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true });
        modalRef.componentInstance.yachtType = this.YachtTypes.event;
      }
    });
  }

}
