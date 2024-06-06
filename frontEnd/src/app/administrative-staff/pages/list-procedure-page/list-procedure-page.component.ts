import { Component, OnInit } from '@angular/core';
import { Procedure } from '../../interfaces/procedure.interface';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'app-list-procedure-page',
  templateUrl: './list-procedure-page.component.html',
  styleUrls: ['./list-procedure-page.component.css']
})
export class ListProcedurePageComponent implements OnInit {

  public procedures: Procedure[] = [];

  constructor( private procedureService: ProcedureService ) { }

  ngOnInit(): void {
    this.procedureService.getProcedure().subscribe( procedures => {
      this.procedures = procedures;
    });
  }



}
