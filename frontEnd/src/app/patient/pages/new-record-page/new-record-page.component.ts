import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Record } from '../../interfaces/record.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../../services/record.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-record-page',
  templateUrl: './new-record-page.component.html',
  styleUrls: ['./new-record-page.component.css']
})
export class NewRecordPageComponent implements OnInit {

  constructor( private patientService: PatientService,
                private fb: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private recordService: RecordService
   ) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.recordService.getRecordById(id) )
    )
    .subscribe( record => {

      if (!record) return this.router.navigate(['/patients']);

      this.recordForm.patchValue(
        {
          patientId: record.patientId,
          date: record.date,
          procedureName: record.procedure[0].name,
          procedureDescription: record.procedure[0].description
        }
      );
      this.currentRecordToUpdate = true;

      return;
    });

  }

  currentRecordToUpdate: Boolean = false;

  public recordForm = this.fb.group({
    patientId: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    date: [new Date(), Validators.required],
    procedureName: ['', Validators.required],
    procedureDescription: ['', Validators.required],
  });


  get currenRecord(): Record {
    const record = this.recordForm.value as unknown as Record;

    return record;
  }

  onSubmit() {

    if (this.recordForm.invalid) {
      return;
    }

    if (this.currentRecordToUpdate) {
      this.recordService.updateRecord(this.currenRecord).subscribe( record => {
        console.log(record);
      });

      return;
    }
    
    this.recordService.addRecord(this.currenRecord).subscribe( record => {
      console.log(record);
    });
  }

  onDeleteRecord() {

  }

}
