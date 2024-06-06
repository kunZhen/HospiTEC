import { Pipe, PipeTransform } from '@angular/core';
import { Procedure } from '../interfaces/procedure.interface';

@Pipe({
  name: 'procedureImage'
})
export class ProcedureImagePipe implements PipeTransform {

  transform(procedure: Procedure): string {

    if ( !procedure.id && !procedure.name ) {
      return `assets/procedure/no-procedure.png`;
    }

    if ( procedure.name ) return `assets/procedure/${ procedure.name }.png`;

    return `assets/patient/no-procedure.png`;

  }

}
