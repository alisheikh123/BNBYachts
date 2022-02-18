import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DisputesData, IDispute } from '../../../shared/interfaces/IDispute';

@Component({
  selector: 'app-dispute-listing',
  templateUrl: './dispute-listing.component.html',
  styleUrls : ['./dispute-listing.component.scss']
})

export class DisputeListingComponent implements OnInit {
  public source : IDispute[];
  settings = {
    actions: {
      add: false,
      edit:false,
      delete: false,
      custom: [{ 
        name: 'DisputeDetail', 
        title: '<i class="nb-compose"></i>' }
      ],
      position: 'right'
    },
    columns: {
      bookingType: {
        title: 'Booking Type',
        type: 'string',
      },
      disputeReason: {
        title: 'Dispute Reason',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      creationTime: {
        title: 'Complain Date',
        type: 'Date',
        valuePrepareFunction: (creationTime) => {
          return this.datePipe.transform(new Date(creationTime), 'MM/dd/yyyy');
        }
      },
    },
  };
  constructor(private userService: DisputesData, private datePipe : DatePipe, private router : Router) {
   
  }
  ngOnInit() {
  this.filter();
   }
  filter(){
    this.userService.getDisputesData().subscribe((res) =>{
      this.source = res;
    });    
  }
  onCustomAction(event){
    this.router.navigate([`pages/dispute/dispute/${event.data.id}`]);
  }
}
