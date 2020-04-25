import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pageNumber",
})
export class PageNumberPipe implements PipeTransform {
  transform(pageNumber: any, max: number): any {
    if (max == 0) {
      return "0";
    } else if (pageNumber * 30 > max) {
      return `${(pageNumber - 1) * 30 + 1} - ${max}`;
    } else {
      return `${(pageNumber - 1) * 30 + 1} - ${pageNumber * 30}`;
    }
  }
}
