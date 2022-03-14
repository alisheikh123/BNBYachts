import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { CreatorTypes } from 'src/app/shared/enums/creator-types';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { ServiceProviderDTO } from 'src/app/shared/interface/service-provider/service-providerdto';
import { utils } from 'src/app/shared/utility/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-provider-services',
  templateUrl: './service-provider-services.component.html',
  styleUrls: ['./service-provider-services.component.scss']
})

export class ServiceProviderServicesComponent implements OnInit {
  profilePictureurl :string = environment.S3BUCKET_URL + '/profilePicture/';
  companyPictureurl :string = environment.S3BUCKET_URL + '/profilePicture/serviceprovider/companyprofile/';

  serviceProviderList=[]as Array<ServiceProviderDTO>;
  reservationType= CreatorTypes;
  serviceProviderType= ServiceProviderType;
  createdReservationInfo={
    reservationId:1,
   reservationType:this.reservationType.Boatel,
   serviceProviderType: this.serviceProviderType.captain,
  
  }
  serviceProviderSearchParam = {
    location: '',
    latitude: 31.4697,
    longitude: 74.2728,
    serviceProviderType: this.serviceProviderType.captain,
    avaliableDate: new  Date(),
  };
  isSubmitted = false;
  constructor(public activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
   private yachtSearchService: YachtSearchService,
   private serviceproviderService: ServiceProviderService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res : any) => {
      if(!utils.isEmptyObject(res))
      {
        if(res['reservationid'])
        {
          this.createdReservationInfo.reservationId= Number(res['reservationid']);
        }
        if(res['serviceprovidertype'])
        {
          this.createdReservationInfo.serviceProviderType=Number(res['serviceprovidertype']);
        }     
     if(res['reservationtype'])
     {
     this.createdReservationInfo.reservationType=Number(res['reservationtype']);
     }
     this.setFilterData();
      }
    });
  }
  handleAddressChange(address: any) {
    this.serviceProviderSearchParam.location = address.formatted_address;
    this.serviceProviderSearchParam.latitude = address.geometry.location.lat();
    this.serviceProviderSearchParam.longitude = address.geometry.location.lng();
  }
  getBoatDetail(id: number){
this.yachtSearchService.boatDetailsById(id).subscribe((res: any) => {
if(res)
{
  this.serviceProviderSearchParam.location=res.location;
  this.serviceProviderSearchParam.latitude=res.latitude;
  this.serviceProviderSearchParam.longitude= res.longitude;
  this.serviceProviderSearchParam.avaliableDate= new Date(res.checkinTime);
  this.getServiceProviderDetail();
        
}
});
  }
  getEventDetail(id:number){
    this.yachtSearchService.eventDetailsById(id).subscribe((res:any)=>{
if (res )
{
  this.serviceProviderSearchParam.location=res.eventDetails.location;
  this.serviceProviderSearchParam.longitude=res.eventDetails.locationLong;
  this.serviceProviderSearchParam.latitude=res.eventDetails.locationLat;
 this.serviceProviderSearchParam.avaliableDate= new Date(res.eventDetails.startDateTime);
 this.getServiceProviderDetail();
} 
});
  }
  getCharterDetail(id:number){
    this.yachtSearchService.charterDetailsById(id).subscribe((res:any)=>{
if (res )
{
  this.serviceProviderSearchParam.location=res.charterDetails.departingFrom ;
  this.serviceProviderSearchParam.longitude=res.charterDetails.departingLongitude;
  this.serviceProviderSearchParam.latitude=res.charterDetails.departingLatitude;
 this.serviceProviderSearchParam.avaliableDate= new Date(res.charterDetails.departureFromDate);
 this.getServiceProviderDetail();
} 
});
  }
  setFilterData()
  {
    if(this.createdReservationInfo.reservationType==this.reservationType.Boatel)
     {

      this.getBoatDetail(this.createdReservationInfo.reservationId);
     }
    else if(this.createdReservationInfo.reservationType==this.reservationType.Event)
     {

      this.getEventDetail(this.createdReservationInfo.reservationId);
     }
     else if(this.createdReservationInfo.reservationType==this.reservationType.Charter)
     {

      this.getCharterDetail(this.createdReservationInfo.reservationId);
     }
     else
     this.getServiceProviderDetail();
  }
  getServiceProviderDetail()
  {
 this.serviceproviderService.searchServiceProvider(this.serviceProviderSearchParam).subscribe((res:any)=>{
   if(res)
   {
       this.serviceProviderList=res.data;
   }

 });
  }
  ViewProfile(id :number)
  {
    this.route.navigate(['service-provider/service-provider-detail/',id]);
  }
}
