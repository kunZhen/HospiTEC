import { Component, Input, OnInit } from '@angular/core';
import { Bed } from '../../interfaces/bed.interface';
import { Equipment } from '../../interfaces/equipment.interface';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'beds-bed-card',
  templateUrl: './bed-card.component.html',
  styleUrls: ['./bed-card.component.css']
})
export class BedCardComponent implements OnInit {

  @Input() bed!: Bed;
  equipments: Equipment[] = [];

  constructor(
    private equipmentService: EquipmentService
  ) { }

  ngOnInit(): void {
    if (!this.bed) {
      throw new Error('Bed property is required!');
    }

    if (this.bed.equipments && this.bed.equipments.length > 0) {
      this.bed.equipments.forEach(equipment => {
        this.equipmentService.getEquipmentById(equipment.id.toString()).subscribe(equipmentData => {
          if (equipmentData) {
            this.equipments.push(equipmentData);
          }
        });
      });
    }

    console.log(this.equipments);
  }

}
