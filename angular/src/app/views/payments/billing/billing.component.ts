import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillingsService } from 'src/app/core/Payment/billings.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  userTransactions:any = [];
  constructor(private service:BillingsService,private modal:NgbModal) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(){
    this.service.getUserTransactions().subscribe(res=>{
      this.userTransactions = res;
    })
  }
}
