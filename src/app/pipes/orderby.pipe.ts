import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderByPipe',
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, args: string): Array<any> {
    if (typeof args === 'undefined' || typeof args[0] === 'undefined') {
      return array;
    }

    const direction = args[0][0];
    const field = args.replace('-', '');

    array.sort((a: any, b: any) => {
      if (direction === '-') {
        if (a[field] > b[field]) { return -1; }
        if (a[field] < b[field]) { return 1; }
      } else {
        if (a[field] < b[field]) { return -1; }
        if (a[field] > b[field]) { return 1; }
      }
      return 0;
    });

    return array;
  }
}
