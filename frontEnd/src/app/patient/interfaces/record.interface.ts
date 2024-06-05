import { Patient } from './patient.interface';
export interface Record {
  id:        string;
  patientId: string;
  date:      Date;
  procedure: Procedure[];
}

export interface Procedure {
  name:        string;
  description: string;
}
