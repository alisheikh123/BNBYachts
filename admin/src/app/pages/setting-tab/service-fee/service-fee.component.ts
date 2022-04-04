import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionListComponent } from '../../../shared/common/action-list/action-list.component';
import { BoatType } from '../../../shared/enums/BoatType';
import { AddServiceFee, ServiceFee, ServiceFeeData } from '../../../shared/interfaces/settings';

@Component({
  selector: 'ngx-service-fee',
  templateUrl: './service-fee.component.html',
  styleUrls: ['./service-fee.component.scss']
})
export class ServiceFeeComponent implements OnInit {
  serviceFeeForm: FormGroup;
  cleanup : boolean;
  closeResult: string;  
  boatType = BoatType;
  modalRef : any;
  @ViewChild('contents') delete : ElementRef;
  @ViewChild('contentData') edit : ElementRef;
  source: ServiceFee[];
  feeData : AddServiceFee;
  reasons = [{
    id: this.boatType.Boatel,
    name: "Boatel",
  },
  {
    id: this.boatType.Charter,
    name: "Charter",
  },
  {
    id: this.boatType.Event,
    name: "Event",
  },
]
  settings = {
    actions: false,
    columns: {
      boatType: {
        title: 'Boat Type',
        type: 'string',
        width: '50%',
      },
      serviceFee: {
        title: 'Service Fee',
        type: 'string',
        width: '40%',
    },
    operation:{
      title:"",
      type: 'custom',
      filter : false,
      renderComponent: ActionListComponent,
      onComponentInitFunction:(instance) => {
      instance.actionEmitter.subscribe(row => {
        instance.dataEmitter.subscribe(data => {
          if (row == 'onEditAction') {
            this.onEditAction(this.edit,data);
          }
          if (row == 'onDeleteAction') {
            this.onDeleteAction(this.delete,data.id);
          }
        }) 
      });
     }
   }
  }
};
  constructor(private fb: FormBuilder, private serviceFeeService: ServiceFeeData , private modalService : NgbModal, private toaster : NbToastrService) {
   
  }
  ngOnDestroy(): void {
    this.cleanup == false;
  }
  ngOnInit() {
    this.serviceFeeForm = this.fb.group({
      id :[0],
      boatTypeId: [null, Validators.required],
      serviceFee: [0, Validators.required],
    })
    this.getServiceFee();
   }
   openLg(content) {
     this.modalService.open(content, { size: 'lg' });
     this.resetForm();
   }
  get feessForm() {
    return this.serviceFeeForm.controls;
  }
  getServiceFee() {
    this.serviceFeeService.getServiceFees().subscribe(res =>{
      this.source = res; 
      this.source.forEach(element => {
        if (element.boatTypeId == this.boatType.Boatel) {
          element.boatType = "Boatel";
        }else if (element.boatTypeId == this.boatType.Charter) {
          element.boatType = "Charter";
        }else if (element.boatTypeId == this.boatType.Event) {
          element.boatType = "Event";
        }
      });
    });    
  }
  onEditAction(contentData , feeData : AddServiceFee){
    this.modalService.open(contentData, { size: 'lg' });
    this.serviceFeeForm.patchValue({
      id: feeData.id,
      boatTypeId: feeData.boatTypeId,
      serviceFee: feeData.serviceFee
     });
  }
  onSubmit() {
    var feeData = this.serviceFeeForm.value;
    if (feeData.id > 0) {
      this.serviceFeeService.UpdateServiceFee(feeData).subscribe(response =>{
      this.toaster.primary('Service Fee updated successfully', 'Service Fee');
      this.resetForm();
      this.modalService.dismissAll();
      this.getServiceFee();
      });
    }else{
      feeData.id = 0;
      this.serviceFeeService.AddServiceFee(feeData).subscribe(response =>{
        this.toaster.primary('Service Fee created successfully', 'Service Fee');
        this.resetForm();
        this.modalService.dismissAll();
        this.getServiceFee();
      });
    }
    this.cleanup = true;
  }

  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  
  onDeleteAction(contents,id) {
    if (id > 0) {
      this.modalService.open(contents, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
        this.closeResult = `Closed with: ${result}`;  
        if (result === 'yes') {  
          this.serviceFeeService.deleteServiceFee(id).subscribe(res =>{
            this.toaster.primary("Service Fee Deleted Successfully.", "Service Fee");
            this.getServiceFee();
          })
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });
    }
  }  
  resetForm(){
    this.serviceFeeForm.reset();
  }
}
