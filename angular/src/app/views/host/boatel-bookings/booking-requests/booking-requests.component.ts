import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ReservationListsService } from 'src/app/core/host/reservation-lists.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ServiceType } from 'src/app/shared/enums/booking.constants';
import { ConfirmDialogComponent } from 'src/app/views/common/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { RejectionModalComponent } from './rejection-modal/rejection-modal.component';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss']
})
export class BookingRequestsComponent implements OnInit {
  date: any;
  selectedYear: string = "";
  selectedMonth: string = "";
  @Input() boatelBookings: any = [];
  selectedServiceType: number = 1;
  SERVICE_TYPES = ServiceType;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  modelDate : Object = new Date();;
  constructor(private reservationService: ReservationListsService, private boatService: YachtSearchService,
    private toastr: ToastrService, config: NgbRatingConfig, private modal: NgbModal,private router:Router) {
    config.max = 5;
    config.readonly = true;
  }
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

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getBoatelBookingRequests(this.selectedServiceType, this.selectedMonth, this.selectedYear,this.queryParams.page,this.queryParams.pageSize).subscribe((res: any) => {
      this.boatelBookings = res?.data;
      this.totalRecords = res?.totalCount;
      if (this.selectedServiceType == this.bookedServicesTypes.boatel) {
        this.boatelBookings.forEach((element: any) => {
          this.boatService.boatDetailsById(element.boatId).subscribe((boatdetail: any) => {
            element.boatDetail = boatdetail;
          });
        });
      }
      else if (this.selectedServiceType == this.bookedServicesTypes.charter) {
        this.boatelBookings.forEach((element: any) => {
          this.boatService.charterDetailsById(element.charterId).subscribe((charter: any) => {
            element.boatDetail = charter?.charterDetails?.boat;
            element.charter =charter?.charterDetails;
          });
        });
      }
      else {
        this.boatelBookings.forEach((element: any) => {
          this.boatService.eventDetailsById(element.eventId).subscribe((event: any) => {
            element.boatDetail = event?.eventDetails?.boat;
            element.event = event?.eventDetails;
          });
        });
      }

    })
  }
  changeStatus(item: any, isAccepted: boolean, index: any) {
    // Get user against which booking has been approved/rejected
    if (isAccepted) {
      let modal = this.modal.open(ConfirmDialogComponent,{centered:true,windowClass: 'custom-modal custom-small-modal' });
      modal.componentInstance.message = 'Are your sure.You want to accept this reservation?'
      modal.componentInstance.onClose.subscribe((res:boolean)=>{
        if(res){
          this.reservationStatusChange(item, isAccepted, index, '');
          modal.dismiss();
        }
        else{
          modal.dismiss();
        }
      })
    }
    else {
      let modal = this.modal.open(RejectionModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal' });
      modal.componentInstance.onSave.subscribe((reason: string) => {
        this.reservationStatusChange(item, isAccepted, index, reason);
        modal.dismiss();
      })
    }

  }

  reservationStatusChange(item: any, isAccepted: boolean, index: any, reason: string) {
    this.reservationService.changeStatus(item.id, isAccepted, reason,this.selectedServiceType).subscribe(res => {
      isAccepted ? this.toastr.success('Request accepted successfully.', 'Success') : this.toastr.success('Request rejected successfully.', 'Success');
      this.boatelBookings.splice(index, 1);
    });
  }
  applyDateFilter(data:any) {
    this.selectedYear = moment(data?.value).format("YYYY");
    this.selectedMonth =  moment(data?.value).format("MM");
    this.getReservations();
  }
  filterServiceType(serviceType: number) {
    this.selectedServiceType = serviceType;
    this.getReservations();
  }
  clearData() {
    this.boatelBookings = null;
  }

  onPageChange(data: any) {
    this.queryParams.page = data.page;
    this.getReservations();
  }
  onPageSizeChange(data: any) {
    this.queryParams.page = 1;
    this.queryParams.pageSize = data.pageSize;
    this.getReservations();
  }

  goToDetail(item:any){
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
