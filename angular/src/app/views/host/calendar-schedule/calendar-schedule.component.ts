import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from 'src/app/core/calendar/calendar.service';
import { EventService } from 'src/app/core/Event/event.service';
import { CalendarOptions } from '@fullcalendar/core';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debug } from 'console';


@Component({
  selector: 'app-calendar-schedule',
  templateUrl: './calendar-schedule.component.html',
  styleUrls: ['./calendar-schedule.component.scss']
})
export class CalendarScheduleComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    themeSystem: 'bootstrap',
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.getEventDetails.bind(this),
    dateClick: this.getDayClick.bind(this),
    datesSet: this.getMonth.bind(this),
    displayEventTime: false
    //height:1100,
  };
  boatCalendar: any;
  boats: any;
  boatId: number;
  SERVICE_TYPES = BoatServiceType;
  bookingsCalendar: any;
  showEventDetails: boolean = false;
  eventDetails: any;
  serviceType: number;
  isBookingEvent: boolean = false;
  dayCalendar = {
    isAvailable: true,
    fromDate: '',
    toDate: '',
    amount: 0,
    notes: '',
    boatEntityId: 0
  };
  booking = {
    id: 0,
    serviceType: 0
  };
  totalChartersRequest: number = 0;
  totalEventRequest: number = 0;
  showNote: boolean = false;
  activeMonth: number = Number(moment().format("MM"));
  @ViewChild('detailModal', { static: true }) templateRef: any;
  constructor(private service: EventService, private boatService: YachtSearchService,
    private authService: AuthService,private modal:NgbModal,
    private calendarService: CalendarService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getBoats();
  }

  getMonth(calendar: any) {
    let date = moment(calendar.start).add(10, 'days');
    this.activeMonth = Number(moment(date).format("MM"));
    this.getBoatCalendar(this.boatId);
  }

  getBoats() {
    this.service.getBoats().subscribe(res => {
      this.boats = res;
      let month = Number(moment().format("MM"));
      this.getBoatCalendar(this.boats[0]?.id);
    });
  }
  getBoatCalendar(boatId: number) {
    this.boatId = boatId;
    this.calendarService.getBoatCalendar(boatId, this.activeMonth).subscribe((res: any) => {
      this.boatCalendar = [...res?.data.boatels, ...res?.data.charters];
      this.boatCalendar = [...this.boatCalendar, ...res?.data.events];
      this.getBoatBookingsCalendar(this.activeMonth);
    })
  }

  getBoatBookingsCalendar(month: number) {
    this.calendarService.getBoatBookingsCalendar(this.boatId, month).subscribe((res: any) => {
      this.bookingsCalendar = res?.data.boatels;
      let charterBookings = res?.data.charters;
      charterBookings.forEach((element: any) => {
        let find = this.bookingsCalendar.find((res: any) => res.id == element.id && res.serviceType == element.serviceType);
        if (!find) {
          this.bookingsCalendar.push(element);
        }
      });
      let eventBookings = res?.data.events;
      eventBookings.forEach((element: any) => {
        let find = this.bookingsCalendar.find((res: any) => res.id == element.id && res.serviceType == element.serviceType);
        if (!find) {
          this.bookingsCalendar.push(element);
        }
      });
      this.totalChartersRequest = res?.data.charters.length;
      this.totalEventRequest = res?.data.events.length;
      this.bindEvents();
    })
  }
  bindEvents() {
    let event: any = [];
    this.bookingsCalendar.forEach((element: any) => {
      console.log(event);
      event.push({
        eventId: element.id,
        serviceType: element.serviceType,
        isBooking: true,
        bookingId: element.bookingId,
        userId: element.userId,
        start: element.startDate,
        end: element.endDate,
        title: element.serviceType === this.SERVICE_TYPES.Boatel ? element.name
          : (element.serviceType === this.SERVICE_TYPES.Charter ? this.totalChartersRequest + ' Requests' : this.totalEventRequest + ' Requests'),
        allDay: false,
        backgroundColor: element.serviceType === this.SERVICE_TYPES.Boatel ? "#091654"
          : (element.serviceType === this.SERVICE_TYPES.Charter ? 'rgb(199 130 5)' : 'rgb(151 19 141)'),
        //draggable: true,
        // resizable: {
        //   beforeStart: true,
        //   afterEnd: true,
        // }
      });
    });
    this.boatCalendar.forEach((element: any) => {
      event.push({
        eventId: element.id,
        serviceType: element.serviceType,
        isBooking: false,
        title: element.startDate == element.endDate && element.isAvailable ? element.name +' $':'',
        textColor: '#f000',
        start: element.startDate,
        end: element.endDate,
        allDay: true,
        backgroundColor: element.startDate == element.endDate && element.isAvailable  ? "#FFFFFF" : "#777777",
        display: 'background'
      });
    });
    this.calendarOptions.events = event;
  }

  getEventDetails(event: any) {
    let data = {
      id: event.event._def.extendedProps.eventId,
      serviceType: event.event._def.extendedProps.serviceType,
      isBooking: event.event._def.extendedProps.isBooking,
      userId: event.event._def.extendedProps.userId
    };
    this.isBookingEvent = data.isBooking;
    if (this.isBookingEvent) {
      this.booking.id = event.event._def.extendedProps.bookingId;
      this.booking.serviceType = data.serviceType
    }
    this.serviceType = data.serviceType;
    if (data.isBooking) {
      this.showEventDetails = true;
      if (data.serviceType == this.SERVICE_TYPES.Boatel) {
        this.boatService.boatDetailsById(data.id).subscribe(res => {
          this.eventDetails = res;
          this.authService.getUserInfoById(data.userId).subscribe(res => {
            this.eventDetails.userInfo = res;
          });
        })
      }
      this.modal.open(this.templateRef, {centered: true ,windowClass:'custom-modal custom-small-modal'});
    }
  }

  saveCalendar() {
    this.dayCalendar.boatEntityId = this.boatId;
    this.calendarService.updateCalendar(this.dayCalendar).subscribe(res => {
      let event = {
        startDate: this.dayCalendar.fromDate,
        endDate: this.dayCalendar.toDate,
        allDay: true,
        display: 'background',
        name: this.dayCalendar.isAvailable ? this.dayCalendar.amount:'Blocked DAy',
        serviceType: this.SERVICE_TYPES.Boatel,
        isAvailable:this.dayCalendar.isAvailable
      }
      let findIndex = this.boatCalendar.findIndex((res:any)=>moment(res.startDate).format("DD-MM-YYYY") == moment(this.dayCalendar.fromDate).format("DD-MM-YYYY") && 
      moment(res.endDate).format("DD-MM-YYYY") == moment(this.dayCalendar.toDate).format("DD-MM-YYYY"));
      if(findIndex >= 0){
        this.boatCalendar.splice(findIndex,1);
      }
      this.boatCalendar.push(event);
      this.bindEvents();
      this.showEventDetails = false;
      this.modal.dismissAll();
      this.toastr.success('Calendar Updated Successfully', 'Update')
    })
  }
  goToReservation() {
    if (this.booking.serviceType == this.SERVICE_TYPES.Boatel) {
      this.router.navigate(['/boat-listing/reservation-detail', this.booking.id])
    }
    else if(this.booking.serviceType == this.SERVICE_TYPES.Charter){
      this.router.navigate(['/host/my-bookings'],{fragment:'charters'})
    }
    else if(this.booking.serviceType == this.SERVICE_TYPES.Event){
      this.router.navigate(['/host/my-bookings'],{ fragment: 'events' })
    }
    this.modal.dismissAll();
  }
  getDayClick(event: any) {
    if (new Date(event.date) >= new Date()) {
      this.dayCalendar.fromDate = moment(event.date).format("YYYY-MM-DD");
      this.dayCalendar.toDate = moment(event.date).format("YYYY-MM-DD");
      let isBooking = this.bookingsCalendar.find((res: any) =>
        moment(event.date).isBetween(moment(res.startDate), moment(res.endDate))
        || moment(res.startDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD')
        || moment(res.endDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD'));
      // let isAdded = this.boatCalendar.find((res: any) =>
      //   moment(event.date).isBetween(moment(res.startDate), moment(res.endDate))
      //   || moment(res.startDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD')
      //   || moment(res.endDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD'));
      if (isBooking == undefined || isBooking == null) {
        this.showEventDetails = true;
        this.isBookingEvent = false;
        this.calendarService.getDayCalendar(this.boatId, moment(this.dayCalendar.fromDate).format("YYYY-MM-DD")).subscribe((res: any) => {
          if (res.data != null) {
            this.dayCalendar = res.data;
          }
          else{
            this.dayCalendar.amount =0;
            this.dayCalendar.notes= '';
          }
          this.modal.open(this.templateRef, {centered: true ,windowClass:'custom-modal custom-small-modal'});
        })
      }
    }
  }
  closeModal(){
    this.modal.dismissAll();
  }
}
