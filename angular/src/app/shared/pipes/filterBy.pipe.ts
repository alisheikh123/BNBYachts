import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
    transform(arr: any[], prop: string, value:any): any {
        if (arr && value != null) {
           // if (!value) {
           //     return arr
           // } else {
                return arr.filter(obj => this.filter(obj[prop], value))
            //}
        } else {
            return []
        }
    }

    filter(source: string, target: string): boolean {
        return source == target;
    }
}
