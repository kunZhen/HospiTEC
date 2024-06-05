import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EquipmentService } from '../../services/equipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Equipment } from '../../interfaces/equipment.interface';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/patient/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-equipment-page',
  templateUrl: './new-equipment-page.component.html',
  styleUrls: ['./new-equipment-page.component.css']
})
export class NewEquipmentPageComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  public equipmentForm = this.fb.group({
    salonNumber: ['', [Validators.required]],
    name: ['', [Validators.required]],
    provider: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  currentEquipmentToUpdate: Boolean = false;
  currentEquipmentId: string = '';

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) {
      this.currentEquipmentToUpdate = false;
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.equipmentService.getEquipmentById(id) )
    )
    .subscribe( equipment => {
      if (!equipment) {
        this.showSnackbar('No se encontró el equipo');
        return this.router.navigateByUrl('/administrative-staff/equipment');
      }

      this.equipmentForm.reset({
        salonNumber: equipment.salonNumber.toString(),
        name: equipment.name,
        provider: equipment.provider,
        amount: equipment.amount.toString(),
      });

      this.currentEquipmentToUpdate = true;
      this.currentEquipmentId = equipment.id.toString();

      return;
    });
  }

  get currentEquipment(): Equipment {
    const equipment = this.equipmentForm.value as unknown as Equipment;

    return equipment;
  }

  onSubmit() {

    if ( this.equipmentForm.invalid ) return;

    if ( this.currentEquipmentToUpdate ) {

      const equipment: Equipment = {
        ...this.currentEquipment,
        id: parseInt(this.currentEquipmentId, 10)
      };

      this.equipmentService.updateEquipment(equipment)
      .subscribe( equipment => {
        this.showSnackbar('Equipo actualizado correctamente');
        this.router.navigateByUrl('/administrative-staff/equipment');
      });
      return;
    }

    this.equipmentService.createEquipment(this.currentEquipment)
    .subscribe( equipment => {
      this.showSnackbar('Equipo creado correctamente');
      this.router.navigateByUrl('/administrative-staff/equipment');
    });

  }

  onDeleteEquipment() {
    if ( !this.currentEquipmentId ) throw Error('Equipment id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.equipmentForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.equipmentService.deleteEquipment( this.currentEquipmentId )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/administrative-staff/equipment']);
      });

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }
}
