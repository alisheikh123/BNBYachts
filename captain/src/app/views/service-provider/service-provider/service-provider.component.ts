import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { SignupModalComponent } from '../../auth/components/signup-modal/signup-modal.component';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {
isAlreadyCaptain :false;
serviceProviderType= ServiceProviderType;
checkServiceProvider={
  serviceProviderType:this.serviceProviderType.captain
}
  constructor(private modal: NgbModal,
    private router: Router,
    private _serviceProviderService : ServiceProviderService) { }

  ngOnInit(): void {
    this.checkCaptainExist();
  }
 
  checkCaptainExist()
  {
    this._serviceProviderService.isServiceProviderExist(this.checkServiceProvider).subscribe((res:any)=>{
if(res)
{ 
  this.isAlreadyCaptain=res;
}
    });
    
  }
}
