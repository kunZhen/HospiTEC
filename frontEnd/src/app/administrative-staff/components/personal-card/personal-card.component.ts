import { Component, Input, OnInit } from '@angular/core';
import { Personal } from '../../interfaces/personal.interface';

@Component({
  selector: 'personals-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})
export class PersonalCardComponent implements OnInit{

  @Input() personal!: Personal;

  ngOnInit() {
    if (!this.personal) throw new Error('Equipment property is required!');
  }

}
