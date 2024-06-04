import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Record } from '../../interfaces/record.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../../services/record.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
                private recordService: RecordService,
                private snackbar: MatSnackBar,
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

      this.recordId = record.id;

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
  recordId: string = '';

  public recordForm = this.fb.group({
    patientId: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    date: [new Date(), Validators.required],
    procedureName: ['', Validators.required],
    procedureDescription: ['', Validators.required],
  });


  get currentRecord(): Record {
    const record = this.recordForm.value as unknown as Record;

    return record;
  }

  onSubmit() {

    if (this.recordForm.invalid) {
      return;
    }

    if (this.currentRecordToUpdate) {
      const updateRecord = {
        id: this.recordId,
        patientId: this.currentRecord.patientId,
        date: this.currentRecord.date,
        procedure: [
          {
            name: this.recordForm.value.procedureName!,
            description: this.recordForm.value.procedureDescription!
          }
        ]
      }

      this.recordService.updateRecord(updateRecord).subscribe( record => {
        this.showSnackbar( `${ record.patientId } actualizado` );
        this.router.navigate(['/patient', record.patientId]);
      });

      return;
    }

    const newRecord = {
      id: Math.floor(Math.random() * 1000).toString(),
      patientId: this.currentRecord.patientId,
      date: this.currentRecord.date,
      procedure: [
        {
          name: this.recordForm.value.procedureName!,
          description: this.recordForm.value.procedureDescription!
        }
      ]
    }

    this.recordService.addRecord(newRecord).subscribe( record => {
      this.router.navigate(['/patient', record.patientId]);
      this.showSnackbar( `${ record.patientId } creado` );
    });
  }

  onDeleteRecord() {

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }

}
