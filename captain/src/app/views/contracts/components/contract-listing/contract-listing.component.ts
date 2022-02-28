import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { EventService } from 'src/app/core/Event/event.service';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { ContractStaus } from 'src/app/shared/enums/booking.constants';

@Component({
  selector: 'app-contract-listing',
  templateUrl: './contract-listing.component.html',
  styleUrls: ['./contract-listing.component.scss']
})
export class ContractListingComponent implements OnInit {

  contracts: any = [];
  @Input() isHost:boolean = false;
  recordCount: number;
  CONTRACT_STATUS = ContractStaus;
  SERVICE_TYPES = BoatServiceType;
  boats: any;
  filter = {
    boatId: 0,
    serviceType: 2,
    statusId: this.CONTRACT_STATUS.Pending,
    date: new Date(),
    month: Number(moment().format('MM')),
    year: Number(moment().format('YYYY')),
    page: 1,
    pageSize: 5,
    isHost:false
  }
  totalRecord: number = 0;
  constructor(private service: ContractsService, private eventService: EventService,private auth:AuthService) { }

  ngOnInit(): void {
    this.filter.isHost = this.isHost;
    this.init().subscribe((res: any) => {
      this.boats = res[0];
      this.contracts = res[1]?.data;
      this.contracts.forEach((element:any) => {
        this.auth.getUserInfoById(element.userId).subscribe((res:any)=>{
          element.userName = res?.name;
        })
      });
      this.totalRecord = res[1]?.totalCount;
    })
  }
  getBoats() {
    this.eventService.getBoats().subscribe(res => {
      this.boats = res;
    });
  }

  init() {
    let boats = this.eventService.getBoats();
    let contracts = this.service.getContracts(this.filter);
    return forkJoin([boats, contracts]);
  }

  getContracts() {
    this.service.getContracts(this.filter).subscribe((res: any) => {
      this.contracts = res?.data;
      this.contracts.forEach((element:any) => {
        this.auth.getUserInfoById(element.userId).subscribe((res:any)=>{
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
