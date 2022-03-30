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
      static restrictNumeric(e: any) {
        let input;
        if (e.metaKey || e.ctrlKey) {
          return true;
        }
        if (e.which === 32) {
          return false;
        }
        if (e.which === 0) {
          return true;
        }
        if (e.which < 33) {
          return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
      }
      static  restrictNegative(e:any){
        var inputKeyCode = e.keyCode ? e.keyCode : e.which;
    
        if (inputKeyCode != null) {
            if (inputKeyCode == 45) e.preventDefault();
        }
      }
}