import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
  pure:false
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): any[] {
    const groupedCollection = collection.reduce((previous, current)=> {
        if(!previous[current[property]]) {
            previous[current[property]] = [current];
        } else {
            previous[current[property]].push(current);
        }

        return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }
}