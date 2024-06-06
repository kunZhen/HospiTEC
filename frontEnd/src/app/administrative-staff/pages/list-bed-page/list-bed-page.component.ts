import { Component, OnInit } from '@angular/core';
import { Bed } from '../../interfaces/bed.interface';
import { BedService } from '../../services/bed.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-list-bed-page',
  templateUrl: './list-bed-page.component.html',
  styleUrls: ['./list-bed-page.component.css']
})
export class ListBedPageComponent implements OnInit {

  public beds: Bed[] = []

  constructor(
    private bedService: BedService,
  ) { }

  /**
   * The ngOnInit function in TypeScript initializes the beds property by subscribing to the getBed
   * method of the bedService.
   */
  ngOnInit(): void {
    this.bedService.getBed().subscribe( bed => {
      this.beds = bed;
    });
  }

}
