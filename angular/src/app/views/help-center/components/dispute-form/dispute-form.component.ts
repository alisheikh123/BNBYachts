import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HelpCenterService } from 'src/app/core/help-center/help-center.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { BookingType } from 'src/app/shared/enums/booking.constants';
import { DisputeReasons } from 'src/app/shared/enums/dispute-reasons';

@Component({
  selector: 'app-dispute-form',
  templateUrl: './dispute-form.component.html',
  styleUrls: ['./dispute-form.component.scss']
})
export class DisputeFormComponent implements OnInit {

  disputeForm: FormGroup;
  isSubmitted: boolean = false;
  DISUPUTE_REASONS = DisputeReasons;
  BOOKING_TYPES = BookingType;
  bookings: any;
  reasons = [{
    id: this.DISUPUTE_REASONS.LostItems,
    name: "Lost items",
  },
  {
    id: this.DISUPUTE_REASONS.CaptainComplaint,
    name: "Captain Complaint",
  },
  {
    id: this.DISUPUTE_REASONS.ServiceIssue,
    name: "Service Issues",
  },
  {
    id: this.DISUPUTE_REASONS.ChangeDatesOrGuests,
    name: "Change dates or guests"
  },
  {
    id: this.DISUPUTE_REASONS.Other,
    name: "Other"
  }
]
  constructor(private fb: FormBuilder, private service: HelpCenterService, private boatService: YachtSearchService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.disputeForm = this.fb.group({
      bookingId: [null, Validators.required],
      reasonId: [null, Validators.required],
      reason: [null, Validators.required],
      status : 0
    });
    this.getBookingLookup();
  }

  getBookingLookup() {
    this.service.getBookingsLookup().subscribe((res: any) => {
      this.bookings = res?.data;
      this.bookings.forEach((element: any) => {
        if (element.bookingType == this.BOOKING_TYPES.Boatels) {
          this.boatService.boatDetailsById(element.bookingTypeId).subscribe((res: any) => {
            element.name = res?.name + '-' + res?.location;
          })
        }
        else if (element.bookingType == this.BOOKING_TYPES.Events) {
          this.boatService.eventDetailsById(element.bookingTypeId).subscribe((res: any) => {
            element.name = res?.eventDetails?.title + '-' + res?.eventDetails?.location;
          })
        }
        else if (element.bookingType == this.BOOKING_TYPES.Charters ) {
          this.boatService.charterDetailsById(element.bookingTypeId).subscribe((res: any) => {
            element.name = res?.charterDetails?.boat?.name + '-' + res?.charterDetails?.departingFrom + '/' + res?.charterDetails?.destination;
          })
        }
      });
    })
  }

  get f() {
    return this.disputeForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.disputeForm.valid) {
      let data = this.disputeForm.value;
      this.service.addDispute(data).subscribe(res => {
        this.isSubmitted = false;
        this.disputeForm.reset();
        this.toastr.success('Dispute sent to admin.Please wait for further processing');
      })
    }
  }
}
