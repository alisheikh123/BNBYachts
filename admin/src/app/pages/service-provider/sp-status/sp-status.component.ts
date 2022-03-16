import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ServiceProviderData } from '../../../shared/interfaces/ServiceProviderData';

@Component({
  selector: 'ngx-sp-status',
  template: '<ui-switch [checked]="value.isActive" color="#004fc4" (change)="onSuspendSurviceProvider(value.id)"></ui-switch>',
})
export class SpStatusComponent implements OnInit {

  @Input() value: any;
  constructor(private serviceProviderService: ServiceProviderData , private toaster : NbToastrService) { 
  }
  ngOnInit(): void {
  }
  onSuspendSurviceProvider(id : number){
    this.serviceProviderService.SuspendServiceProvider(id).subscribe((response: any) => {
      if (response.returnStatus == true) {
        this.toaster.primary("Account active/suspended successfully" , 'Service Provider');
      }else
      {
        this.toaster.danger("Something wrong here!", 'Service Provider');
      }
    });
  }
}