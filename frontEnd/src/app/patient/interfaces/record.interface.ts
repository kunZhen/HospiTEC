export interface Record {
  id:        string;
  date:      Date;
  procedure: Procedure[];
}

export interface Procedure {
  name:        string;
  description: string;
}
