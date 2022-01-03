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
    this.buildFormConfiguration();
    this.getEvent();
    this.getBoats();
  }

  eventId: number;
  eventLookup: any;
  boatExistingEventDates :any;
  eventEditForm: FormGroup;
  boats: any[];
  boatId: number;
  submitted: boolean = false;

  buildFormConfiguration() {
    this.eventEditForm = this.fb.group({
      id: [0],
      locationLat: [],
      locationLong: [],
      location: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      guestCapacity: [1, Validators.required],
      startDateTime: [new Date(), Validators.required],
      endDateTime: [new Date(), Validators.required],
      amountPerPerson: [0, Validators.required],
      eventType: [0, Validators.required],
      boatId: [null, Validators.required],
      isActive:[true]
    });
  }

  get form() { return this.eventEditForm.controls; }

  getEvent(){
    this.eventService.getEventById(this.eventId).subscribe((res:any) => {
      this.eventEditForm.setValue({
        id: this.eventId,
        locationLat: res?.data.locationLat,
        locationLong: res?.data.locationLong,
        location: res?.data.location,
        title: res?.data.title,
        description: res?.data.description,
        guestCapacity: res?.data.guestCapacity,
        startDateTime: res?.data.startDateTime,
        endDateTime: res?.data.endDateTime,
        amountPerPerson: res?.data.amountPerPerson,
        eventType: res?.data.eventType,
        boatId: res?.data.boatId,
        isActive:res?.data?.isActive
      });
      this.getBoatBookedDates();
    })
  }

  getBoatBookedDates() {
    if(this.form.boatId.value != null) {
      this.eventService.getBoatBookedDates(this.form.boatId.value).subscribe((res:any) => {
        this.boatExistingEventDates = res?.bookedDates;
      })
    }    
  }

  getBoats() {
    this.eventService.getBoats().subscribe((boatList:any) => {
        this.boats = boatList
    })
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

  checkFormValidation() {
    if(
      (this.form.id.value != 0 || this.form.id.value != '') &&
      (this.form.location.value != null || this.form.location.value != '') &&
      (this.form.title.value != null || this.form.title.value != '') &&
      (this.form.description.value != null || this.form.description.value != '') &&
      (this.form.guestCapacity.value != null || this.form.guestCapacity.value != '') &&
      (this.form.startDateTime.value != null || this.form.startDateTime.value != '') &&
      (this.form.endDateTime.value != null || this.form.endDateTime.value != '') &&
      (this.form.amountPerPerson.value != null || this.form.amountPerPerson.value != '') &&
      (this.form.eventType.value != null || this.form.eventType.value != '') &&
      (this.form.boatId.value != null || this.form.boatId.value != '')
      )
      {
        this.submitted = true;
      }
      return this.submitted
  }

  goBack() {
    this.router.navigate(['/host/host-boat-listing']);
  }

  updateEvent() {
    if (this.eventEditForm.valid && this.checkFormValidation()) {
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

