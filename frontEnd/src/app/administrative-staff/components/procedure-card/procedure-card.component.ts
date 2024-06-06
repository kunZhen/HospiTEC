import { Component, Input, OnInit } from '@angular/core';
import { Procedure } from '../../interfaces/procedure.interface';

@Component({
  selector: 'procedures-procedure-card',
  templateUrl: './procedure-card.component.html',
  styleUrls: ['./procedure-card.component.css']
})
export class ProcedureCardComponent implements OnInit {

  @Input() procedure!: Procedure;

  ngOnInit(): void {
    if (!this.procedure) throw new Error('Procedure property is required!');
  }
}
