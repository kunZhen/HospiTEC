export interface Patient {
  id:                number;
  name:              string;
  firstLastName:     string;
  secondLastName:    string;
  firstPhoneNumber:  string;
  secondPhoneNumber: string;
  email:             string;
  password:          string;
  address:           string;
  birthDate:         Date;
  patology:          string;
  treatment:         string;
  alt_img?:          string;
}
