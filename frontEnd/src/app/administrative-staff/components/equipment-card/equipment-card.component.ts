import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from '../../interfaces/equipment.interface';

@Component({
  selector: 'equipments-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.css']
})
export class EquipmentCardComponent implements OnInit{

  @Input() equipment!: Equipment;

  ngOnInit(): void {
    if (!this.equipment) throw new Error('Equipment property is required!');
  }

}
