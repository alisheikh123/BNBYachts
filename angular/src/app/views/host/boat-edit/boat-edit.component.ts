import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BoatSettingsService } from 'src/app/core/Boat/boat-settings.service';
import { OnboardingService } from 'src/app/core/host/onboarding.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { FeaturesTypes } from 'src/app/shared/enums/yacht-search.constant';
import { environment } from 'src/environments/environment';
import { AddDialogComponent } from '../host-onboarding/add-dialog/add-dialog.component';

@Component({
  selector: 'app-boat-edit',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.scss']
})
export class BoatEditComponent implements OnInit {

  boatId: number;
  boatEditForm: FormGroup;
  boatGallery: any[] = [];
  otherGalleryImages: any[] = [];
  boatCalendar = {
    fromDate: new Date(),
    toDate: new Date(),
  };
  boatFeatures: any;
  boatRules: any;
  boatLookups: any;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  FEATURES_TYPES = FeaturesTypes;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private boatService: YachtSearchService, private modal: NgbModal,
    private onBoardingService: OnboardingService, private boatSettingsService: BoatSettingsService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.boatId = Number(res['id']);
    });
    this.getBoatDetailsById();
    this.getLookupData();
    this.buildFormConfiguration();
  }

  buildFormConfiguration() {
    this.boatEditForm = this.fb.group({
      id: [0],
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
      checkinTime: [new Date(), Validators.required],
      checkoutTime: [new Date(), Validators.required],
      perDayCharges: [null, Validators.required],
      isActive: [true],
      taxFee: [null, Validators.required],
      boatType: [null, Validators.required],
    });
  }
  getLookupData() {
    this.onBoardingService.getLookups().subscribe(res => {
      this.boatLookups = res;
    })
  }

  getBoatDetailsById() {
    this.boatService.boatDetailsById(this.boatId).subscribe((res: any) => {
      this.boatEditForm.setValue({
        id:this.boatId,
        name: res?.name,
        description: res?.description,
        location: res?.location,
        latitude: res?.latitude,
        longitude: res?.longitude,
        length: res?.length,
        totalBedrooms: res?.totalBedrooms,
        totalWashrooms: res?.totalWashrooms,
        isBoatelServicesOffered: res?.isBoatelServicesOffered,
        boatelCapacity: res?.boatelCapacity,
        boatelAvailabilityDays: res?.boatelAvailabilityDays,
        checkinTime: res?.checkinTime,
        checkoutTime: res?.checkoutTime,
        perDayCharges: res?.perDayCharges,
        isActive: res?.isActive,
        taxFee: res?.taxFee,
        boatType: res?.boatType
      });
      this.boatGallery = res?.boatGalleries;
      this.boatFeatures = res?.boatFeatures;
      this.boatRules = res?.boatRules;
      res?.boatFeatures?.forEach((element: any) => {
        var findIndex = this.boatLookups?.features?.findIndex((res: any) => res.id == element.offeredFeaturesId);
        if (findIndex >= 0) {
          this.boatLookups.features[findIndex].isChecked = true;
        }
      });
      this.boatRules?.forEach((element: any) => {
        var findIndex = this.boatLookups?.rules?.findIndex((res: any) => res.id == element.offeredRuleId);
        if (findIndex >= 0) {
          this.boatLookups.rules[findIndex].isChecked = true;
        }
      });
    });
  }

  handleAddressChange(address: any) {
    this.boatEditForm.controls.location.setValue(address.formatted_address);
    this.boatEditForm.controls.latitude.setValue(address.geometry.location.lat());
    this.boatEditForm.controls.longitude.setValue(address.geometry.location.lng());
  }
  addCapacity(isBedroom: boolean) {
    if (isBedroom) {
      this.boatEditForm.controls.totalBedrooms.setValue(this.boatEditForm.controls.totalBedrooms.value + 1);
    }
    else {
      this.boatEditForm.controls.totalWashrooms.setValue(this.boatEditForm.controls.totalWashrooms.value + 1);
    }
  }
  removeCapacity(isBedroom: boolean) {
    if (isBedroom) {
      this.boatEditForm.controls.totalBedrooms.setValue(this.boatEditForm.controls.totalBedrooms.value - 1);
    }
    else {
      this.boatEditForm.controls.totalWashrooms.setValue(this.boatEditForm.controls.totalWashrooms.value - 1);
    }
  }
  addGuests() {
    this.boatEditForm.controls.boatelCapacity.setValue(this.boatEditForm.controls.boatelCapacity.value + 1);
  }
  removeGuests() {
    this.boatEditForm.controls.boatelCapacity.setValue(this.boatEditForm.controls.boatelCapacity.value - 1);
  }
  addNewOptions(featureType: number) {
    let modal = this.modal.open(AddDialogComponent, { centered: true });
    modal.componentInstance.onSave.subscribe((res: string) => {
      if (featureType == this.FEATURES_TYPES.GuestFavoriteFeature) {
        let item = { id: null, name: res, isDefaultFeature: false, isGuestFavourite: true, isSafetyFeature: false, isChecked: true };
        this.boatLookups.features.push(item);
      }
      else if (featureType == this.FEATURES_TYPES.OtherRules) {
        let item = { id: null, name: res, isDefault: false };
        this.boatLookups.rules.push(item);
      }
      else if (featureType == this.FEATURES_TYPES.SafetyFeatures) {
        let item = { id: null, name: res, isDefaultFeature: false, isGuestFavourite: false, isSafetyFeature: true, isChecked: true };
        this.boatLookups.features.push(item);
      }
      this.modal.dismissAll();
    });
  }

  onFileChoose(fileInput: any, index?: number) {
    let fileData: File;
    fileData = <File>fileInput.target.files[0];
    var mimeType = fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = (_event) => {
      if (index != null) {
        if (!this.boatGallery[index]) {
          let item = {
            fileName: fileData.name,
            fileData: reader.result,
            fileType: fileData.type,
            sortOrder: index,
            isCoverPic: (index == 0) ? true : false
          }
          this.boatGallery.push(item);
        }
        else {
          this.boatGallery[index]['fileName'] = fileData.name;
          this.boatGallery[index]['fileData'] = reader.result;
          this.boatGallery[index]['fileType'] = fileData.type;
        }
      }
      else {
        let item = {
          fileName: fileData.name,
          fileData: reader.result,
          fileType: fileData.type
        }
        this.otherGalleryImages.push(item);
      }
    }
  }

  updateBoat() {
    if (this.boatEditForm.valid) {
      let data = this.boatEditForm.value;
      data.boatGallery = this.boatGallery;
      data.boatCalendar = this.boatCalendar;
      data.boatFeatures = this.boatLookups.features.filter((res: any) => res.isChecked == true);
      data.boatRules = this.boatLookups.rules.filter((res: any) => res.isChecked == true);
      this.boatSettingsService.updateBoat(data).subscribe(res => {
        if (res) {
          this.toastr.success("Boat Updated successfully.", "Boat Update");
        }
      })
    }
  }

}
