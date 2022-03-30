import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { EventService } from 'src/app/core/Event/event.service';
import { ServiceProviderService } from 'src/app/core/serviceprovider/serviceprovider.service';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { ContractStaus } from 'src/app/shared/enums/booking.constants';
import { ContractsModule } from '../../contracts.module';

@Component({
  selector: 'app-contract-listing',
  templateUrl: './contract-listing.component.html',
  styleUrls: ['./contract-listing.component.scss']
})
export class ContractListingComponent implements OnInit {

  contracts: any = [];
  // @Input() isHost:boolean = false;
  recordCount: number;
  CONTRACT_STATUS = ContractStaus;
  SERVICE_TYPES = BoatServiceType;
  boats: any;
  filter = {
    boatId: 0,
    serviceType: 0,
    statusId: this.CONTRACT_STATUS.All,
    date: new Date(),
    month: Number(moment().format('MM')),
    year: Number(moment().format('YYYY')),
    page: 1,
    pageSize: 5,
    isHost:false,
    serviceProviderId:0
  }
  totalRecord: number = 0;
  constructor(private service: ContractsService, private eventService: EventService,private auth:AuthService,  private _serviceProviderService:ServiceProviderService) { }

  ngOnInit(): void {
    this.getServiceProvider();
  }
  getBoats(Ids: number[] ) {
    this.eventService.getAssignedBoats(Ids).subscribe(res => {
      this.boats = res;
      console.log(this.boats);
    });
  }
  getServiceProvider()
  {
    this._serviceProviderService.getServiceProviderByUserId().subscribe((res:any)=>{
  if(res){
   this.filter.serviceProviderId=res.data.id;
   this.getAssignedBoatIds();
   this.getContracts();
  }
    });
  
  }

  getContracts() {
    this.service.getContractsServiceProvider(this.filter).subscribe((res: any) => {
      this.contracts = res?.data;
      this.contracts.forEach((element:any) => {
        this.auth.getUserInfoById(element.hostId).subscribe((res:any)=>{
          element.userName = res?.name;
        })
      });
      this.totalRecord = res?.totalCount;
    })
  }

  onPageChange(data: any) {
    this.filter.page = data.page;
    this.getContracts();
  }
  onPageSizeChange(data: any) {
    this.filter.page = 1;
    this.filter.pageSize = data.pageSize;
    this.getContracts();
  }
  onChangeServiceType(type: number) {
    this.filter.serviceType = type;
    this.getContracts();
  }
  getAssignedBoatIds(){
    this.service.getAssignedBoatIds(this.filter.serviceProviderId).subscribe((res:any)=>{
    if(res && res.data)
    {
      this.getBoats(res.data.ids);
     
    }
    });
  }
  onChangeBoat(boatId: number) {
    this.filter.boatId = boatId;
    this.getContracts();
  }
  onChangeStatus(status: number) {
    this.filter.statusId = status;
    this.getContracts();
  }
  applyDateFilter(data: any) {
    this.filter.year = Number(moment(data?.value).format("YYYY"));
    this.filter.month = Number(moment(data?.value).format("MM"));
    this.getContracts();
  }

}
