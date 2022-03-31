import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { IContractsTerms } from '../interfaces/contracts-attachments';
import {Location} from '@angular/common';
import { EventService } from 'src/app/core/Event/event.service';
import { ContractStaus } from 'src/app/shared/enums/booking.constants';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { CharterService } from 'src/app/core/Charter/charter.service';
import { BoatCharterDTO } from 'src/app/shared/interface/boatcharter';
import { BoatEventDTO } from 'src/app/shared/interface/boatevent';
import { Keys } from 'src/app/shared/localstoragekey/LocalKeys.constants';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {
  keys=Keys;
  contractForm: FormGroup;
  SERVICE_TYPES = BoatServiceType;
  CONTRACT_STATUS = ContractStaus;
  termsAttachments: IContractsTerms[] = [];
  charters=[]as Array<BoatCharterDTO>;
  events=[]as Array<BoatEventDTO>;
  userId: string;
  boats:any[] = [];
  isSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private service: ContractsService,
    private _serviceProviderService:ServiceProviderService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private _location: Location,private boatService:EventService,
    private _charterService: CharterService ,
   private _router: Router ) {
    this.activatedRoute.params.subscribe(res => {
      this.userId = res['userId'];
    });
  }

  ngOnInit(): void {
    
    this.getBoats();
    this.buildFormConfiguration();
    this.getServiceProvider();
  }

  buildFormConfiguration() {
    let currentuserId=localStorage.getItem(this.keys.UserId);
    this.contractForm = this.fb.group({
      boatId:[null,Validators.required],
      serviceType: [this.SERVICE_TYPES.Charter, Validators.required],
       noOfGuests: [0, Validators.required],
       description: [''],
      departureFrom: [],
      destination: [],
      eventDateTime: [null, Validators.required],
      eventLocation: ['', Validators.required],
      departureDate: [null],
      arrivalDate: [null],
      returnDate: [null],
      eventTitle: [null],
      isRoundTrip: [false],
       boatCapacity: [0],
      qouteAmount: [null, Validators.required],
      serviceProviderId: [0],
      hostId: [this.userId],
      userId: [currentuserId, Validators.required],
      status: [this.CONTRACT_STATUS.Pending],
      noOfDays: [null],
      charterId:[null],
      eventId:[null],
      boatelLocation: ['', Validators.required],
      isCustomType:[false]

    });
    this.addValidation();
  }
