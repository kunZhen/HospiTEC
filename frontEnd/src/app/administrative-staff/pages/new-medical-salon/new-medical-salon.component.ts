import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonService } from '../../services/salon.service';
import { Salon } from '../../interfaces/salon.interface';

@Component({
  selector: 'app-new-medical-salon',
  templateUrl: './new-medical-salon.component.html',
  styleUrls: ['./new-medical-salon.component.css']
})
export class NewMedicalSalonComponent {

  constructor(
    private fb: FormBuilder,
    private salonService: SalonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
 ) { }

  public salonForm = this.fb.group({
    number: ['', Validators.required],
    name: ['', Validators.required],
    capacity: ['', Validators.required],
    type: ['', Validators.required],
    floor: ['', Validators.required],
  });

  public types = [
    { id: 'w', desc: 'Mujeres' },
    { id: 'm', desc: 'Hombres' },
    { id: 'c', desc: 'Niños' }
  ];

  currentSalonToUpdate: Boolean = false;

  get currentSalon(): Salon {
    const salon = this.salonForm.value as unknown as Salon;

    return salon;
  }

  onSubmit() {

  }

  onDeleteSalon() {

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }

}
