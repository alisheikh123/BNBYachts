import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/core/Booking/booking.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
   styleUrls: ['./all-reservations.component.scss'],
  providers: [NgbRatingConfig]
})
export class AllReservationsComponent implements OnInit {
  month = [ { name:"chooose your month",Id:"0", selected:true}, {name: "January", Id: "1", },{name: "February",Id: "2",},{name: "March",Id: "3", },{name: "April", Id: "4",},{name: "May",Id: "5",},{ name: "June",Id: "6",},{ name: "July",Id: "7",},{ name: "August",Id: "8",},{ name: "September", Id: "9",},{name: "October", Id: "10", },{name: "November", Id: "11",},{name: "December",Id: "12",},];
  monthName:any;
  booking:any;
  monthSelect:any
  reservationForm:FormGroup;
  userId:string;
  boatbookingDetail:any;
  currentMonth:any;
  isRecordNotFound:boolean;
  constructor( private fb: FormBuilder,private service: BookingService,config: NgbRatingConfig) { 
    /* Rating Configuration*/
    config.max = 5;
    config.readonly = true;
    
  }

  ngOnInit(): void {
    this.userId ="567dfaff-d4eb-9d77-16f3-542ad546c346";
    this.service.bookingDetail(this.userId).subscribe((res:any)=>{
      this.booking =res;
      console.log(this.booking);
      if(this.booking.length==0)
      {
        this.isRecordNotFound=true;
      }
      else{
        
        res.forEach((elem:any) => {
          this.service.getBoatInfo(elem.boatId).subscribe((boatdetail:any)=>{
              elem.boatDetail = boatdetail;
              
          });
        });
        this.isRecordNotFound=false;
      }
      });
    this.reservationForm = this.fb.group({
      monthName: ['', [Validators.required]]
    })
  }
  selectedMonth(e:any) {
    console.log(e.value)
    this.monthName.setValue(e.target.value, {
      onlySelf: true
    })
  }
  upcomingReservation(upcoming?:any){
    this.userId ="567dfaff-d4eb-9d77-16f3-542ad546c346";
   
      this.service.upcomingbookingDetail(this.userId,upcoming).subscribe((res:any)=>{
        this.booking = res;
        if(this.booking.length==0)
        {
          this.isRecordNotFound=true;
        }
        else{
        res.forEach((elem:any) => {
          this.service.getBoatInfo(elem.boatId).subscribe((boatdetail:any)=>{
              elem.boatDetail = boatdetail;
          });
        });
        this.isRecordNotFound=false;
      }
   });
    

  }
  pastReservation(past?:any){
    this.userId ="567dfaff-d4eb-9d77-16f3-542ad546c346";
   
      this.service.pastbookingDetail(this.userId,past).subscribe((res:any)=>{
        this.booking = res;
        if(this.booking.length==0)
        {
          this.isRecordNotFound=true;
        }
        else{
        
        res.forEach((elem:any) => {
          this.service.getBoatInfo(elem.boatId).subscribe((boatdetail:any)=>{
            elem.boatDetail = boatdetail;
          });
        });
        this.isRecordNotFound=false;
      }
        });
  }
  
 
 

}
