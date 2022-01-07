import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from 'src/app/core/calendar/calendar.service';
import { EventService } from 'src/app/core/Event/event.service';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Calendar ,CalendarOptions} from '@fullcalendar/core';
import { ServiceType } from 'src/app/shared/enums/booking.constants';
import { BoatServiceType } from 'src/app/shared/enums/boat-service-type';



@Component({
  selector: 'app-calendar-schedule',
  templateUrl: './calendar-schedule.component.html',
  styleUrls: ['./calendar-schedule.component.scss']
})
export class CalendarScheduleComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    themeSystem: 'journal',
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
  rates = [{
    date: '2021-10-04',
    rate: 30
  },
  {
    date: '2021-10-05',
    rate: 30
  }
    ,
  {
    date: '2021-10-06',
    rate: 30
  }, {
    date: '2021-10-07',
    rate: 30
  }
    , {
    date: '2021-10-08',
    rate: 100
  },
  {
    date: '2021-10-09',
    rate: 200
  }];
  boatCalendar: any;
  boats: any;
  boatId:number;
  SERVICE_TYPES = BoatServiceType;
  
  constructor(private service: EventService, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getBoats();
  }
  handleDayRender(arg: any) {
    let date = moment(arg.date).format("YYYY-MM-DD");
    let dateRate = this.rates.find(res => res.date == date);
    let elem = document.createElement('div');
    elem.className = "d-flex justify-content-between pb-3";
    elem.innerHTML = '<div><span class=badge badge-danger>' + (dateRate ? '$' + dateRate?.rate : '') + '</span></div><a class=pr-1>' + arg.dayNumberText + '</a>';
    let arrayOfDomNodes = [elem]
    return { domNodes: arrayOfDomNodes }
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  getBoats() {
    this.service.getBoats().subscribe(res => {
      this.boats = res;
      this.getBoatCalendar(this.boats[0]?.id,1);
    });
  }
  getBoatCalendar(boatId: number, month: number) {
    this.calendarService.getBoatCalendar(boatId, month).subscribe((res:any) => {
      this.boatCalendar = [ ...res?.data.charters, ...res?.data.events];
      let event:any = [];
      this.boatCalendar.forEach((element:any) => {
        event.push({
          start: new Date(element.startDate),
          end: new Date(element.endDate),
          title: element.name,
          allDay: true,    
         backgroundColor :"#091654", //element.serviceType === this.SERVICE_TYPES.Boatel ? 'red' 
      //: (element.serviceType === this.SERVICE_TYPES.Charter ? '#091654' : 'black'),
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
