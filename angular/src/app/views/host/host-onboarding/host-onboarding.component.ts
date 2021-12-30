import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AllHostBoatsService } from 'src/app/core/host/all-host-boats.service';
import { OnboardingService } from 'src/app/core/host/onboarding.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { UserRoles } from 'src/app/shared/enums/user-roles';
import { BoatTypes, FeaturesTypes, OnBoardingTabs } from 'src/app/shared/enums/yacht-search.constant';
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
  boatGallery: any[] = [];
  secondDateRange: any;
  checkinTime = { hour: 13, minute: 30 };
  checkoutTime = { hour: 13, minute: 30 };
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  isAgree: boolean = false;
  ///
  boatCalendar = {
    fromDate: new Date(),
    toDate: new Date(),
  };
  isHostOnboarding:boolean = false;

  otherGalleryImages: any[] = [];
  USER_ROLES=UserRoles;


  constructor(
    private fb: FormBuilder,
    private onBoardingService: OnboardingService, 
    private modal: NgbModal, 
    private toastr: ToastrService, 
    private router: Router,
    private boatService:AllHostBoatsService,
    public app: AppComponent
    ) {
  }

  ngOnInit(): void {
    let boatTypesTemp = Object.values(this.BOAT_TYPES);
    boatTypesTemp.forEach((element, index) => {
      this.boatTypesOptions.push({ "id": index, "name": element });
    });
    this.getLookupData();
    this.isHostOnbaording();
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
      boatelCapacity: [0],
      boatelAvailabilityDays: [0],
      checkinTime: [new Date()],
      checkoutTime: [new Date()],
      perDayCharges: [null],
      isActive: [true],
      taxFee: [null],
      boatType: [null, Validators.required],
    });
  }

  isHostOnbaording() {
    this.boatService.getAllBoats(1, 10).subscribe((res: any) => {
      this.isHostOnboarding = res?.totalCount > 0 ? false : true;
    })
  }

  get hostForm() {
    return this.hostOnBoardingForm.controls;
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
    if (isBedroom && this.hostOnBoardingForm.controls.totalBedrooms.value > 0) {
      this.hostOnBoardingForm.controls.totalBedrooms.setValue(this.hostOnBoardingForm.controls.totalBedrooms.value - 1);
    }
    else if (this.hostOnBoardingForm.controls.totalWashrooms.value > 0) {
      this.hostOnBoardingForm.controls.totalWashrooms.setValue(this.hostOnBoardingForm.controls.totalWashrooms.value - 1);
    }
  }

  addGuests() {
    this.hostOnBoardingForm.controls.boatelCapacity.setValue(this.hostOnBoardingForm.controls.boatelCapacity.value + 1);
  }
  removeGuests() {
    if (this.hostOnBoardingForm.controls.boatelCapacity.value > 0) {
      this.hostOnBoardingForm.controls.boatelCapacity.setValue(this.hostOnBoardingForm.controls.boatelCapacity.value - 1);
    }
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

  changeCalendar(item: any) {
    this.boatCalendar.fromDate = item.startDate;
    this.boatCalendar.toDate = item.endDate;

  }

  submit() {
    if (this.isAgree) {
      let data = this.hostOnBoardingForm.value;
      this.boatGallery = [ ...this.boatGallery, ...this.otherGalleryImages];
      data.boatGallery = this.boatGallery;
      data.boatCalendar = this.boatCalendar;
      data.boatFeatures = this.boatLookups.features.filter((res: any) => res.isChecked == true);
      data.boatRules = this.boatLookups.rules.filter((res: any) => res.isChecked == true);
      this.onBoardingService.addBoat(data).subscribe((res: any) => {
        if (res.isSuccess == true) {
          //this.router.navigate[];
          if (res.isHostExists == false) {
            this.onBoardingService.addHostRole().subscribe(res => {
              if (res == true) {
                this.toastr.success("Host Onboarding Completed!", "Boat");
                this.router.navigate(['host/host-boat-listing']);
                this.app.loggedInUserRole = this.USER_ROLES.host;
                localStorage.setItem('userRole', this.app.loggedInUserRole);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            });
          }
          else {
            this.toastr.success("Boat added successfully.", "Boat");
            this.router.navigate(['host/host-boat-listing']);
          }

        }
      })
    }
  }

  public restrictNumeric(e: any) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  isValidCheckoutTime(){
    if(this.boatCalendar.fromDate.getUTCDate() == this.boatCalendar.toDate.getUTCDate() 
    && this.hostForm.checkinTime.value > this.hostForm.checkoutTime.value && this.hostForm.isBoatelServicesOffered){
      return false;
    } 
    else{
      return true;
    }
  }

}
