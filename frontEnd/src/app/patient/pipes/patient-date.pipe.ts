import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patientDate'
})
export class PatientDatePipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    let date: Date;
    if (typeof value === 'string') {
      date = new Date(value);
    } else {
      date = value;
    }

    if (isNaN(date.getTime())) {
      return '';
    }

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

}
