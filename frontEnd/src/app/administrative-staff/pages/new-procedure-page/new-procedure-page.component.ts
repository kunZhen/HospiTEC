import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProcedureService } from '../../services/procedure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Procedure } from '../../interfaces/procedure.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-procedure-page',
  templateUrl: './new-procedure-page.component.html',
  styleUrls: ['./new-procedure-page.component.css']
})
export class NewProcedurePageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private procedureService: ProcedureService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  public procedureForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    duration: ['', Validators.required],
  });

  currentProcedureToUpdate: Boolean = false;

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) {
      this.currentProcedureToUpdate = false;
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.procedureService.getProucedureById(id) )
    )
    .subscribe( procedure => {
      if (!procedure) {
        this.showSnackbar('No se encontró el procedimiento');
        return this.router.navigateByUrl('/administrative-staff/procedure');
      }

      this.procedureForm.reset({
        name: procedure.name,
        description: procedure.description,
        duration: procedure.duration.toString(),
      });

      this.currentProcedureToUpdate = true;
      return;
    });
  }

  get currentProcedure(): Procedure {
    const procedure = this.procedureForm.value as unknown as Procedure;

    return procedure;
  }

  onSubmit() {
    if ( this.procedureForm.invalid )  return;

    if ( this.currentProcedureToUpdate ) {
      this.procedureService.updateProcedure(this.currentProcedure).subscribe( resp => {
        this.showSnackbar('Procedimiento actualizado');
        this.router.navigateByUrl('/administrative-staff/procedure');
      });
      return;
    }

    this.procedureService.createProcedure(this.currentProcedure).subscribe( resp => {
      this.showSnackbar('Procedimiento creado');
      this.router.navigateByUrl('/administrative-staff/procedure');
    });
  }

  onDeleteProcedure() {
    throw new Error('Method not implemented.');
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }
}
