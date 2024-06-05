import { Component, Input } from '@angular/core';
import { Record } from '../../interfaces/record.interface';

@Component({
  selector: 'records-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.css']
})
export class RecordCardComponent {

  @Input() record!: Record;

  ngOnInit(): void {
    if (!this.record) throw new Error('Record property is required!');
  }

}
