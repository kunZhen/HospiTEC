import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Record } from '../../interfaces/record.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'list-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css']
})
export class RecordPageComponent {

  public records: Record[] = [];

  constructor(  private patientService: PatientService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private recordService: RecordService
   ) { }

  showTittle: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.recordService.getRecordsByPatientId(id) )
    )
    .subscribe( records => {
      this.records = records!;

      if (this.records.length > 0) {
        this.showTittle = true;
      } else {
        this.showTittle = false;
      }
    });
  }

}
