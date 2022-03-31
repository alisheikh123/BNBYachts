import * as signalR from '@microsoft/signalr';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
export class utils {
    static formatDate(date: any) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    static formatTime(date:any){
        let dateform = new Date(date);
       return dateform.toLocaleTimeString('en-US')

      }
      static differenceDates(firstDate:any,secondDate:any){
        var startDate = moment(firstDate, 'DD-MM-YYYY'); 
        var EndDate = moment(secondDate, 'DD-MM-YYYY');
        var Days =  EndDate.diff(startDate, 'days');
        return Days < 0 ? 0 : Days + 1;
      }
      static differenceWithoutAddition(firstDate:any,secondDate:any){
        var startDate = moment(firstDate, 'DD-MM-YYYY'); 
        var EndDate = moment(secondDate, 'DD-MM-YYYY');
        var Days =  EndDate.diff(startDate, 'days');
        return Days < 0 ? 0 : Days+1;
      }
      static convertToDate(date:Date)
      {
          return moment(date).format("DD-MM-YYYY");
      }
       static convertToTime(date:Date)
      {
          return moment(date).format("HH:mm");
      }
      static concatinateDateTime(date:Date,time:Date)
      {
          return  moment(date).format("YYYY-MM-DD") + " " + moment(time).format("hh:mm a");
      }
    static  isEmptyObject(obj:any) {
        return (obj && (Object.keys(obj).length === 0));

      }
      static convertToCalenderDate(date:Date)
      {
          return moment(date).format("MM/DD/YYYY");
      }
      static convertDateToYearMonthDay(date:Date)
      {
          return moment(date).format("YYYY-MM-DD");
      }
      static getDaysBetweenTwoDates(date1:Date,date2:Date)
      {
        let firstDate = moment(date1).format('YYYY-MM-DD hh:mm:ss a');
        let secondDate = moment(date2).format('YYYY-MM-DD hh:mm:ss a');
        return Math.round(moment.duration(moment(secondDate).diff(firstDate)).asDays())
      }
      static getRemaingHours(firstDateTime:any,secondDateTime:any)
      {
        return Math.abs(firstDateTime - secondDateTime ) / 36e5;
      }
      static getTime(dateTime:any)
      {
        return moment(dateTime).format("hh:mm a")
      }
      static getSignalRConnection()
      {
        const connection = new signalR.HubConnectionBuilder()
          .configureLogging(signalR.LogLevel.Information)
          .withUrl(environment.NOTIFICATION_APP_URL + '/signalr-hubs/Notification')
          .build();
          return connection;
      }
      static formatDateTime(date:any) {
       return moment(date).format('YYYY-MM-DD hh:mm:ss a');
      }
      static getremaingHours(date:string){
       return moment.duration(moment(date).diff(moment())).asHours()
      }
      static differenceDateTime(firstDate:any,secondDate:any){
        var startDate = moment(firstDate, 'DD-MM-YYYY hh:mm:ss a');
        var EndDate = moment(secondDate, 'DD-MM-YYYY hh:mm:ss a');
        var Days =  EndDate.diff(startDate, 'days');
        return Days < 0 ? 0 : Days + 1;
      }
}