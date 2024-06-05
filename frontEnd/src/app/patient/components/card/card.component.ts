import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';

@Component({
  selector: 'patients-patient-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() patient!: Patient;

  ngOnInit(): void {
    if (!this.patient) throw new Error('Patient property is required!');
  }



}
