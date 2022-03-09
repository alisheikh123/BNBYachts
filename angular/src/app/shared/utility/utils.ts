import * as moment from 'moment';
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
}