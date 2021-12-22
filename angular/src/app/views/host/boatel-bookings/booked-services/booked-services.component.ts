import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-booked-services',
  templateUrl: './booked-services.component.html',
  styleUrls: ['./booked-services.component.scss']
})
export class BookedServicesComponent implements OnInit {
  bookedServices: any;
  bookedServicesTypes = {
    boatel: 1,
    charter: 2,
    event: 3
  };
  totalRecords: number = 0;
  queryParams = {
    page: 1,
    pageSize: 5
  };
  selectedServiceType: number = 1;
  constructor(config: NgbRatingConfig, private reservationService: ReservationListsService, private boatService: YachtSearchService) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getBookedServices();
  }


  getBookedServices() {
    this.reservationService.getBookedServices(this.selectedServiceType, this.queryParams.page, this.queryParams.pageSize).subscribe((res: any) => {
      this.bookedServices = res?.data;
      this.totalRecords = res?.totalCount
      this.bookedServices.forEach((element: any) => {
        this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
          element.boatDetail = boatdetail;
        });
      });
    })
  }

  filterServiceType(serviceType: number) {
    this.selectedServiceType = serviceType;
    this.getBookedServices();
  }

  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getBookedServices();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getBookedServices();
  }

}
