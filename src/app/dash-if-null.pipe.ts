import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dashIfNull",
})
export class DashIfNullPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value == "" || value == null) {
      return "-";
    } else {
      return value;
    }
    // return null;
  }
}
