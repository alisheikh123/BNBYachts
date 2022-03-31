import { StatusType } from './../../../shared/enums/StatusType';
import { NewsLetter, SubscribedUser } from './../../../shared/interfaces/NewsLetter';
import { Component, OnInit } from '@angular/core';
import { NewsLetterData } from '../../../shared/interfaces/NewsLetter';
import { DatePipe } from '@angular/common';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LetterType } from '../../../shared/enums/LetterType';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-subscribe-users',
  templateUrl: './subscribe-users.component.html',
  styleUrls: ['./subscribe-users.component.scss']
})
export class SubscribeUsersComponent implements OnInit {
  scheduleForm: FormGroup;
  source: SubscribedUser[];
  letterType = LetterType;
  statusType = StatusType;
  selectedRows : string[] = [];
  reasons: NewsLetter[];
  settings = {
    columnTitle :"Action",
    selectMode : 'multi',
    actions: {
      mode :'external',
      add: false,
      edit:false,
      delete: false,
      position: 'right',
    },
    columns: {
      emailAddress: {
        title: 'Email Address',
        type: 'string',
        width: '50%'
      },
      creationTime: {
        title: 'Subscribe Date',
        type: 'Date',
        width: '45%',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'MM/dd/yyyy');
      },
      },
  }
};
  constructor(private fb : FormBuilder,private newsLetterService: NewsLetterData , private datePipe : DatePipe,
     private modalService : NgbModal, private toaster : NbToastrService) { }
  ngOnInit() {
    this.scheduleForm = this.fb.group({
      // id :[0],
      newsLetterSubscriptionId: [null, Validators.required],
    })
    this.getSubscribedUser();
    this.getNewsLetter();
   }
   getSubscribedUser() {
    this.newsLetterService.getSubscribedUser().subscribe((res:any) => {
      this.source = res.data; 
    });    
  }
  onSubmit() {
    debugger;
    var scheduleData = this.scheduleForm.value;
    scheduleData.statusTypeId = this.statusType.Pending;
    scheduleData.emailAddress =  this.selectedRows
    this.newsLetterService.ScheduleNewsLetter(scheduleData).subscribe(response =>{
        this.toaster.primary('Schedule Users successfully', 'Schedule Users');
        this.resetForm();
        this.modalService.dismissAll();
        this.getSubscribedUser();
      });
  }
  getNewsLetter() {
    this.newsLetterService.getNewsLetters().subscribe(res =>{
      this.reasons = res;
    });  
  }  
  onUserRowSelect(event) {
    event.selected.forEach(element => {
      this.selectedRows.push(element.emailAddress);
    });
  }
  openLg(content) {
     this.modalService.open(content, { size: 'modal-basic-title' });
   }
   resetForm(){
     this.scheduleForm.reset();
   }
}