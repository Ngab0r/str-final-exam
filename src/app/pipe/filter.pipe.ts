import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], phrase: string): any {
    if (value == null || phrase == '') { return value; }
    return value.filter(item => item.name.toString().toLowerCase().includes(phrase.toLowerCase()));
    ;
  }

}
