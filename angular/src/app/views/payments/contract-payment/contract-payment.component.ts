import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from 'src/app/core/contracts/contracts.service';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { UserPaymentMethodsComponent } from '../user-payment-methods/user-payment-methods.component';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { PaymentsService } from 'src/app/core/Payment/payments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingConfirmedModalComponent } from '../charter-booking-payment/booking-confirmed-modal/booking-confirmed-modal.component';
import { BoatType } from 'src/app/shared/enums/boat-Type';
import { ServiceFee } from 'src/app/shared/interface/Service-fee';


@Component({
  selector: 'app-contract-payment',
  templateUrl: './contract-payment.component.html',
  styleUrls: ['./contract-payment.component.scss']
})
export class ContractPaymentComponent implements OnInit {

  contractId:number;
  contract:any;
  SERVICE_TYPES = BoatServiceType;
  assetsUrl = environment.S3BUCKET_URL + '/boatGallery/';
  isBookingConfirmed: boolean = false;
  isPaymentFailed: boolean = false;
  @ViewChild(UserPaymentMethodsComponent) paymentMethodsComponent: UserPaymentMethodsComponent;
  boatType = BoatType;
  serviceFee : ServiceFee;
  constructor(private activatedRoute:ActivatedRoute,private service:ContractsService,
    private boatService:YachtSearchService,private _location: Location,private cdr:ChangeDetectorRef,private paymentService:PaymentsService,private modal: NgbModal) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.contractId = Number(res['contractId']);
    });
    this.loadContractDetails();
    this.getServiceFeeByBoatType();
  }

  loadContractDetails(){
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
  async confirmBooking() {
    var amount = this.contract.quoteAmount;
    var token = (this.paymentMethodsComponent.addCardDetails ? await this.paymentMethodsComponent.createToken() : null);
    let model = {
      paymentId: this.paymentMethodsComponent.paymentMethodId,
      bookingId: this.contractId,
      isContract:true,
      amount: this.contract.qouteAmount + this.contract.boat.taxFee + Number(this.serviceFee?.serviceFee),
      IsSaveNewPaymentMethod: this.paymentMethodsComponent.isSaveNewPayment,
      token: token,
      description: this.contract?.boat.name + ' Contract Charges added'
    };
    this.paymentService.pay(model).subscribe(res => {
      if (res.returnStatus) {
        this.service.accept(this.contractId).subscribe(res=>{
          this.isBookingConfirmed = true;
          this.isPaymentFailed = false;
          this.modal.open(BookingConfirmedModalComponent, { windowClass: 'custom-modal custom-small-modal', centered: true,backdrop:'static' })
        })
      }
      else {
        this.isBookingConfirmed = false;
        this.isPaymentFailed = true;
      }
    })
  }

  disablePayment(){
    if(this.paymentMethodsComponent && (this.paymentMethodsComponent.paymentMethodId == null && this.paymentMethodsComponent.cardError == true)){
      return true;
    }
    return false;
  }
  ngAfterViewInit() {
    this.disablePayment();
    this.cdr.detectChanges();
  }
  getServiceFeeByBoatType() {
    this.boatService.getServiceFeeByBoatType(this.contract?.serviceType == this.SERVICE_TYPES.Charter ? this.boatType.Charter : this.boatType.Event).subscribe((res: any) => {
      this.serviceFee = res.data;
    });
  }
  getBasicTotal():number{
    return this.contract?.qouteAmount + this.contract?.boat.taxFee + Number(this.serviceFee?.serviceFee);
  }
}
