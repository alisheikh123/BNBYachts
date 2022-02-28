import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {
isAlreadyManager :false;
serviceProviderType= ServiceProviderType;
checkServiceProvider={
  serviceProviderType:this.serviceProviderType.management
}
  constructor(private modal: NgbModal,
    private router: Router,
    private _serviceProviderService : ServiceProviderService) { }

  ngOnInit(): void {
    this.checkManagerExist();
  }
 
  checkManagerExist()
  {
    this._serviceProviderService.isServiceProviderExist(this.checkServiceProvider).subscribe((res:any)=>{
if(res)
{ 
  this.isAlreadyManager=res;
}
    });
    
  }
}
