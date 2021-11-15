import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { YachtSearchDataService } from 'src/app/core/yacht-search/yacht-search-data.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
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
  currentTab = 'boatel';
  isSubmitted = false;

  constructor(private yachtService: YachtSearchService, private router: Router, private yachtSearchResults: YachtSearchDataService, private modal: NgbModal) { }

  ngOnInit(): void {

  }

  botelSearch() {
    this.isSubmitted = true;
    this.yachtService.boatelSearch(this.boatelSearchParam).subscribe((res: any) => {
      if (res?.length > 0) {
        this.yachtSearchResults.setBoats(res);
        this.yachtSearchResults.setFilters(this.boatelSearchParam);
        this.router.navigate(["/boat-listing"]);
      }
      else {
        let modalRef = this.modal.open(NoFoundModalComponent, { windowClass: 'custom-modal custom-small-modal modal-dialog-centered'});
      }

      //console.log(res);
    });
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

}
