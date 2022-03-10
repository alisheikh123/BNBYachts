import { AddMarket, MarketData, Markets } from './../../../shared/interfaces/Market';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketingType } from '../../../shared/enums/MarketingType';
import { AddFaqs, FaqsData } from '../../../shared/interfaces/Faqs';

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
  source: Markets[];
  faqsData : AddMarket;
  reasons = [{
    id: this.MarketingType.Boatel,
    name: "Boatel Local Laws",
  },
  {
    id: this.MarketingType.Charter,
    name: "Charter Local Laws",
  },
  {
    id: this.MarketingType.Event,
    name: "Event Local Laws",
  },
  {
    id: this.MarketingType.RentelPermission,
    name: "Rentel Permission"
  },
  {
    id: this.MarketingType.Signup,
    name: "Signup Policy"
  },
  {
    id: this.MarketingType.Captain,
    name: "Captain Terms"
  },
  {
    id: this.MarketingType.Management,
    name: "Management Terms"
  },
  {
    id: this.MarketingType.Cleaning,
    name: "Cleaning Terms"
  }
]
  settings = {
    actions: {
      mode :'external',
      add: false,
      edit:false,
      delete: false,
      position: 'right',
      custom: [
      { 
        name: 'onEditAction', 
        title: '<i class="nb-edit" title="onEditAction"></i>',
      },
      { 
        name: 'deleteMarketPage', 
        title: '<i class="nb-trash" title="deleteMarketPage"></i>'
      }
    ],
    },
    columns: {
      marketingType: {
        title: 'Type',
        type: 'string',
        width: '20%',
      },
      localLaws: {
        title: 'Terms And Conditions',
        type: 'string',
        width: '50%',
        valuePrepareFunction: (value) => { 
        return value.substring(0, 60)+'...';
        } 
    },
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
          element.marketingType = "Boatel Local Laws";
        }else if (element.marketingTypeId == this.MarketingType.Charter) {
          element.marketingType = "Charter Local Laws";
        }else if (element.marketingTypeId == this.MarketingType.Event) {
          element.marketingType = "Event Local Laws";
        }else if (element.marketingTypeId == this.MarketingType.RentelPermission) {
          element.marketingType = "Rentel Permission"
        }else if (element.marketingTypeId == this.MarketingType.Signup) {
          element.marketingType = "Signup Policy";
        }else if (element.marketingTypeId == this.MarketingType.Captain) {
          element.marketingType = "Captain Terms";
        }else if (element.marketingTypeId == this.MarketingType.Management) {
          element.marketingType = "Management Terms"
        }else if (element.marketingTypeId == this.MarketingType.Cleaning) {
          element.marketingType = "Cleaning Terms"
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
  onCustomAction(contents, contentData,event){
    debugger;
    switch (event.action) {
      case 'onEditAction':
        this.onEditAction(contentData, event.data);
        break;
     case 'deleteMarketPage':
       this.deleteMarketPage(contents,event.data.id);
    }
   
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
  deleteMarketPage(contents,id) {
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
