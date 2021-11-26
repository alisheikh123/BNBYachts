import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnboardingService } from 'src/app/core/host/onboarding.service';
import { BoatTypes, FeaturesTypes, OnBoardingTabs } from 'src/app/shared/enums/yacht-search.constant';
import { validateLocaleAndSetLanguage } from 'typescript';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-host-onboarding',
  templateUrl: './host-onboarding.component.html',
  styleUrls: ['./host-onboarding.component.scss']
})
export class HostOnboardingComponent implements OnInit {

  BOAT_TYPES = BoatTypes;
  boatTypesOptions: any = [];
  ONBOARDING_TABS = OnBoardingTabs;
  currentTab = this.ONBOARDING_TABS.BoatType;
  FEATURES_TYPES = FeaturesTypes;
  hostOnBoardingForm: FormGroup;
  boatLookups: any;

  constructor(private fb: FormBuilder, private onBoardingService: OnboardingService, private modal: NgbModal) {

  }

  ngOnInit(): void {
    let boatTypesTemp = Object.values(this.BOAT_TYPES);
    boatTypesTemp.forEach((element, index) => {
      this.boatTypesOptions.push({ "id": index, "name": element });
    });
    this.getLookupData();
    this.buildFormConfiguration();
  }

  buildFormConfiguration() {
    this.hostOnBoardingForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      location: [null, Validators.required],
      latitude: [],
      longitude: [],
      length: [0, Validators.required],
      totalBedrooms: [0, Validators.required],
      totalWashrooms: [0, Validators.required],
      isBoatelServicesOffered: [false],
      boatelCapacity: [0, Validators.required],
      boatelAvailabilityDays: [0, Validators.required],
      checkinTime: [null, Validators.required],
      checkoutTime: [null, Validators.required],
      perDayCharges: [null, Validators.required],
      isActive: [false],
      taxFee: [null, Validators.required],
      boatType: [null, Validators.required],
      boatFeatures: this.fb.array([]),
      boatGalleries: this.fb.array([]),
      boatRules: this.fb.array([])
    });
  }

  getLookupData() {
    this.onBoardingService.getLookups().subscribe(res => {
      this.boatLookups = res;
    })
  }

  addCapacity(isBedroom: boolean) {
    if (isBedroom) {
      this.hostOnBoardingForm.controls.totalBedrooms.setValue(this.hostOnBoardingForm.controls.totalBedrooms.value + 1);
    }
    else {
      this.hostOnBoardingForm.controls.totalWashrooms.setValue(this.hostOnBoardingForm.controls.totalWashrooms.value + 1);
    }
  }
  removeCapacity(isBedroom: boolean) {
    if (isBedroom) {
      this.hostOnBoardingForm.controls.totalBedrooms.setValue(this.hostOnBoardingForm.controls.totalBedrooms.value - 1);
    }
    else {
      this.hostOnBoardingForm.controls.totalWashrooms.setValue(this.hostOnBoardingForm.controls.totalWashrooms.value - 1);
    }
  }

  addGuests() {
    this.hostOnBoardingForm.controls.boatelCapacity.setValue(this.hostOnBoardingForm.controls.boatelCapacity.value + 1);
  }
  removeGuests() {
    this.hostOnBoardingForm.controls.boatelCapacity.setValue(this.hostOnBoardingForm.controls.boatelCapacity.value - 1);
  }

  choosBoatType(id: number) {
    this.hostOnBoardingForm.controls.boatType.setValue(id);
  }
  //Address Change
  handleAddressChange(address: any) {
    this.hostOnBoardingForm.controls.location.setValue(address.formatted_address);
    this.hostOnBoardingForm.controls.latitude.setValue(address.geometry.location.lat());
    this.hostOnBoardingForm.controls.longitude.setValue(address.geometry.location.lng());
  }

  submit() {
    console.log(this.hostOnBoardingForm.value);
  }

  addNewOptions(featureType: number) {
    let modal = this.modal.open(AddDialogComponent, { centered: true });
    modal.componentInstance.onSave.subscribe((res: string) => {
      if (featureType == this.FEATURES_TYPES.GuestFavoriteFeature) {
        let item = { id: null, name: res, isDefaultFeature: false, isGuestFavourite: true, isSafetyFeature: false };
        this.boatLookups.features.push(item);
      }
      else if (featureType == this.FEATURES_TYPES.OtherRules) {
        let item = { id: null, name: res, isDefault: false };
        this.boatLookups.rules.push(item);
      }
      else if (featureType == this.FEATURES_TYPES.SafetyFeatures) {
        let item = { id: null, name: res, isDefaultFeature: false, isGuestFavourite: false, isSafetyFeature: true };
        this.boatLookups.features.push(item);
      }
      this.modal.dismissAll();
    });
  }

  onFileChoose(fileInput: any) {
    let fileData: File;
    fileData = <File>fileInput.target.files[0];
    var mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (_event) => {
      //this.fBasic.profileImage.setValue(reader.result);
    }
  }

}
