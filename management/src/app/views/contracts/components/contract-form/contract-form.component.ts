import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { IContractsTerms } from '../interfaces/contracts-attachments';
import {Location} from '@angular/common';
import { EventService } from 'src/app/core/Event/event.service';
import { ContractStaus } from 'src/app/shared/enums/booking.constants';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {

  contractForm: FormGroup;
  SERVICE_TYPES = BoatServiceType;
  CONTRACT_STATUS = ContractStaus;
  termsAttachments: IContractsTerms[] = [];
  userId: string;
  boats:any[] = [];
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private service: ContractsService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private _location: Location,private boatService:EventService) {
    this.activatedRoute.params.subscribe(res => {
      this.userId = res['userId'];
    });
  }

  ngOnInit(): void {
    this.getBoats();
    this.buildFormConfiguration();
  }

  buildFormConfiguration() {
    this.contractForm = this.fb.group({
      boatId:[null,Validators.required],
      serviceType: [this.SERVICE_TYPES.Charter, Validators.required],
      noOfGuests: [0, Validators.required],
      description: ['', Validators.required],
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
      hostId: [null],
      userId: [this.userId, Validators.required],
      status: [this.CONTRACT_STATUS.Pending]
    });
    this.addValidation();
  }

  getBoats() {
    this.boatService.getBoats().subscribe((res:any) => {
      this.boats = res;
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
    if (this.f.serviceType.value == this.SERVICE_TYPES.Charter) {
      this.f.departureDate.setValidators(Validators.required);
      this.f.departureFrom.setValidators(Validators.required);
      this.f.destination.setValidators(Validators.required);
      this.f.arrivalDate.setValidators(Validators.required);
      this.f.boatCapacity.setValidators(Validators.required);
      this.f.eventLocation.clearValidators();
      this.f.eventDateTime.clearValidators();
      this.f.eventTitle.clearValidators();
    }
    else {
      this.f.departureDate.clearValidators();
      this.f.arrivalDate.clearValidators();
      this.f.boatCapacity.clearValidators();
      this.f.destination.clearValidators();
      this.f.departureFrom.clearValidators();
      this.f.eventLocation.setValidators(Validators.required);
      this.f.eventDateTime.setValidators(Validators.required);
      this.f.eventTitle.setValidators(Validators.required);
    }
    this.f.departureDate.updateValueAndValidity();
    this.f.arrivalDate.updateValueAndValidity();
    this.f.boatCapacity.updateValueAndValidity();
    this.f.eventLocation.updateValueAndValidity();
    this.f.eventDateTime.updateValueAndValidity();
    this.f.destination.updateValueAndValidity();
    this.f.departureFrom.updateValueAndValidity();
    this.f.eventTitle.updateValueAndValidity();
  }

  submit() {
    this.isSubmitted = true;
    if (this.contractForm.valid) {
      const formData = new FormData();
      formData.append('contractForm', JSON.stringify(this.contractForm.value));
      formData.append('attachments', JSON.stringify(this.termsAttachments));
      this.termsAttachments.forEach((f) => formData.append('files', f.file));
      this.service.addContracts(formData).subscribe(res => {
        this.toastr.success('Contract request sent successfully', "Contracts");
        this._location.back();
      })
    }
  }
  goBack(){
    this._location.back();
  }
}
