import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/core/Event/event.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  eventId: number;
  eventEditForm: FormGroup;
  eventRes: any;
  boatExistingEventDates :any;
  boats: any[];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.eventId = Number(res['id']);
    });
    this.getBoats();
    this.getEvent();
  }

  getBoats() {
    this.eventService.getBoats().subscribe((boatList:any) => {
      this.boats = boatList;
    })
  }

  getEvent(){  
    this.eventService.getEventById(this.eventId).subscribe((res:any) => {
      this.eventRes = res;
      this.buildFormConfiguration()
    });
    this.getBoatBookedDates();
  }

  buildFormConfiguration() {
    this.eventEditForm = this.fb.group({
      id: [this.eventId],
      boatId: [this.eventRes?.data.boatId, Validators.required],
      locationLat: [this.eventRes?.data.locationLat],
      locationLong: [this.eventRes?.data.locationLong],
      location: [this.eventRes?.data.location, Validators.required],
      title: [this.eventRes?.data.title, Validators.required],
      description: [this.eventRes?.data.description, Validators.required],
      guestCapacity: [this.eventRes?.data.guestCapacity, Validators.required],
      startDateTime: [this.eventRes?.data.startDateTime, Validators.required],
      amountPerPerson: [this.eventRes?.data.amountPerPerson, Validators.required],
      eventType: [this.eventRes?.data.eventType, Validators.required],
      isActive:[this.eventRes?.data.isActive]
    });
  }  

  get form() { return this.eventEditForm.controls; }
  getBoatBookedDates() {
    if(this.eventRes?.data.boatId != null) {
        this.eventService.getBoatBookedDates(this.eventRes?.data.boatId).subscribe((res:any) => {
        this.boatExistingEventDates = res?.bookedDates;
      })
    }    
  }
  
  removeGuests() {
    if(this.eventEditForm.controls.guestCapacity.value > 1) {
      this.eventEditForm.controls.guestCapacity.setValue(this.eventEditForm.controls.guestCapacity.value - 1);
    }
  }

  addGuests() {
    this.eventEditForm.controls.guestCapacity.setValue(this.eventEditForm.controls.guestCapacity.value + 1);
  }

  handleEventLocationChange(address: any) {
    this.eventEditForm.controls.location.setValue(address.formatted_address);
    this.eventEditForm.controls.locationLat.setValue(address.geometry.location.lat());
    this.eventEditForm.controls.locationLong.setValue(address.geometry.location.lng());
  }

  onRenderCell(args: any) {
    if(this.boatExistingEventDates){
      let find = this.boatExistingEventDates.findIndex((res:any)=> new Date(res).toLocaleDateString() == new Date(args.date).toLocaleDateString());
      if (find >= 0) {
        args.isDisabled = true;
      }  
    }

  }  

  updateEvent() {
    if (this.eventEditForm.valid) {
      let data = this.eventEditForm.value;
      this.eventService.updateEvent(data).subscribe(res => {
        if(res) {
          this.toastr.success("Event Updated Successfully!", "Event Update");
          this.router.navigate(['/host/host-boat-listing']);
       }
      })
    }    
  }  
}

