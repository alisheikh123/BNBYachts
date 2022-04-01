import { AddMarket, MarketData, Markets } from './../../../shared/interfaces/Market';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingType } from '../../../shared/enums/MarketingType';
import { ActionListComponent } from '../../../shared/common/action-list/action-list.component';

@Component({
  selector: 'ngx-marketing-page',
  templateUrl: './marketing-page.component.html',
  styleUrls: ['./marketing-page.component.scss']
})
export class MarketingPageComponent implements OnInit {

  marketForm: FormGroup;
  cleanup : boolean;
  closeResult: string;  
  MarketingType = MarketingType;
  modalRef : any;
  @ViewChild('contents') delete : ElementRef;
  @ViewChild('contentData') edit : ElementRef;
  source: Markets[];
  faqsData : AddMarket;
  reasons = [{
    id: this.MarketingType.Boatel,
    name: "Boatel term and conditions",
  },
  {
    id: this.MarketingType.Charter,
    name: "Charter term and conditions",
  },
  {
    id: this.MarketingType.Event,
    name: "Event term and conditions",
  },
  {
    id: this.MarketingType.Captain,
    name: "Captain term and conditions"
  },
  {
    id: this.MarketingType.Management,
    name: "Management term and conditions"
  },
  {
    id: this.MarketingType.Cleaning,
    name: "Cleaning term and conditions"
  }
]
  settings = {
    actions: false,
    columns: {
      marketingType: {
        title: 'Type',
        type: 'string',
        width: '40%',
      },
      localLaws: {
        title: 'Terms And Conditions',
        type: 'string',
        width: '50%',
        valuePrepareFunction: (value) => { 
        return value.substring(0, 60)+'...';
        } 
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
  constructor(private fb: FormBuilder, private marketService: MarketData ,private activeModal: NgbActiveModal, private modalService : NgbModal, private toaster : NbToastrService) {
   
  }
  ngOnDestroy(): void {
    this.cleanup == false;
  }
  ngOnInit() {
    this.marketForm = this.fb.group({
      id :[0],
      marketingTypeId: [null, Validators.required],
      localLaws: ['', Validators.required],
    })
    this.getMarketPage();
   }
   openLg(content) {
     this.modalService.open(content, { size: 'lg' });
     this.resetForm();
   }
  get faqssForm() {
    return this.marketForm.controls;
  }
  getMarketPage() {
    this.marketService.getMarketingPages().subscribe(res =>{
      this.source = res; 
      this.source.forEach(element => {
        if (element.marketingTypeId == this.MarketingType.Boatel) {
          element.marketingType = "Boatel term and conditions";
        }else if (element.marketingTypeId == this.MarketingType.Charter) {
          element.marketingType = "Charter term and conditions";
        }else if (element.marketingTypeId == this.MarketingType.Event) {
          element.marketingType = "Event term and conditions";
        }else if (element.marketingTypeId == this.MarketingType.Captain) {
          element.marketingType = "Captain term and conditions";
        }else if (element.marketingTypeId == this.MarketingType.Management) {
          element.marketingType = "Management term and conditions"
        }else if (element.marketingTypeId == this.MarketingType.Cleaning) {
          element.marketingType = "Cleaning term and conditions"
        }
      });
    });    
  }
  onEditAction(contentData , faqsData : AddMarket){
    this.modalService.open(contentData, { size: 'lg' });
    this.marketForm.patchValue({
      id: faqsData.id,
      marketingTypeId: faqsData.marketingTypeId,
      localLaws: faqsData.localLaws
     });
  }
  onSubmit() {
    var faqsData = this.marketForm.value;
    if (faqsData.id > 0) {
      this.marketService.updateMarketPage(faqsData).subscribe(response =>{
      this.toaster.primary('Market Page updated successfully', 'Market Page');
      this.resetForm();
      this.modalService.dismissAll();
      this.getMarketPage();
      });
    }else{
      faqsData.id = 0;
      this.marketService.AddMarketPage(faqsData).subscribe(response =>{
        this.toaster.primary('Market Page created successfully', 'Market Page');
        this.resetForm();
        this.modalService.dismissAll();
        this.getMarketPage();
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
          this.marketService.deleteMarketPage(id).subscribe(res =>{
            this.toaster.primary("Market Page Deleted Successfully.", "Market Page");
            this.getMarketPage();
          })
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });
    }
  }  
  resetForm(){
    this.marketForm.reset();
  }
}
