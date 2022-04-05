import { NewsLetterTransferable } from './../../../shared/interfaces/NewsLetterTransferable';
import { AddNewsLetter, NewsLetter, NewsLetterData } from './../../../shared/interfaces/NewsLetter';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LetterType } from '../../../shared/enums/LetterType';
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { ActionListComponent } from '../../../shared/common/action-list/action-list.component';

@Component({
  selector: 'ngx-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss']
})
export class NewsletterSubscriptionComponent implements OnInit {
  newsLetterForm: FormGroup;
  cleanup : boolean;
  closeResult: string;
  fileInfo : string;
  @ViewChild('contents') delete : ElementRef;
  @ViewChild('contentData') edit : ElementRef;
  letterType = LetterType;
  newsLetterPic : NewsLetterTransferable;
  source: NewsLetter[];
  newsLetterData : AddNewsLetter;
  assetsUrlNewsLetter = environment.S3BUCKET_URL + '/profilePicture/newsLetter/';
  reasons = [{
    id: this.letterType.Daily,
    name: "Daily",
  },
  {
    id: this.letterType.Weekly,
    name: "Weekly",
  },
  {
    id: this.letterType.Monthly,
    name: "Monthly",
  },
  {
    id: this.letterType.Yearly,
    name: "Yearly",
  },
]
  settings = {
    actions: false,
    columns: {
      title: {
        title: 'Title',
        type: 'string',
      },
      letterType: {
        title: 'Letter Type',
        type: 'string',
      },
      description: {
        title: 'Descriptions',
        type: 'string',
        width: '50%',
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
  constructor(private fb: FormBuilder, private newsLetterService: NewsLetterData,
    private modalService : NgbModal, private toaster : NbToastrService) {
   
  }
  ngOnInit() {
    // const onCreate = this.abpPermission.
    this.newsLetterForm = this.fb.group({
      id :[0],
      letterTypeId: [null, Validators.required],
      title: ['', Validators.required],
      letterImage: ['', Validators.required],
      description: ['', Validators.required],
      // contactID :  [0, Validators.required],
    })
    this.getNewsLetter();
   }
   openLg(content) {
     this.modalService.open(content, { size: 'lg' });
     this.fileInfo = '';
     this.resetForm();
   }
  get feessForm() {
    return this.newsLetterForm.controls;
  }
  getNewsLetter() {
    this.newsLetterService.getNewsLetters().subscribe(res =>{
      this.source = res; 
      this.source.forEach(element => {
        if (element.letterTypeId == this.letterType.Daily) {
          element.letterType = "Daily";
        }else if (element.letterTypeId == this.letterType.Weekly) {
          element.letterType = "Weekly";
        }else if (element.letterTypeId == this.letterType.Monthly) {
          element.letterType = "Monthly";
        }else if (element.letterTypeId == this.letterType.Yearly) {
          element.letterType = "Yearly";
        }
      });
    });    
  }
  onEditAction(contentData , newsLetterData : AddNewsLetter){
    this.modalService.open(contentData, { size: 'lg' });
    this.newsLetterForm.patchValue({
      id: newsLetterData.id,
      letterTypeId: newsLetterData.letterTypeId,
      description: newsLetterData.description,
      letterImage: newsLetterData.letterImage,
      title: newsLetterData.title,
     });
     this.fileInfo = newsLetterData.letterImage;

  }
  onSubmit() {
    var newsLetterData = this.newsLetterForm.value;
    newsLetterData.contactID = 1;
    newsLetterData.newsLetterGallery =  this.newsLetterPic
    if (newsLetterData.id > 0) {
      this.newsLetterService.updateNewsLetter(newsLetterData).subscribe(response =>{
      this.toaster.primary('News Letter updated successfully', 'News Letter');
      this.resetForm();
      this.modalService.dismissAll();
      this.getNewsLetter();
      });
    }else{
      newsLetterData.id = 0;
      this.newsLetterService.AddNewsLetter(newsLetterData).subscribe(response =>{
        this.toaster.primary('News Letter created successfully', 'News Letter');
        this.resetForm();
        this.modalService.dismissAll();
        this.getNewsLetter();
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
          this.newsLetterService.deleteNewsLetter(id).subscribe(res =>{
            this.toaster.primary("News Letter Deleted Successfully.", "News Letter");
            this.getNewsLetter();
          })
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });
    }
  }  
  resetForm(){
    this.newsLetterForm.reset();
  }
  onFileChange(fileInput : any) {
    if (fileInput.target.files.length > 0) {
      let fileData: File;
      fileData = <File>fileInput.target.files[0];
      this.fileInfo = fileData.name;
      var mimeType = fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = (_event) => {
        this.newsLetterPic = {
          fileData : reader.result,
          fileName: fileData.name,
          fileType: fileData.type,
          isCoverPic:true,
          id : 0
        }
      }
    }
  }
}
