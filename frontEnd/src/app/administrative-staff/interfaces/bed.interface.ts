export interface Bed {
  id: number;
  salonNumber: number;
  bedNumber: number;
  equipments: Equipment[];
  cui: string;
}

export interface Equipment {
  id: number;
  salonNumber: number;
}
