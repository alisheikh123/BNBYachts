import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { YachtTypes } from 'src/app/shared/enums/yacht-search.constant';
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
  popOverFilterData = {
    adults: 0,
    childrens: 0
  }
  currentTab = 1;
  YachtTypes = YachtTypes;
  isSubmitted = false;
  @ViewChild('popOver') public popover: NgbPopover; 


  constructor(private yachtService: YachtSearchService, private router: Router, private yachtSearchResults: YachtSearchDataService, private modal: NgbModal) { }

  ngOnInit(): void {

  }

  botelSearch() {
    this.isSubmitted = true;
    if (this.boatelSearchParam.location != '') {
      this.yachtService.boatelSearch(this.boatelSearchParam).subscribe((res: any) => {
        if (res?.length > 0) {
          this.yachtSearchResults.setBoats(res);
          this.yachtSearchResults.setFilters(this.boatelSearchParam);
          this.router.navigate(["/boat-listing"]);
        }
        else {
          let modalRef = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true });
        }
      });
    }
  }

  charterSearch() {
    this.yachtService.charterSearch(this.boatelSearchParam).subscribe(res => {

    });
  }
  eventSearch() {
    this.yachtService.eventSearch(this.boatelSearchParam).subscribe(res => {

    });
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
}
