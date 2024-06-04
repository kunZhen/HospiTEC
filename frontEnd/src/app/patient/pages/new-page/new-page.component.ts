import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Patient } from '../../interfaces/patient.interface';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  constructor(  private fb: FormBuilder,
                private patientService: PatientService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackbar: MatSnackBar,
                private dialog: MatDialog
             ) { }

  public patientForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    name: ['', Validators.required],
    firstLastName: ['', Validators.required],
    secondLastName: ['', Validators.required],
    firstPhoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    secondPhoneNumber: [''],
    email: ['', [Validators.required, Validators.email]],
    // password: ['', Validators.required],
    address: ['', Validators.required],
    birthDate: [new Date('2004-01-01'), Validators.required],
    patology: [''],
    treatment: [''],
    alt_img: ['no-image']
  });

  // public currentPatient: Patient = {
  //   id: 0,
  //   name: '',
  //   firstLastName: '',
  //   secondLastName: '',
  //   firstPhoneNumber: '',
  //   secondPhoneNumber: '',
  //   email: '',
  //   password: '',
  //   address: '',
  //   birthDate: new Date(),
  //   patology: '',
  //   treatment: '',
  //   alt_img: ''
  // };

  currentPatientToUpdate: Boolean = false;

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) {
      this.currentPatientToUpdate = false;
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.patientService.getPatientById(id))
    )
    .subscribe(patient => {
      if (!patient) return this.router.navigateByUrl('/');

      this.patientForm.reset({
        id: patient.id.toString(),
        name: patient.name,
        firstLastName: patient.firstLastName,
        secondLastName: patient.secondLastName,
        firstPhoneNumber: patient.firstPhoneNumber,
        secondPhoneNumber: patient.secondPhoneNumber,
        email: patient.email,
        // password: patient.password,
        address: patient.address,
        birthDate: new Date(patient.birthDate),
        patology: patient.patology,
        treatment: patient.treatment
      });

      // this.currentPatient = patient;
      this.currentPatientToUpdate = true;

      return;
    });

    // this.patientForm.get('id')?.valueChanges.subscribe(id => {
    //   if (id?.length === 9 && !isNaN(Number(id))) { // Verificar que la longitud es de 9 y es un número
    //     this.patientService.getPatientById(id!.toString()).subscribe(patient => {
    //       if (patient) {
    //         this.currentPatient = patient;
    //         this.currentPatientToUpdate = true;
    //       } else {
    //         this.currentPatient = {
    //           id: 0,
    //           name: '',
    //           firstLastName: '',
    //           secondLastName: '',
    //           firstPhoneNumber: '',
    //           secondPhoneNumber: '',
    //           email: '',
    //           password: '',
    //           address: '',
    //           birthDate: new Date(),
    //           patology: '',
    //           treatment: '',
    //           alt_img: ''
    //         };
    //         this.currentPatientToUpdate = false;
    //       }
    //     });
    //   } else {
    //     this.currentPatient = {
    //       id: 0,
    //       name: '',
    //       firstLastName: '',
    //       secondLastName: '',
    //       firstPhoneNumber: '',
    //       secondPhoneNumber: '',
    //       email: '',
    //       password: '',
    //       address: '',
    //       birthDate: new Date(),
    //       patology: '',
    //       treatment: '',
    //       alt_img: ''
    //     };
    //     this.currentPatientToUpdate = false;
    //   }
    // });

  }



  get currentPatient(): Patient {
    const patient = this.patientForm.value as unknown as Patient;

    return patient;
  }

  onSubmit() {

    if (this.patientForm.invalid) return;

    if (this.currentPatientToUpdate) {
      this.patientService.updatePatient(this.patientForm.value as unknown as Patient).subscribe(patient => {
        this.showSnackbar( `${ patient.id } actualizado` );
      });

      return;
    }

    this.patientService.addPatient(this.patientForm.value as unknown as Patient).subscribe(patient => {
      this.router.navigate(['/patient/list']);
      this.showSnackbar( `${ patient.id } creado` );
    });

  }

  onDeletePatient() {
    if ( !this.currentPatient.id ) throw Error('Patient id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.patientForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.patientService.deletePatientById( this.currentPatient.id.toString() )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/patient']);
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }

}
