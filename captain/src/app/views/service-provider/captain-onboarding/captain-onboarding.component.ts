import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { FileType, ServiceProviderRole, UploadDefault, UserRoles } from 'src/app/shared/enums/user-roles';
import { CaptainBoardingTabs } from 'src/app/shared/enums/yacht-search.constant';
import { FileModel } from 'src/app/shared/interface/service-provider/filemodel';
import { utils } from 'src/app/shared/utility/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-captain-onboarding',
  templateUrl: './captain-onboarding.component.html',
  styleUrls: ['./captain-onboarding.component.scss']
})
export class CaptainOnboardingComponent implements OnInit {
captainOnBoardingForm: FormGroup;
  ONBOARDING_TABS = CaptainBoardingTabs;
  USER_DEFAULTS = UploadDefault;
  currentTab = this.ONBOARDING_TABS.Registeration;
  uploadDefault = UploadDefault;
  captainCalendar = {
    fromDate: new Date(),
    toDate: new Date(),
  };
  minDate = new Date();
  isAgree: boolean = false;
  file:File | null = null;
  user_Roles=ServiceProviderRole;
  service_ProviderType=ServiceProviderType;
  filetype=FileType;
  fileModel:FileModel=<FileModel>{};
  constructor( private router: Router,
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private  _serviceProvider : ServiceProviderService
) { }

  ngOnInit(): void {
    this.buildFormConfiguration();
  
  }
  buildFormConfiguration() {
    this.captainOnBoardingForm = this.fb.group({
      location: [null, Validators.required],
      latitude: [],
      longitude: [],
      bio: ['', Validators.required],
      experience: [null , Validators.required],
      fee: [null, Validators.required],
      paymentOption: ['1'],
      accountName: ['', Validators.required],
      bankName: ['', Validators.required],
      zipCode: ['', Validators.required],
      swift: ['', Validators.required],
      iban: ['', Validators.required], 
      supportiveDoc:[''],    
      timeSlots: new FormArray([]),

    });
    let item = this.fb.group({
      time:new Date
    });
      this.timeSlots.push(item);
  }
  get captainForm() {
    return this.captainOnBoardingForm.controls;
  }
  incrementTab(){
    this.currentTab =  this.currentTab + 1;
  }
  decrementTab(){
    this.currentTab =  this.currentTab - 1;
  }
  addTime(){
    let item = this.fb.group({
      time:new Date
    });
      this.timeSlots.push(item);
  }
 get timeSlots() {
    return this.captainOnBoardingForm.get('timeSlots') as FormArray;
 }
 handleAddressChange(address: any) {
  this.captainOnBoardingForm.controls.location.setValue(address.formatted_address);
  this.captainOnBoardingForm.controls.latitude.setValue(address.geometry.location.lat());
  this.captainOnBoardingForm.controls.longitude.setValue(address.geometry.location.lng());
}
  changeCalendar(item: any) {
    this.captainCalendar.fromDate = item.startDate;
    this.captainCalendar.toDate = item.endDate;

  }
  public restrictNumeric(e: any) {
    utils.restrictNumeric(e);
  }
  get captionForm() {
    return this.captainOnBoardingForm.controls;
  }
  registerStepValidation(){
    if( this.captainForm.location.value == null ||
    this.captainForm.bio.value =='' ||
    this.captainForm.experience.value <=0 ){
      return false;
    }
    return true;
  }
  captainStepValidation(){
    if(this.captainForm.fee.value<=0)
    {
      return false;
    }
    return true;
  }
  bankStepValidation(){
    if(this.captainForm.accountName.value ==''
    || this.captainForm.bankName.value ==''
    || this.captainForm.zipCode.value ==''
    || this.captainForm.iban.value == ''
    || this.captainForm.swift.value =='' )
    {
return false;
    }
    return true;
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
     if( !this.isValidFile(event.target.files[0]))
     {
      this.toastr.error("File is not valid. please upload a PDF file.","Supportive Document")
     }
     else {
      this.fileModel.file = event.target.files[0];
      this.fileModel.type=this.filetype.PDF;
      this.captainOnBoardingForm.get('supportiveDoc')?.setValue(this.fileModel.file?.name);   
      this.toastr.error("Supportive Document added successfully","Supportive Document")
    }
  }
  }
  isValidFile(file:any){
    if(file.type == "application/pdf") {
      return true;
     
    }
    return false;
  }
  supportDocumentStepValidation()
  {
    return (!this.fileModel) ? false  : true;
  }
  submit(){
    let formData: FormData;
    formData = new FormData();
    let data= this.captainOnBoardingForm.value;
    data.fromDate = this.captainCalendar.fromDate;
    data.toDate=this.captainCalendar.toDate;
    data.serviceProviderType=this.service_ProviderType.captain;
    if(this.fileModel)
    {
    formData.append(this.fileModel.type, this.fileModel.file);
    }
    formData.append('seviceproviderdata', JSON.stringify(data));
    this._serviceProvider.addServiceProviderRole(this.user_Roles.captain).subscribe((res:any)=>{
      if(res)
      {
        this._serviceProvider.createServiceProvider(formData).subscribe((res: any) => {
          if (res.returnStatus) {
            this.toastr.success("Captain Onboarding Completed!", "Service Provider");
            this.router.navigate(['service-provider/service-provider-dashboard'])
          }
        });
      }
    },
    err=>{
      this.toastr.error(err);
    });
  }
  
}
