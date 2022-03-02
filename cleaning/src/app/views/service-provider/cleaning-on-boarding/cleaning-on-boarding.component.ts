import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { type } from 'os';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { FileType, ServiceProviderRole, UploadDefault } from 'src/app/shared/enums/user-roles';
import { CleaningBoardingTabs } from 'src/app/shared/enums/yacht-search.constant';
import { FileModel } from 'src/app/shared/interface/service-provider/filemodel';
import { utils } from 'src/app/shared/utility/utils';

@Component({
  selector: 'app-cleaning-on-boarding',
  templateUrl: './cleaning-on-boarding.component.html',
  styleUrls: ['./cleaning-on-boarding.component.scss']
})
export class CleaningOnBoardingComponent implements OnInit {
  files= []as Array<FileModel>;
  managementOnBoardingForm : FormGroup;
  ONBOARDING_TABS = CleaningBoardingTabs;
  USER_DEFAULTS = UploadDefault;
  currentTab = this.ONBOARDING_TABS.Registeration;
  uploadDefault = UploadDefault;
  isAgree: boolean = false;
  file:File | null = null;
  imageFile:File | null = null;
  imageSrc:string ='../../../../assets/images/no-img.png';
  user_Roles=ServiceProviderRole;
  filetype= FileType;
  service_ProviderType=ServiceProviderType;
  constructor( private router: Router,
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private  _serviceProvider : ServiceProviderService
) { }

  ngOnInit(): void {
    this.buildFormConfiguration();
  }
  buildFormConfiguration() {
    this.managementOnBoardingForm = this.fb.group({
      location: [null, Validators.required],
      latitude: [],
      longitude: [],
      bio: ['', Validators.required],
      companyName: ['', Validators.required],
      experience: [null , Validators.required],
      description: ['', Validators.required],
      accountName: ['', Validators.required],
      bankName: ['', Validators.required],
      zipCode: ['', Validators.required],
      swift: ['', Validators.required],
      iban: ['', Validators.required], 
      supportiveDoc:[''],  
      companyProfilePicture :[''] 
    });
    
  }
  get managementForm() {
    return this.managementOnBoardingForm.controls;
  }
  handleAddressChange(address: any) {
    this.managementOnBoardingForm.controls.location.setValue(address.formatted_address);
    this.managementOnBoardingForm.controls.latitude.setValue(address.geometry.location.lat());
    this.managementOnBoardingForm.controls.longitude.setValue(address.geometry.location.lng());
  }
  registerStepValidation(){
    if(this.managementForm.location.value == null ||
    this.managementForm.bio.value =='' 
    || this.managementForm.companyName.value == ''
    ||
    this.managementForm.experience.value <=0 ){
      return false;
    }
    return true;
  }
  bankStepValidation(){
    if(this.managementForm.accountName.value ==''
    || this.managementForm.bankName.value ==''
    || this.managementForm.zipCode.value ==''
    || this.managementForm.iban.value == ''
    || this.managementForm.swift.value =='' )
    {
return false;
    }
    return true;
  }
  descriptionStepValidation(){
  return   this.managementForm.description.value== ''?  false  :true;
    
  }
  companyProfileStepValidation()
  {
    return (this.imageFile == undefined || this.imageFile == null )? false: true;
  }
  supportDocumentStepValidation()
  {
    return (this.file == undefined  ||  this.file == null) ?  false : true;
  }
  incrementTab(){
    this.currentTab =  this.currentTab + 1;
  }
  decrementTab(){
    this.currentTab =  this.currentTab - 1;
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
     if( !this.isValidFile(event.target.files[0]))
     {
      this.toastr.error("File is not valid. please upload a PDF file.","Supportive Document")
     }
     else {
      this.file = event.target.files[0];
      this.managementOnBoardingForm.get('supportiveDoc')?.setValue(this.file?.name); 
     let fileModel:FileModel=<FileModel>{};
      fileModel.type=this.filetype.PDF;
        fileModel.file=this.file
        this.files.push(fileModel)  
      this.toastr.error("Supportive Document added successfully","Supportive Document")
    }
  }
  }
  onImageChange(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
       let  fileModel:FileModel=<FileModel>{};
        fileModel.type=this.filetype.Image;
        fileModel.file=this.imageFile
        this.files.push(fileModel)
        this.managementOnBoardingForm.get('companyProfilePicture')!.setValue(this.imageFile?.name);
      }
    }
  }
  isValidFile(file:any){
    if(file.type == "application/pdf") {
      return true;
     
    }
    return false;
  }
  public restrictNumeric(e: any) {
    utils.restrictNumeric(e);
  }
  submit(){
    let formData: FormData;
    formData = new FormData();
    let data= this.managementOnBoardingForm.value;
    data.serviceProviderType= this.service_ProviderType.cleaning;
if(this.files!==undefined && this.files?.length > 0)
{ this.files.forEach((item:FileModel)=> {
    formData.append(item.type, item.file)
});
}
    formData.append('seviceproviderdata', JSON.stringify(data));
     this._serviceProvider.addServiceProviderRole(this.user_Roles.management).subscribe((res:any)=>{
      if(res.returnStatus)
      {
        this._serviceProvider.createServiceProvider(formData).subscribe((res: any) => {
          if (res.returnStatus) {

            this.toastr.success("Cleaning Onboarding Completed!", "Service Provider");
            this.router.navigate(['service-provider/service-provider-dashboard'])
          }
         
        },
        err=>{
          this.toastr.error(err);
        });
       }
     });
  }
}

