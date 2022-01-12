import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(config: NgbRatingConfig, private reservationService: ReservationListsService, private boatService: YachtSearchService,private router:Router) {
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
      if (this.selectedServiceType == this.bookedServicesTypes.boatel) {
        this.bookedServices.forEach((element: any) => {
          this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
            element.boatDetail = boatdetail;
          });
        });
      }
      else if (this.selectedServiceType == this.bookedServicesTypes.charter) {
        this.bookedServices.forEach((element: any) => {
          this.boatService.charterDetailsById(element.charterId).subscribe((charter: any) => {
            element.boatDetail = charter?.charterDetails?.boat;
            element.charter = charter?.charterDetails;
          });
        });
      }
      else {
        this.bookedServices.forEach((element: any) => {
          this.boatService.eventDetailsById(element.eventId).subscribe((event: any) => {
            element.boatDetail = event?.eventDetails?.boat;
            element.event = event?.eventDetails;
          });
        });
      }
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
  goToDetail(item:any){
    debugger;
    if(this.selectedServiceType == this.bookedServicesTypes.event){
      this.router.navigate(['/boat-listing/event-reservation-detail',item.eventId])
    }
    if(this.selectedServiceType == this.bookedServicesTypes.charter){
      this.router.navigate(['/boat-listing/charter-reservation-detail',item.charterId])
    }
    if(this.selectedServiceType == this.bookedServicesTypes.boatel){
      this.router.navigate(['/boat-listing/reservation-detail',item.id])
    }
  }

}
