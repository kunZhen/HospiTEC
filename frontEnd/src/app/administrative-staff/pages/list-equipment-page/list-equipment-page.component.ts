import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../interfaces/equipment.interface';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-list-equipment-page',
  templateUrl: './list-equipment-page.component.html',
  styleUrls: ['./list-equipment-page.component.css']
})
export class ListEquipmentPageComponent implements OnInit {

  public equipments: Equipment[] = [];

  constructor( private equipmentService: EquipmentService ) { }

  ngOnInit(): void {
    this.equipmentService.getEquipment().subscribe( equipment => {
      this.equipments = equipment;
    });
  }

}
