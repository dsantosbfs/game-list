import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, input: string) {
    if (input) {
      input = input.toLowerCase();
      return value.filter((el: any) => {
        const regex = new RegExp(input, 'g');

        return el.name.toLowerCase().match(regex);
      });
    }

    return value;
  }
}
