import { Pipe, PipeTransform } from '@angular/core';
import { Sorter } from '../model/sorter';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], sorter: Sorter): any[] {
    console.log(sorter.sortKey);

    if (typeof (value) === 'undefined' || !Array.isArray(value) || typeof (sorter.sortKey) === 'undefined') { return value };

    return value.sort((a: any, b: any) => SorterPipe.compare(a[sorter.sortKey], b[sorter.sortKey], sorter.sortAscend));
  }
  static compare(a: any, b: any, isAscending: boolean): number {
    if (typeof (a) === 'number' && typeof (b) === 'number') {
      return isAscending ? a - b : b - a;
    }
    else {
      return isAscending ? a.toString().toLocaleLowerCase().localeCompare(b.toString().toLocaleLowerCase()) :
        b.toString().toLocaleLowerCase().localeCompare(a.toString().toLocaleLowerCase());
    }
  }

}
