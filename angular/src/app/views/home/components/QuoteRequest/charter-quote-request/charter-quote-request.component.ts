import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ChatService } from 'src/app/core/chat/chat.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { QuoteServiceTypes } from 'src/app/shared/enums/quote-constants';

@Component({
  selector: 'app-charter-quote-request',
  templateUrl: './charter-quote-request.component.html',
  styleUrls: ['./charter-quote-request.component.scss']
})
export class CharterQuoteRequestComponent implements OnInit {

  requestQuoteForm: FormGroup;
  hostId: string;
  boatId: number;
  SERVICE_TYPES = QuoteServiceTypes;
  senderId: string;
  boatDetails:any;
  isSubmitted:boolean =false;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private router:Router,
    private boatService: YachtSearchService, private chatService: ChatService) {
    this.boatId = this.activatedRoute.snapshot.params['boatId'];
    this.senderId = localStorage.getItem('userId')?.toString() || "";
  }

  ngOnInit(): void {
    this.getBoatDetails();
    this.quoteReqestFormBuild();
  }
  quoteReqestFormBuild() {
    this.requestQuoteForm = this.fb.group({
      serviceType: [1, Validators.required],
      eventType: [1],
      eventDateTime: [],
      guestCapacity: [0, Validators.required],
      departingLatitude: [],
      departingLongitude: [],
      destinationLatitude: [],
      destinationLongitude: [],
      destination: [null, Validators.required],
      departureFromDate: [new Date(), Validators.required],
      departureToDate: [new Date(), Validators.required],
      isRoundTrip: [false],
      departingFrom: [null],
      returnDate: [new Date()],
      boatId: [0, Validators.required],
      otherRequirments: []
    });
  }
  get formControl() {
    return this.requestQuoteForm.controls;
  }
  addGuests() {
    this.requestQuoteForm.controls.guestCapacity.setValue(this.requestQuoteForm.controls.guestCapacity.value + 1);
  }

  removeGuests() {
    if (this.formControl.guestCapacity.value > 0) {
      this.requestQuoteForm.controls.guestCapacity.setValue(this.requestQuoteForm.controls.guestCapacity.value - 1);
    }
  }
  handleAddressChange(address: any, isDeparture: boolean) {
    if (isDeparture) {
      this.formControl.departingFrom.setValue(address.formatted_address);
      this.formControl.departingLatitude.setValue(address.geometry.location.lat());
      this.formControl.departingLongitude.setValue(address.geometry.location.lng());
    }
    else if (!isDeparture) {

      this.formControl.destination.setValue(address.formatted_address);
      this.formControl.destinationLatitude.setValue(address.geometry.location.lat());
      this.formControl.destinationLongitude.setValue(address.geometry.location.lng());
    }
  }

  getBoatDetails() {
    this.boatService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatDetails = res;
    })
  }
  validateForm(){
    if(this.formControl.serviceType.value==this.SERVICE_TYPES.Charter){
      if(this.formControl.departingLatitude.value == null || this.formControl.departingLongitude.value == null || 
        this.formControl.destinationLatitude.value ==  null || this.formControl.destinationLongitude.value ==  null 
        || this.formControl.departureFromDate.value == null  || this.formControl.departureToDate.value == null){
          return true;
        }
        else{
          return false;
        }
    }
    else if(this.formControl.serviceType.value==this.SERVICE_TYPES.Event && this.formControl.eventDateTime.value == null){
          return true;
    }
    return false;
  }

  sendQuote() {
    this.isSubmitted = true;
    if(!this.validateForm()){
      let message = '<b>Boat Name:</b>'+this.boatDetails.name +'<br/>';
      if (this.formControl.serviceType.value == this.SERVICE_TYPES.Charter) {
        message = message+ '<b>Departure:</b>' + this.formControl.departingFrom.value + '<br />' +
          '<b>Destination:</b>' + this.formControl.destination.value + '<br/>' +
          '<b>Departure Date:</b>' + moment(this.formControl.departureFromDate.value).format("DD-MMM-YYYY hh:mm a") + '<br/>' +
          '<b>Arrival Date:</b>' + moment(this.formControl.departureToDate.value).format("DD-MMM-YYYY hh:mm a") + '<br/>' +
          '<b>Number Of Guests:</b>' + this.formControl.guestCapacity.value + '<br/>' +
          this.formControl.isRoundTrip.value ? 
          '<b>Return Date & Time:</b>' + moment(this.formControl.returnDate.value).format("DD-MM-YYYY") + '<br/>':'' +
          '<b>Other Requirements:</b>' + this.formControl.otherRequirments.value + '.';
      }
      else {
        message = message+ '<b>Event Type:</b>' + (this.formControl.eventType.value == 1 ? 'Adult':'Family') + '<br/>' +
          '<b>Event Date & Time:</b>' + moment(this.formControl.eventDateTime.value).format("DD-MMM-YYYY hh:mm a") + '<br/>' +
          '<b>Guest Capacity:</b>' + this.formControl.guestCapacity.value + '<br/>' +
          '<b>Other Requirments:</b>' + this.formControl.otherRequirments.value + '.';
      }
      let chat = {
        senderId: this.senderId,
        receiverId: this.boatDetails?.creatorId,
        message: message,
        user:''
      };
      this.chatService
        .broadcastMessage(chat)
        .subscribe((data: any) => {
          this.router.navigate(['/chat', this.boatDetails?.creatorId]);
        });
    }

  }
}
