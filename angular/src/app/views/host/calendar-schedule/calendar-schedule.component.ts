import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from 'src/app/core/calendar/calendar.service';
import { EventService } from 'src/app/core/Event/event.service';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { ServiceType } from 'src/app/shared/enums/booking.constants';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';
import { YachtSearchService } from 'src/app/core/yacht-search/yacht-search.service';


@Component({
  selector: 'app-calendar-schedule',
  templateUrl: './calendar-schedule.component.html',
  styleUrls: ['./calendar-schedule.component.scss']
})
export class CalendarScheduleComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    themeSystem: 'bootstrap',
    initialView: 'dayGridMonth',
    //navLinkDayClick: this.handleDateClick.bind(this),
    events: [],
    eventClick: this.getEventDetails.bind(this),
    dayCellClassNames :this.getDayCell.bind(this)
  };
  boatCalendar: any;
  boats: any;
  boatId: number;
  SERVICE_TYPES = BoatServiceType;
  bookingsCalendar: any;
  showEventDetails: boolean = false;
  eventDetails: any;
  serviceType:number;

  constructor(private service: EventService, private boatService: YachtSearchService, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getBoats();
  }

  getBoats() {
    this.service.getBoats().subscribe(res => {
      this.boats = res;
      this.getBoatCalendar(this.boats[0]?.id, 1);
    });
  }
  getBoatCalendar(boatId: number, month: number) {
    this.boatId = boatId;
    this.calendarService.getBoatCalendar(boatId, month).subscribe((res: any) => {
      this.getBoatBookingsCalendar();
      this.boatCalendar = [...res?.data.charters, ...res?.data.events];
    })
  }

  getBoatBookingsCalendar() {
    this.calendarService.getBoatBookingsCalendar(this.boatId, 1).subscribe((res: any) => {
      this.bookingsCalendar = [...res?.data.boatels, ...res?.data.charters];
      this.bookingsCalendar = [...this.bookingsCalendar, ...res?.data.events];
      let event: any = [];
      this.bookingsCalendar.forEach((element: any) => {
        event.push({
          eventId: element.id,
          serviceType: element.serviceType,
          start: new Date(element.startDate),
          end: new Date(element.endDate),
          title: element.name,
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
      this.calendarOptions.events = event;
    })
  }

  getEventDetails(event: any) {
    this.showEventDetails = true;
    let data = {
      id: event.event._def.extendedProps.eventId,
      serviceType: event.event._def.extendedProps.serviceType
    };
    this.serviceType = data.serviceType;
    if (data.serviceType == this.SERVICE_TYPES.Boatel) {
      this.boatService.boatDetailsById(data.id).subscribe(res => {
        this.eventDetails = res;
      })
    }
    else if (data.serviceType == this.SERVICE_TYPES.Charter) {
      this.boatService.charterDetailsById(data.id).subscribe((res:any) => {
        this.eventDetails = res.charterDetails;
      })
    }
    else if (data.serviceType == this.SERVICE_TYPES.Event) {
      this.boatService.eventDetailsById(data.id).subscribe((res:any) => {
        this.eventDetails = res.eventDetails;
      })
    }
  }

  getDayCell(day:any){
    let date = day?.date;
    if(this.boatCalendar){
      let find = this.boatCalendar.find((res:any)=>res.startDate >= day.date && res.endDate <=day.date)
      if(find){
        return 'bg-grey';
      }
      else return '';
    }
    else return '';
  }
}
