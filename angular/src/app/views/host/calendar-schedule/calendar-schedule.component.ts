import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from 'src/app/core/calendar/calendar.service';
import { EventService } from 'src/app/core/Event/event.service';
import { CalendarOptions} from '@fullcalendar/core';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';


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
   /// eventColor: '#091654',
    ///eventOverlap: false,
    ///dayCellContent: this.handleDayRender.bind(this),
    // dayCellDidMount: function () {
    //   let el = document.querySelectorAll('.fc-daygrid-day-top');
    //   if (el.length > 0) {
    //     for (var i = 0; i < el.length; i++) {
    //       el[i].classList.remove('fc-daygrid-day-top');
    //     }
    //   }
    // }
  };
  boatCalendar: any;
  boats: any;
  boatId:number;
  SERVICE_TYPES = BoatServiceType;
  
  constructor(private service: EventService, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getBoats();
  }

  getBoats() {
    this.service.getBoats().subscribe(res => {
      if(res){
        this.boats = res;
        this.getBoatCalendar(this.boats[0]?.id,1);
      }
    });
  }
  getBoatCalendar(boatId: number, month: number) {
    this.boatId = boatId;
    this.calendarService.getBoatCalendar(boatId, month).subscribe((res:any) => {
      this.boatCalendar = [ ...res?.data.charters, ...res?.data.events];
      let event:any = [];
      this.boatCalendar.forEach((element:any) => {
        event.push({
          start: new Date(element.startDate),
          end: new Date(element.endDate),
          title: element.name,
          allDay: true,    
         backgroundColor :"#091654",
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
}
