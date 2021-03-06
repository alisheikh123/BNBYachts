import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/app/core/chat/chat.service';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { ServiceProviderType } from 'src/app/shared/enums/service-provider-type';
import { UploadDefault } from 'src/app/shared/enums/user-roles';
import { ServiceProviderDTO } from 'src/app/shared/interface/service-provider/service-providerdto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-provider-detail',
  templateUrl: './service-provider-detail.component.html',
  styleUrls: ['./service-provider-detail.component.scss']
})
export class ServiceProviderDetailComponent implements OnInit {
  
id:number;
senderId:string;
profilePictureurl :string = environment.S3BUCKET_URL + '/profilePicture/';
companyPictureurl :string = environment.S3BUCKET_URL + '/profilePicture/serviceprovider/companyprofile/';
userDefaults = UploadDefault;
serviceProviderType= ServiceProviderType;
serviceProvider:ServiceProviderDTO=<ServiceProviderDTO>{};
  constructor(public activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
   private serviceproviderService: ServiceProviderService,
   private chatService : ChatService) { 
    this.senderId = localStorage.getItem('userId')?.toString() || "";
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.id= Number(res['id']);
      this.getServiceProviderDetail();
  });

}
highlightAvliableDays(args:any)
{
  
  if(args)
  {
    if ( args.date >= this.serviceProvider.fromDate && args.date <= this.serviceProvider.toDate)
    {
      
    args.element.classList.add('e-selected');
    }
   
  }
}
getServiceProviderDetail(){
this.serviceproviderService.getServiceProviderById(this.id).subscribe((res:any)=>{
if(res)
{
  this.serviceProvider=res.data;
  if(this.serviceProvider.fromDate!=null && this.serviceProvider.toDate !=null)
    this.serviceProvider.fromDate= new Date(this.serviceProvider.fromDate);
    this.serviceProvider.toDate = new Date(this.serviceProvider.toDate);
}
});

}
sendMessage() {
  this.route.navigate(['/chat', this.serviceProvider.userId]);
}

}
