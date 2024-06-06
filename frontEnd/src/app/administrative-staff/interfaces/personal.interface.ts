export interface Personal {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;  // cédula
  phone: string;
  address: string;
  dateOfBirth: Date;
  dateOfEntry: Date;
  role: 'administrative' | 'doctor' | 'nurse';  // diferenciación de roles
}
