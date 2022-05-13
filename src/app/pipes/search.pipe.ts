import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'firstNameFilter',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      return val.resource?.name?.[0].family.toLocaleLowerCase().includes(args);
    });
  }
}

@Pipe({
  name: 'lastNameFilter',
})
export class SearchLastNamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      return val.resource?.name?.[0].given?.[0]
        .toLocaleLowerCase()
        .includes(args);
    });
  }
}
