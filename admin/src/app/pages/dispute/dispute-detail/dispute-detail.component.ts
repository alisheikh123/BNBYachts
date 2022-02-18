import { IDispute } from './../../../shared/interfaces/IDispute';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DisputesData } from '../../../shared/interfaces/IDispute';

@Component({
  selector: 'ngx-dispute-detail',
  templateUrl: './dispute-detail.component.html',
  styleUrls: ['./dispute-detail.component.scss']
})
export class DisputeDetailComponent implements OnInit {
  dispute : IDispute;
  constructor(private route : ActivatedRoute , private disputeService : DisputesData) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDisputeById(id);
  }
  getDisputeById(id : number){
    this.disputeService.getDisputeById(id).subscribe((res) =>{
      this.dispute = res;
    }); 
  }
}
