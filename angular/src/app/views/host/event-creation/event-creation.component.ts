import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/core/Event/event.service';
import { CreatorTypes } from 'src/app/shared/enums/creator-types';
import { EventTypes } from 'src/app/shared/enums/yacht-search.constant';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss']
})
export class EventCreationComponent implements OnInit {

  constructor(private fb: FormBuilder, private eventService: EventService, private toastr: ToastrService,
    private modal: NgbModal, private router: Router) { }

  eventCreationForm: FormGroup;
  boats: any;
  EVENT_TYPES: EventTypes;
  submitted: boolean = false;
  currentTab = 1;
  isAgree: boolean = false;
  boatExistingEventDates: any;
  creatorTypes = CreatorTypes;
  @ViewChild('createEventSuccessModal', { static: true }) templateRef: any;
  minDate = new Date();


  ngOnInit(): void {
    this.buildFormConfiguration();
    this.getBoats();
  }
  buildFormConfiguration() {
    this.eventCreationForm = this.fb.group({
      boatId: [null, Validators.required],
      location: [null, Validators.required],
      locationLat: [],
      locationLong: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      eventType: [1, Validators.required],
      guestCapacity: [0, Validators.required],
      startDateTime: [null, Validators.required],
      amountPerPerson: [0, Validators.required],
      isActive: [true]
    });
  }

  get form() { return this.eventCreationForm.controls; }
  getBoats() {
    this.eventService.getBoats().subscribe(res => {
      this.boats = res;
    });
  }

  getBoatBookedDates() {
    this.eventService.getBoatBookedDates(this.form.boatId.value).subscribe((res: any) => {
      this.boatExistingEventDates = res?.bookedDates;
    })
  }

  addGuests() {
    this.eventCreationForm.controls.guestCapacity.setValue(this.eventCreationForm.controls.guestCapacity.value + 1);
  }

  removeGuests() {
    if (this.eventCreationForm.controls.guestCapacity.value != 0) {
      this.eventCreationForm.controls.guestCapacity.setValue(this.eventCreationForm.controls.guestCapacity.value - 1);
    }
  }

  handleAddressChange(address: any) {
    this.eventCreationForm.controls.location.setValue(address.formatted_address);
    this.eventCreationForm.controls.locationLat.setValue(address.geometry.location.lat());
    this.eventCreationForm.controls.locationLong.setValue(address.geometry.location.lng());
  }
  createEvent() {
    this.submitted = true;
    if (this.eventCreationForm.valid) {
      let data = this.eventCreationForm.value;
      this.eventService.saveEvent(data).subscribe((res: any) => {
        if (res.returnStatus) {
          this.router.navigate(['/service-provider/service-provider-information/', res.data.id, this.creatorTypes.Event]);
          // let modal = this.modal.open(EventCreationSuccessModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal' });
          // modal.componentInstance.data = this.eventCreationForm.value;
        }
      })
    }
  }

  onRenderCell(args: any) {
    let find = this.boatExistingEventDates.findIndex((res: any) => new Date(res).toLocaleDateString() == new Date(args.date).toLocaleDateString());
    if (find >= 0) {
      args.isDisabled = true;
    }
  }

  validateStep1 = (form: FormGroup) => {
    return form.get('boatId')?.value == null || form.get('title')?.value == '' || form.get('description')?.value == ''
      || form.get('location')?.value == '' || form.get('guestCapacity')?.value == 0
  }

  validateStep2 = (form: FormGroup) => {
    return form.get('amountPerPerson')?.value == null || form.get('amountPerPerson')?.value == 0 || form.get('startDateTime')?.value == null
  }
}
