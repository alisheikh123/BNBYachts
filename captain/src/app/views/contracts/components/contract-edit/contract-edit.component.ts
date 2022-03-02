import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { EventService } from 'src/app/core/Event/event.service';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { ContractStaus } from 'src/app/shared/enums/booking.constants';
import { IContractsTerms } from '../interfaces/contracts-attachments';
import {Location} from '@angular/common';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})
export class ContractEditComponent implements OnInit {

  contractForm: FormGroup;
  SERVICE_TYPES = BoatServiceType;
  CONTRACT_STATUS = ContractStaus;
  termsAttachments: IContractsTerms[] = [];
  boats: any[] = [];
  isSubmitted: boolean = false;
  contractId: number;
  contract: any;
  userId :string;
  
  constructor(private fb: FormBuilder, private service: ContractsService,private localStorage:LocalStoreService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private router:Router,
    private _location: Location, private boatService: EventService) {
    this.activatedRoute.params.subscribe(res => {
      this.contractId = res['contractId'];
    });
    this.userId = this.localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadContractDetails() {
    this.service.getContractById(this.contractId).subscribe((res: any) => {
      this.contract = res.data;
      this.contractForm = this.fb.group({
        id: [this.contract.id],
        boatId: [this.contract.boatId, Validators.required],
        serviceType: [this.contract.serviceType, Validators.required],
        noOfGuests: [this.contract.noOfGuests, Validators.required],
        description: [this.contract.description, Validators.required],
        terminationClause: [this.contract.terminationClause, Validators.required],
        departureFrom: [this.contract.departureFrom],
        destination: [this.contract.destination],
        eventDateTime: [this.contract.eventDateTime, Validators.required],
        eventLocation: [this.contract.eventLocation, Validators.required],
        departureDate: [this.contract.departureDate],
        arrivalDate: [this.contract.arrivalDate],
        returnDate: [this.contract.isRoundTrip ? this.contract.returnDate:null],
        eventTitle: [this.contract.eventTitle],
        isRoundTrip: [this.contract.isRoundTrip],
        boatCapacity: [this.contract.boatCapacity],
        qouteAmount: [this.contract.qouteAmount, Validators.required],
        serviceProviderId: [this.contract.serviceProviderId],
        hostId: [this.contract?.hostId],
        userId: [this.contract?.userId, Validators.required],
        status: [this.CONTRACT_STATUS.Pending]
      });
      this.addValidation();
    })
  }

  loadData() {
    this.boatService.getBoats().subscribe((res: any) => {
      this.boats = res;
      this.loadContractDetails();
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
    this.contract?.contractTerms.push(item);
  }
  removeAttachment(index: number) {
    this.contract.contractTerms.splice(index,1);
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
      formData.append('attachments', JSON.stringify(this.contract.contractTerms));
      this.termsAttachments.forEach((f) => formData.append('files', f.file));
      this.service.editContracts(formData).subscribe(res => {
        this.toastr.success('Contract request re-sent successfully', "Contracts");
        this._location.back();
      })
    }
  }
  goBack() {
    this._location.back();
  }
}
