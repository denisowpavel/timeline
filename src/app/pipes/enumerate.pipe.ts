import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumerate',
  standalone: true,
})
export class EnumeratePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): number[] {
    if (value < 0) {
      return [];
    }
    return [...Array(value)].map((_, i) => i);
  }
}
