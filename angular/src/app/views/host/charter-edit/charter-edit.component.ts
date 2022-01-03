import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BoatSettingsService } from 'src/app/core/Boat/boat-settings.service';
import { CharterService } from 'src/app/core/host/charter.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';

@Component({
  selector: 'app-charter-edit',
  templateUrl: './charter-edit.component.html',
  styleUrls: ['./charter-edit.component.scss']
})
export class CharterEditComponent implements OnInit {
  boatCharterForm: FormGroup;
  boatlistOptions:any=[];
  charterId:number;
  constructor(private activatedRoute: ActivatedRoute,private service:CharterService,public fb: FormBuilder,private charterService: YachtSearchService, private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.charterId = Number(res['id']);
    });
    this.service.getBoats().subscribe((boatlist:any)=>{
      this.boatlistOptions = boatlist;
    });
    this.charterFormModfication();
    this.getCharterDetailsById();
  }
  charterFormModfication()
  {
    this.boatCharterForm = this.fb.group({
      id:[0],
      description: [null, Validators.required],
      guestCapacity: [1, Validators.required],
      departingLatitude: [],
      departingLongitude: [],
      destinationLatitude: [],
      destinationLongitude: [],
      destination: [null, Validators.required],
      isFullBoatCharges: [true],
      charterFee: [0,Validators.required],
      departureFromDate: [new Date(), Validators.required],
      departureToDate: [new Date(),Validators.required],
      isRoundTrip: [false],
      departingFrom: [null, Validators.required],
      returnDate: [new Date()],
      boatId:[0,Validators.required],
      isActive:[true]
    });
  }
  getCharterDetailsById()
  {
    this.charterService.charterDetailsById(this.charterId).subscribe((res: any) => {
      this.boatCharterForm.setValue({
        id:res?.charterDetails?.id,
        description: res?.charterDetails?.description,
        guestCapacity: res?.charterDetails?.guestCapacity,
        departingLatitude: res?.charterDetails?.departingLatitude,
        departingLongitude: res?.charterDetails?.departingLongitude,
        destinationLatitude: res?.charterDetails?.destinationLatitude,
        destinationLongitude: res?.charterDetails?.destinationLongitude,
        destination:res?.charterDetails?.destination,
        isFullBoatCharges: res?.charterDetails?.isFullBoatCharges,
        charterFee:res?.charterDetails?.charterFee,
        departureFromDate: res?.charterDetails?.departureFromDate,
        departureToDate: res?.charterDetails?.departureToDate,
        isRoundTrip: res?.charterDetails?.isRoundTrip,
        departingFrom: res?.charterDetails?.departingFrom,
        returnDate: res?.charterDetails?.returnDate,
        boatId:res?.charterDetails?.boatId,
        isActive:res?.charterDetails?.isActive,
      });

    });
  }


  handleDepartingAddress(address: any) {
    this.boatCharterForm.controls.departingFrom.setValue(address.formatted_address);
    this.boatCharterForm.controls.departingLatitude.setValue(address.geometry.location.lat());
    this.boatCharterForm.controls.departingLongitude.setValue(address.geometry.location.lng());
  }
  handleDestinationAddress(address: any) {
    this.boatCharterForm.controls.destination.setValue(address.formatted_address);
    this.boatCharterForm.controls.destinationLatitude.setValue(address.geometry.location.lat());
    this.boatCharterForm.controls.destinationLongitude.setValue(address.geometry.location.lng());
  }
  get charterForm() {
    return this.boatCharterForm.controls;
  }
  updateCharter() {
    if (this.boatCharterForm.valid) {
      let data = this.boatCharterForm.value;
      this.charterService.updateCharter(data).subscribe(res => {
        if (res) {
          this.toastr.success("Charter Updated successfully.", "Charter Update");
          this.router.navigate(['/host/host-boat-listing']);
        }
      })
    }
  }
  removeCapacity() {
    if(this.boatCharterForm.controls.guestCapacity.value > 1) {
      this.boatCharterForm.controls.guestCapacity.setValue(this.boatCharterForm.controls.guestCapacity.value - 1);
    }
  }
  addCapacity() {
    this.boatCharterForm.controls.guestCapacity.setValue(this.boatCharterForm.controls.guestCapacity.value + 1);
  }
  goBack() {
    this.router.navigate(['/host/host-boat-listing']);
  }

}
