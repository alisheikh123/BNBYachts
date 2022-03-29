import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreatorTypes } from 'src/app/shared/enums/creator-types';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { utils } from 'src/app/shared/utility/utils';

@Component({
  selector: 'app-service-provider-information',
  templateUrl: './service-provider-information.component.html',
  styleUrls: ['./service-provider-information.component.scss']
})
export class ServiceProviderInformationComponent implements OnInit {
  reservationType= CreatorTypes;
  serviceProviderType= ServiceProviderType;
createdReservationInfo={
  reservationId: 0,
 reservationType:this.reservationType.Boatel,
 serviceProviderType: this.serviceProviderType.captain,

}
  constructor(public activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((res : any)  => {  
      if(!utils.isEmptyObject(res)){
      this.createdReservationInfo.reservationId= Number(res['id']);
      this.createdReservationInfo.reservationType= Number(res['type']);
      }    
    });
  }
explore(serviceprovidertype:ServiceProviderType){
  this.createdReservationInfo.serviceProviderType= serviceprovidertype;
  if(this.createdReservationInfo.reservationId== undefined || this.createdReservationInfo.reservationId==0)
  {
    this.route.navigate(['service-provider/services/', 
     this.createdReservationInfo.serviceProviderType ]);
  }
  else
  this.route.navigate(['service-provider/services/', 
   this.createdReservationInfo.reservationId,
    this.createdReservationInfo.reservationType,
  this.createdReservationInfo.serviceProviderType ]);
}
skip(){
  this.route.navigate(['/host-dashboard']);
}
}
