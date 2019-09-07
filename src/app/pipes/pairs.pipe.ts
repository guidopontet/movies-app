import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pairs'
})

/* Pipe to transform an array, to one of pairs */
export class PairsPipe implements PipeTransform {

  transform(arr: any[]): any[] {
    let pairsArray = [];

    if (arr) {
      pairsArray = arr.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }

        return result;
      }, []);
    }

    return pairsArray;
  }
}
