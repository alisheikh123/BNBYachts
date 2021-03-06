import { DisputeStatus } from './../../../shared/interfaces/disputeStatus';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChangeStatus, DisputesData, IDispute } from '../../../shared/interfaces/IDispute';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { ActionComponent } from '../../../shared/common/action/action.component';

@Component({
  selector: 'app-dispute-listing',
  templateUrl: './dispute-listing.component.html',
  styleUrls : ['./dispute-listing.component.scss']
})

export class DisputeListingComponent implements OnInit {
  statusForm : FormGroup;
  public source : IDispute[];
  @ViewChild('content') update : ElementRef;
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
    actions: false,
    columns: {
      bookingType: {
        title: 'Booking Type',
        type: 'string',
      },
      disputeReason: {
        title: 'Dispute Reason',
        type: 'string',
      },
      statusName: {
        title: 'Status',
        type: 'string'
      },
      creationTime: {
        title: 'Complain Date',
        type: 'Date',
        valuePrepareFunction: (creationTime) => {
          return this.datePipe.transform(new Date(creationTime), 'MM/dd/yyyy');
        }
      },
      operation:{
        title:"",
        type: 'custom',
        filter : false,
        renderComponent: ActionComponent,
        onComponentInitFunction:(instance) => {
        instance.actionEmitter.subscribe(row => {
          instance.dataEmitter.subscribe(data => {
            if (row == 'onViewAction') {
              this.onCustomAction(data.id);
            }
            if (row == 'onEditAction') {
              this.openUpdateStatusPage(this.update, data);
            }
          }) 
        });
       }
     }
    },
  };
  constructor(private fb: FormBuilder, private modalService : NgbModal,private userService: DisputesData, 
    private datePipe : DatePipe, private router : Router,private toaster : NbToastrService) {
  }
  ngOnInit() {
    this.statusForm = this.fb.group({
      id : [0],
      status: [null, Validators.required],
    });
  this.filter();
   }
   get statussForm() {
    return this.statusForm.controls;
  }
  filter(){
    this.userService.getDisputesData().subscribe((res) =>{
      this.source = res;
      this.source.forEach(element => {
        if (element.status== this.disputeStatus.Pending) {
          element.statusName = "Pending";
        }else if (element.status == this.disputeStatus.Resolved) {
          element.statusName = "Resolved";
        }else if (element.status == this.disputeStatus.Hold) {
          element.statusName = "Hold";
        }else if (element.status == this.disputeStatus.CancelledByAdmin) {
          element.statusName = "Cancelled By Admin"
        }else if (element.status == this.disputeStatus.CancelledByHost) {
          element.statusName = "Cancelled By Host"
        }
      });
    });    
  }
  onSubmit(){
    let data = this.statusForm.value;
    this.userService.ChangeDisputeStatus(data).subscribe(res =>{
      if (res == true) {
        this.filter();
        this.toaster.primary('Change Status successfully', 'Status');
        this.modalService.dismissAll();
      } else {
        this.toaster.danger('Something wrong.', 'Status');
      }
    })
  }
  onCustomAction(id : number){
    this.router.navigate([`pages/dispute/dispute/${id}`]);
  }
  openUpdateStatusPage(content, dispute : ChangeStatus){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.statusForm.patchValue({
      id : dispute.id,
      status : dispute.status
    });
  }
}
