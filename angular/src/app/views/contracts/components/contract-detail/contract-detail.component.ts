import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from 'src/app/core/Boat/boat.service';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { EventService } from 'src/app/core/Event/event.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectionModalComponent } from 'src/app/views/host/boatel-bookings/booking-requests/rejection-modal/rejection-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ContractStaus } from 'src/app/shared/enums/booking.constants';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {

  contractId: number;
  contract: any;
  showMore: boolean = false;
  SERVICE_TYPES = BoatServiceType;
  CONTRACT_STATUS = ContractStaus;
  userId :string;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  attachmentsUrl = environment.S3BUCKET_URL + '/ContractsAttachments/';
  constructor(private activatedRoute: ActivatedRoute, private service: ContractsService,
         private boatService: YachtSearchService, private _location: Location
     ,private modal:NgbModal,private toastr:ToastrService,private router:Router) {
    this.contractId = this.activatedRoute.snapshot.params.contractId;
    this.userId = localStorage.getItem("userId") || "";
  }

  ngOnInit(): void {
    this.getContractDetailt();
  }

  getContractDetailt() {
    this.service.getContractById(this.contractId).subscribe((res: any) => {
      this.contract = res?.data;
      this.boatService.boatDetailsById(this.contract.boatId).subscribe(res => {
        this.contract.boat = res;
      });
    })
  }
  goBack() {
    this._location.back();
  }
  download(fileName:string) {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.setAttribute('target', '_blank');
    link.href = this.attachmentsUrl+fileName;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  reject() {
    let modal = this.modal.open(RejectionModalComponent, { centered: true, windowClass: 'custom-modal custom-small-modal' })
    modal.componentInstance.onSave.subscribe((reason: string) => {
      this.service.reject(this.contractId,reason).subscribe(res=>{
        this.modal.dismissAll();
        this.contract.status = this.CONTRACT_STATUS.Rejected;
        this.toastr.success('Contract rejected successfully','Contract');
      })
    })
  }
  confirm(){
    this.router.navigate(['/payments/contract-payments', this.contractId]);
  }
}
