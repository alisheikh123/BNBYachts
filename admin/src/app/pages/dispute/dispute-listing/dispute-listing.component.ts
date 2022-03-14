import { DisputeStatus } from './../../../shared/interfaces/disputeStatus';
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
  disputeStatus = DisputeStatus;
  reasons = [{
    id: this.disputeStatus.Pending,
    name: "Pending",
  },
  {
    id: this.disputeStatus.Resolved,
    name: "Resolved",
  },
  {
    id: this.disputeStatus.Hold,
    name: "Hold",
  },
  {
    id: this.disputeStatus.CancelledByAdmin,
    name: "Cancelled By Admin"
  },
  {
    id: this.disputeStatus.CancelledByHost,
    name: "Cancelled By Host"
  },
]
  settings = {
    actions: {
      add: false,
      edit:false,
      delete: false,
      custom: [{
        name: 'Detail',
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
        type: 'list',
        editor: {
          type: 'list', 
          config: {
            list: []
            // this.reasons && this.reasons.forEach(res =>{
            // }),
          },
        },
        filter: true
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
      this.settings.columns.status.editor.config.list = []; // Clear role list 
      var settingList: any = [];
      // Call API Hear 
      this.reasons.forEach(res =>{
        settingList.push({ value: res.id, title: res.name });
      })
      let newSettings = this.settings;
      newSettings.columns.status.editor.config.list = settingList;
      this.settings = Object.assign({}, newSettings);
    });    
  }
  onCustomAction(event){
    this.router.navigate([`pages/dispute/dispute/${event.data.id}`]);
  }
}
