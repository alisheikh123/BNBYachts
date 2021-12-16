import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharterCreationTab } from 'src/app/shared/enums/yacht-search.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CharterService } from 'src/app/core/host/charter.service';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-angular-calendars/public_api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charter-creation-component',
  templateUrl: './charter-creation-component.component.html'
})
export class CharterCreationComponentComponent implements OnInit {
  public dateValue:Date = new Date();
  isSubmitted = false;
  charterCreationForm: FormGroup;
  constructor(public fb: FormBuilder,private modal: NgbModal,private service:CharterService, private toastr: ToastrService,private route: Router,) { }
  @ViewChild('chartercreationpopup') templateRef: TemplateRef<any>;
  CHARTER_TABS = CharterCreationTab;
  currentTab = this.CHARTER_TABS.BoatSelection;
  boatlistOptions:any=[];
  isAgree: boolean = false;
  CharterCalendar = {
    fromDate: new Date().getDay(),
    toDate: new Date().getDay(),
  };



  ngOnInit(): void {

    this.service.getBoats().subscribe((boatlist:any)=>{
      this.boatlistOptions = boatlist;
    });
    this.charterFormConfiguration();
  }

  charterFormConfiguration() {
    this.charterCreationForm = this.fb.group({
      description: [null, Validators.required],
      guestCapacity: [0, Validators.required],
      departingLatitude: [],
      departingLongitude: [],
      destinationLatitude: [],
      destinationLongitude: [],
      destination: [null, Validators.required],
      isFullBoatCharges: [true],
      charterFee: [0,Validators.required],
      departureFromDate: [new Date(), Validators.required],
      departureToDate: [new Date()],
      isRoundTrip: [false],
      departingFrom: [null, Validators.required],
      returnDate: [new Date()],
      boatId:[0,Validators.required],
    });
  }
  submit() {
      let data = this.charterCreationForm.value;
      console.log(data);
      this.service.saveCharter(data).subscribe((res: any) => {

          this.openModal(this.templateRef);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);

      });
  }
  get charterForm() {
    return this.charterCreationForm.controls;
  }
  chooseBoats(id: number) {
    this.charterCreationForm.controls.boatName.setValue(id);
  }
  popOverFilterData = {
    Guests: 0
  }
  addGuests() {
    this.charterCreationForm.controls.guestCapacity.setValue(this.charterCreationForm.controls.guestCapacity.value + 1);
  }
  removeGuests() {
    this.charterCreationForm.controls.guestCapacity.setValue(this.charterCreationForm.controls.guestCapacity.value - 1);
  }
  handleDepartingAddress(address: any) {
    this.charterCreationForm.controls.departingFrom.setValue(address.formatted_address);
    this.charterCreationForm.controls.departingLatitude.setValue(address.geometry.location.lat());
    this.charterCreationForm.controls.departingLongitude.setValue(address.geometry.location.lng());
  }

  handleDestinationAddress(address: any) {
    this.charterCreationForm.controls.destination.setValue(address.formatted_address);
    this.charterCreationForm.controls.destinationLatitude.setValue(address.geometry.location.lat());
    this.charterCreationForm.controls.destinationLongitude.setValue(address.geometry.location.lng());
  }
  selectBoatName(event: any)
  {
    let Id = event.target.value;
    this.service.getSelectedBoatDetail(Id).subscribe((res:any)=>
    {
      console.log(res);
      res.forEach((element:any) => {
        this.CharterCalendar.fromDate = element.departureFromDate;
        this.CharterCalendar.toDate = element.departureToDate;
      });
      console.log(this.CharterCalendar.fromDate);
      console.log(this.CharterCalendar.toDate);
    })
  }
   onRenderCell(args: RenderDayCellEventArgs): void {

    if (args.date?.getDay() == 16  || args.date?.getDay() ==18) {
      args.isDisabled = true;
    }

}
openModal(template: TemplateRef<any>) {
  debugger;
  this.modal.open(template,{ windowClass: 'custom-modal custom-small-modal' });
}
}
