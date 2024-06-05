import { Component, OnInit } from '@angular/core';
import { Salon } from '../../interfaces/salon.interface';
import { SalonService } from '../../services/salon.service';

@Component({
  selector: 'app-list-medical-salon',
  templateUrl: './list-medical-salon.component.html',
  styleUrls: ['./list-medical-salon.component.css']
})
export class ListMedicalSalonComponent implements OnInit {

  public salons: Salon[] = [];

  constructor( private salonService: SalonService ) { }

  ngOnInit(): void {
    this.salonService.getSalons().subscribe( salons => {
      this.salons = salons;
    });
  }

}
