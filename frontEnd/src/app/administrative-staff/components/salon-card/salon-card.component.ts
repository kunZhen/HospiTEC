import { Component, Input, OnInit } from '@angular/core';
import { Salon } from '../../interfaces/salon.interface';

@Component({
  selector: 'salons-salon-card',
  templateUrl: './salon-card.component.html',
  styleUrls: ['./salon-card.component.css']
})
export class SalonCardComponent implements OnInit {

  @Input() salon!: Salon;

  ngOnInit(): void {
    if (!this.salon) throw new Error('Salon property is required!');
  }

}
