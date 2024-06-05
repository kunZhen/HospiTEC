import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../interfaces/salon.interface';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/patient/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-medical-salon',
  templateUrl: './new-medical-salon.component.html',
  styleUrls: ['./new-medical-salon.component.css']
})
export class NewMedicalSalonComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private salonService: SalonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
 ) { }


  public salonForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    capacity: ['', [Validators.required]],
    type: ['', [Validators.required]],
    floor: ['', [Validators.required]],
  });

  public types = [
    { id: 'Mujeres', desc: 'Mujeres' },
    { id: 'Hombres', desc: 'Hombres' },
    { id: 'Niños', desc: 'Niños' }
  ];

  currentSalonToUpdate: Boolean = false;

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) {
      this.currentSalonToUpdate = false;
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.salonService.getSalonById(id) )
    )
    .subscribe( salon => {
      if (!salon) {
        this.showSnackbar('No se encontró el salón');
        return this.router.navigateByUrl('/administrative-staff/salon');
      }

      this.salonForm.reset({
        id: salon.id.toString(),
        name: salon.name,
        capacity: salon.capacity.toString(),
        type: salon.type,
        floor: salon.floor.toString()

      });

      this.currentSalonToUpdate = true;

      return;
    });
  }

  get currentSalon(): Salon {
    const salon = this.salonForm.value as unknown as Salon;

    return salon;
  }

  onSubmit() {
    if ( this.salonForm.invalid ) return;

    if ( this.currentSalonToUpdate ) {
      this.salonService.updateSalon(this.currentSalon).subscribe( salon => {
        this.showSnackbar(`Salón ${ salon.id } actualizado`);
        this.router.navigateByUrl('/administrative-staff/salon');
      });

      return;
    }

    this.salonService.createSalon(this.currentSalon).subscribe( salon => {
      this.showSnackbar(`Salón ${ salon.id } creado`);
      this.router.navigateByUrl('/administrative-staff/salon');
    });

  }

  onDeleteSalon() {
    if ( !this.currentSalon.id ) throw Error('Salon id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.salonForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.salonService.deleteSalon( this.currentSalon.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/administrative-staff/salon']);
      });

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }

}
