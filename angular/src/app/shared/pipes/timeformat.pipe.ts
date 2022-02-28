import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from 'src/app/core/translate.service';

@Pipe({
  name: 'timeformat',
  pure: false
})

export class TimeFormatPipe implements PipeTransform {
  constructor() { }
  transform(date: Date): any {
    return moment(date).format("h:mm a");
  }
}



