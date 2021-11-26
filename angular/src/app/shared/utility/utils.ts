
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
}