getServiceProvider()
{
  this._serviceProviderService.getServiceProviderByUserId().subscribe((res:any)=>{
if(res){
  this.f.serviceProviderId.setValue(res.data.id);
}
  });

}
  getBoats() {
    this.boatService.getBoatsByHostId(this.userId).subscribe((res:any) => {
      this.boats = res;
    });
  }
  onOptionsSelected(boatId: number){
    switch (this.f.serviceType.value) {
      case this.SERVICE_TYPES.Charter:
        this.getCharterByBoatId(boatId);
        break;
        case this.SERVICE_TYPES.Event:
        this.getEventByBoatId(boatId);
          break;
      default:
        break;
    }
  }
  onCharterSelected(charterId : number)
  {
     
   if(charterId==0){
   this.f.isCustomType.setValue(true);
   this.f.departureDate.reset();
   this.f.departureFrom.reset();
   this.f.destination.reset();
   this.f.arrivalDate.reset();
   }
   else {
 let selectedCharter=  this.charters.find(x=> x.id==charterId);
 if(selectedCharter){
  this.f.departureDate.setValue(selectedCharter.departureFromDate);
  this.f.departureFrom.setValue(selectedCharter.departingFrom)
  this.f.destination.setValue(selectedCharter.destination);
  this.f.arrivalDate.setValue(selectedCharter.departureToDate);
 }
   }
  
  }
  onEventSelected(eventId : number)
  {
     
   if(eventId==0){
   this.f.isCustomType.setValue(true);
   this.f.eventTitle.reset();
   this.f.departureFrom.reset();
   this.f.destination.reset();
   this.f.arrivalDate.reset();
   this.f.eventLocation.reset();
   this.f.eventDateTime.reset();
   this.f.description.reset();
   }
   else {
 let selectedEvent=  this.events.find(x=> x.id==eventId);
 if(selectedEvent){
   this.f.eventLocation.setValue(selectedEvent.location);
   this.f.eventDateTime.setValue(selectedEvent.startDateTime)
   this.f.eventTitle.setValue(selectedEvent.title);
   this.f.description.setValue(selectedEvent.description);
 }
   }
  
  }
  getCharterByBoatId(boatId : number){
this._charterService.getCharterByBoatId(boatId).subscribe((res:any)=>{
if(res){
  this.charters=res.data;
  console.log(this.charters);
}
});
  }
  getEventByBoatId(boatId : number){
    this.boatService.getEventByBoatId(boatId).subscribe((res:any)=>{
    if(res){
      this.events=res.data;
      console.log(this.events);
    }
    });
      }
  get f() {
    return this.contractForm.controls;
  }

  addGuests(control: any) {
    control.setValue(control.value + 1);
  }
  removeGuests(control: any) {
    if (control.value > 0) {
      control.setValue(control.value - 1);
    }
  }

  handleDepartingAddress(address: any, control: any) {
    control.setValue(address.formatted_address);
  }

  addAttachment() {
    let item: IContractsTerms = {
      fileName: '',
      title: '',
      file: null
    };
    this.termsAttachments.push(item)
  }
  removeAttachment(index: number) {
    this.termsAttachments.splice(index, 1);
  }

  onFileChoose(event: any, item: IContractsTerms) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        item.fileName = file.name;
        item.file = file;
      }
    }
  }


  addValidation() {
    switch (this.f.serviceType.value) {
      case this.SERVICE_TYPES.Charter:
        this.f.departureDate.setValidators(Validators.required);
      this.f.departureFrom.setValidators(Validators.required);
      this.f.destination.setValidators(Validators.required);
      this.f.arrivalDate.setValidators(Validators.required);
      this.f.charterId.setValidators(Validators.required);
      this.f.eventLocation.clearValidators();
      this.f.eventDateTime.clearValidators();
      this.f.eventTitle.clearValidators();
      this.f.boatelLocation.clearValidators();
      this.f.noOfDays.clearValidators();
      this.valueupdater();
        break;
    case this.SERVICE_TYPES.Event:
      this.f.departureDate.clearValidators();
      this.f.arrivalDate.clearValidators();
      this.f.boatCapacity.clearValidators();
      this.f.destination.clearValidators();
      this.f.departureFrom.clearValidators();
      this.f.boatelLocation.clearValidators();
      this.f.noOfDays.clearValidators();
      this.f.charterId.clearValidators();
      this.f.eventId.setValidators(Validators.required);
      this.f.description.setValidators(Validators.required);
      this.f.eventLocation.setValidators(Validators.required);
      this.f.eventDateTime.setValidators(Validators.required);
      this.f.eventTitle.setValidators(Validators.required);
      this.valueupdater();
      break;
      default:
        break;
    }
    
  }
valueupdater(){
  this.f.departureDate.updateValueAndValidity();
  this.f.arrivalDate.updateValueAndValidity();
  this.f.eventLocation.updateValueAndValidity();
  this.f.eventDateTime.updateValueAndValidity();
  this.f.destination.updateValueAndValidity();
  this.f.departureFrom.updateValueAndValidity();
  this.f.eventTitle.updateValueAndValidity();
  this.f.charterId.updateValueAndValidity();
  this.f.eventId.updateValueAndValidity();
}
  submit() {
    this.isSubmitted = true;
    debugger;
    if (this.contractForm.valid) {
      const formData = new FormData();
     if( this.contractForm.controls.isCustomType) {
       this.contractForm.controls.charterId.setValue(null);
       this.contractForm.controls.eventId.setValue(null);
     } 
      formData.append('contractForm', JSON.stringify(this.contractForm.value));
      formData.append('attachments', JSON.stringify(this.termsAttachments));
      this.termsAttachments.forEach((f) => formData.append('files', f.file));
      this.service.addContracts(formData).subscribe(res => {
        this.toastr.success('Contract request sent successfully', "Contracts");
        this.redirect();
      })
    }
  }
  goBack(){
    this._location.back();
  }
  redirect(){
    this._router.navigate(['/app/reservations/reservation']);
  }
}
