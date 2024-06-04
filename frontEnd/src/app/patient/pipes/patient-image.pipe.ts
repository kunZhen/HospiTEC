import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../interfaces/patient.interface';

@Pipe({
  name: 'patientImage'
})
export class PatientImagePipe implements PipeTransform {


  transform(patient: Patient): string {

    if ( !patient.id && !patient.alt_img ) {
      return `assets/patient/no-image.png`;
    }

    if ( patient.alt_img ) return `assets/patient/${ patient.alt_img }.png`;

    if ( patient.alt_img === null ) return `assets/patient/no-image.png`;

    if ( patient.id ) {
      return `assets/patient/${ patient.id }.jpg`;
    }
    // return `assets/patient/no-image.png`;
    return `assets/patient/no-image.png`;

  }


}
