import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'mySlice'
})
export class MySlicePipe implements PipeTransform {

  transform(obj: any[], begin: any, length: any): any {
    if (obj) {
      const strObj = JSON.stringify(obj);
      const copyObj = JSON.parse(strObj);
      return copyObj.splice(begin, length);
    }
    else {
      return obj;
    }
  }
}