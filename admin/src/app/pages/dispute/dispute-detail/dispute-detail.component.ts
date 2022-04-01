import { AuthService } from './../../../core/mock/auth.service';
import { DatePipe } from '@angular/common';
import { IDispute } from './../../../shared/interfaces/IDispute';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DisputesData } from '../../../shared/interfaces/IDispute';
import { BookingType } from '../../../shared/enums/BoatType';
import { DisputeStatus } from '../../../shared/interfaces/disputeStatus';

@Component({
  selector: 'ngx-dispute-detail',
  templateUrl: './dispute-detail.component.html',
  styleUrls: ['./dispute-detail.component.scss']
})
export class DisputeDetailComponent implements OnInit {
  dispute : IDispute; 
  latest_date : string;
  BOOKING_TYPES =BookingType;
  disputeStatus = DisputeStatus;
  reservation : string ;
  constructor(private route : ActivatedRoute ,private authService : AuthService ,private disputeService : DisputesData, private datePipe : DatePipe) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDisputeById(id);
  }
  getDisputeById(id : number){
    this.disputeService.getDisputeById(id).subscribe((res) =>{
      this.latest_date =this.datePipe.transform(new Date( res?.creationTime), 'yyyy-MM-dd');
      this.dispute = res;
      if (this.dispute.status== this.disputeStatus.Pending) {
        this.dispute.statusName = "Pending";
      }else if (this.dispute.status == this.disputeStatus.Resolved) {
        this.dispute.statusName = "Resolved";
      }else if (this.dispute.status == this.disputeStatus.Hold) {
        this.dispute.statusName = "Hold";
      }else if (this.dispute.status == this.disputeStatus.CancelledByAdmin) {
        this.dispute.statusName = "Cancelled By Admin"
      }else if (this.dispute.status == this.disputeStatus.CancelledByHost) {
        this.dispute.statusName = "Cancelled By Host"
      }
      if (this.dispute.bookingType == this.BOOKING_TYPES.Boatel) {
        this.authService.boatDetailsById(this.dispute.bookingType).subscribe((res: any) => {
         this.reservation = res?.name + '-' + res?.location;
        })
      }
      else if (this.dispute.bookingType == this.BOOKING_TYPES.Event) {
        this.authService.eventDetailsById(this.dispute.bookingType).subscribe((res: any) => {
          this.reservation = res?.eventDetails?.title + '-' + res?.eventDetails?.location;
        })
      }
      else if (this.dispute.bookingType == this.BOOKING_TYPES.Charter ) {
        this.authService.charterDetailsById(this.dispute.bookingType).subscribe((res: any) => {
          this.reservation = res?.charterDetails?.boat?.name + '-' + res?.charterDetails?.departingFrom + '/' + res?.charterDetails?.destination;
        })
      }
    });
  }
}
