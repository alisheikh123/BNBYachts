import { id } from '@swimlane/ngx-charts';
import { NbToastrService } from '@nebular/theme';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Faqs, FaqsData, AddFaqs } from './../../../shared/interfaces/Faqs';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { QuestionCategory } from '../../../shared/enums/QuestionsCategory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionListComponent } from '../../../shared/common/action-list/action-list.component';

@Component({
  selector: 'ngx-faqs-listing',
  templateUrl: './faqs-listing.component.html',
  styleUrls: ['./faqs-listing.component.scss']
})
export class FaqsListingComponent implements OnInit, OnDestroy {
  viewShow : boolean;
  @Output() newItemEvent = new EventEmitter<boolean>();
  faqsForm: FormGroup;
  cleanup : boolean;
  closeResult: string;  
  QuestionCategories = QuestionCategory;
  modalRef : any;
  @ViewChild('contents') delete : ElementRef;
  @ViewChild('contentData') edit : ElementRef;
  source: Faqs[];
  faqsData : AddFaqs;
  reasons = [{
    id: this.QuestionCategories.Booking,
    name: "Booking",
  },
  {
    id: this.QuestionCategories.OnBoardService,
    name: "On Board Service",
  },
  {
    id: this.QuestionCategories.PrivilegeFaq,
    name: "Privilege Faq",
  },
  {
    id: this.QuestionCategories.TravelInformation,
    name: "Travel Information"
  }
]
  settings = {
    actions : false,
    columns: {
      questionCategory: {
        title: 'Category',
        type: 'string',
        width: '20%',
      },
      question: {
        title: 'Questions',
        type: 'string',
        width: '30%',
        valuePrepareFunction: (value) => { 
          return value.substring(0, 49);
        } 
      },
      answer: {
        title: 'Answers',
        type: 'string',
        width: '40%',
        valuePrepareFunction: (value) => { 
        return value.substring(0, 49)+'...';
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
  constructor(private fb: FormBuilder, private faqsService: FaqsData ,private activeModal: NgbActiveModal, 
    private modalService : NgbModal, private toaster : NbToastrService) {
   
  }
  ngOnDestroy(): void {
    this.cleanup == false;
  }
  ngOnInit() {
    this.viewShow = true;
    this.newItemEvent.emit(this.viewShow);
    this.faqsForm = this.fb.group({
      id :[0],
      categoryId: [null, Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
    })
    this.getFaqs();
   }
   openLg(content) {
     this.modalService.open(content, { size: 'lg' });
     this.resetForm();
   }
  get faqssForm() {
    return this.faqsForm.controls;
  }
  getFaqs() {
    this.faqsService.GetFaqs().subscribe((res) =>{
      this.source = res.data.reverse();
      this.source.forEach(element => {
        if (element.categoryId == this.QuestionCategories.Booking) {
          element.questionCategory = "Booking";
        }else if (element.categoryId == this.QuestionCategories.OnBoardService) {
          element.questionCategory = "On Board Service";
        }else if (element.categoryId == this.QuestionCategories.PrivilegeFaq) {
          element.questionCategory = "Privilege Faq";
        }else if (element.categoryId == this.QuestionCategories.TravelInformation) {
          element.questionCategory = "Travel Information"
        }
      });
    });    
  }
  onEditAction(contentData , faqsData : AddFaqs){
    this.modalService.open(contentData, { size: 'lg' });
    this.faqsForm.patchValue({
      id: faqsData.id,
      categoryId: faqsData.categoryId,
      question: faqsData.question,
      answer: faqsData.answer
     });
  }
  onSubmit() {
    var faqsData = this.faqsForm.value;
    if (faqsData.id > 0) {
      this.faqsService.UpdateFaqs(faqsData).subscribe(response =>{ 
      this.toaster.primary('Faqs updated successfully', 'Faqs');
      this.resetForm();
      this.modalService.dismissAll();
      this.getFaqs();
      });
    }else{
      faqsData.id = 0;
      this.faqsService.AddFaqs(faqsData).subscribe(response =>{
        this.toaster.primary('Faqs created successfully', 'Faqs');
        this.resetForm();
        this.modalService.dismissAll();
        this.getFaqs();
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
          this.faqsService.deleteFaqs(id).subscribe(res =>{
            this.toaster.success("Faqs Deleted Successfully.", "Faqs");
            this.getFaqs();
          })
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });
    }
  }  
  resetForm(){
    this.faqsForm.reset();
  }
}
