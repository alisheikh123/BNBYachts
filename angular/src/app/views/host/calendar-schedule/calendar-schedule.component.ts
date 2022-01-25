import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from 'src/app/core/calendar/calendar.service';
import { EventService } from 'src/app/core/Event/event.service';
import { CalendarOptions } from '@fullcalendar/core';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';


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
    datesSet:this.getMonth.bind(this)
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
  totalChartersRequest:number = 0;
  totalEventRequest:number = 0;
  showNote: boolean = false;
  activeMonth:number = Number(moment().format("MM"));
  constructor(private service: EventService, private boatService: YachtSearchService,
    private authService:AuthService,
    private calendarService: CalendarService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getBoats();
  }

  getMonth(calendar:any){
    let date = moment(calendar.start).add(10,'days');
    this.activeMonth = Number(moment(date).format("MM"));
    this.getBoatCalendar(this.boatId);
  }

  getBoats() {
    this.service.getBoats().subscribe(res => {
      this.boats = res;
      let month =Number(moment().format("MM"));
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

  getBoatBookingsCalendar(month:number) {
    this.calendarService.getBoatBookingsCalendar(this.boatId, month).subscribe((res: any) => {
      this.bookingsCalendar = [...res?.data.boatels, ...res?.data.charters];
      this.bookingsCalendar = [...this.bookingsCalendar, ...res?.data.events];
      this.totalChartersRequest = res?.data.charters.length;
      this.totalEventRequest = res?.data.events.length;
      this.bindEvents();
    })
  }
  bindEvents() {
    let event: any = [];
    this.bookingsCalendar.forEach((element: any) => {
      event.push({
        eventId: element.id,
        serviceType: element.serviceType,
        isBooking: true,
        bookingId: element.bookingId,
        userId: element.userId,
        start: new Date(element.startDate),
        end: new Date(element.endDate),
        title: element.serviceType === this.SERVICE_TYPES.Boatel ? element.name
        : (element.serviceType === this.SERVICE_TYPES.Charter ? this.totalChartersRequest + ' Requests' : this.totalEventRequest + ' Requests'),
        allDay: true,
        backgroundColor: element.serviceType === this.SERVICE_TYPES.Boatel ? "#091654"
          : (element.serviceType === this.SERVICE_TYPES.Charter ? '#FFA500' : '#00FF00'),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        }
      });
    });
    this.boatCalendar.forEach((element: any) => {
      event.push({
        eventId: element.id,
        serviceType: element.serviceType,
        isBooking: false,
        title: '20$',
        textColor: '#f000',
        start: new Date(element.startDate),
        end: new Date(element.endDate),
        allDay: true,
        backgroundColor: "#777777",
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
      userId:event.event._def.extendedProps.userId
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
          this.authService.getUserInfoById(data.userId).subscribe(res=>{
            this.eventDetails.userInfo = res;
          });
        })
      }
    }
  }

  saveCalendar() {
    this.dayCalendar.boatEntityId = this.boatId;
    this.calendarService.updateCalendar(this.dayCalendar).subscribe(res => {
      let event = {
        startDate:this.dayCalendar.fromDate,
        endDate:this.dayCalendar.toDate,
        title:'Blocked DAy',
        serviceType:this.SERVICE_TYPES.Boatel
      }
      this.boatCalendar.push(event);
      if(!this.dayCalendar.isAvailable){
        this.bookingsCalendar.push(event);
      }
      this.bindEvents();
      this.showEventDetails = false;
      this.toastr.success('Calendar Updated Successfully', 'Update')
    })
  }
  goToReservation() {
    if (this.booking.serviceType == this.SERVICE_TYPES.Boatel) {
      this.router.navigate(['/boat-listing/reservation-detail', this.booking.id])
    }
    else {
      this.router.navigate(['/host/my-bookings'])
    }
  }
  getDayClick(event: any) {
    if (new Date(event.date) >= new Date()) {
      this.dayCalendar.fromDate = moment(event.date).format("YYYY-MM-DD");
      this.dayCalendar.toDate = moment(event.date).format("YYYY-MM-DD");
      let isBooking = this.bookingsCalendar.find((res: any) =>
        moment(event.date).isBetween(moment(res.startDate), moment(res.endDate))
        || moment(res.startDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD')
        || moment(res.endDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD'));
      let isAdded = this.boatCalendar.find((res: any) =>
        moment(event.date).isBetween(moment(res.startDate), moment(res.endDate))
        || moment(res.startDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD')
        || moment(res.endDate).format('YYYY-MM-DD') == moment(event.date).format('YYYY-MM-DD'));
      if (isBooking == null && isAdded == null) {
        this.showEventDetails = true;
        this.calendarService.getDayCalendar(this.boatId, moment(this.dayCalendar.fromDate).format("YYYY-MM-DD")).subscribe((res: any) => {
          if (res.data != null) {
            this.dayCalendar = res.data;
          }
        })
      }
    }
  }
}
