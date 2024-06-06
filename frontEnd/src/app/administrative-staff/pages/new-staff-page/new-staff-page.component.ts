import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Personal } from '../../interfaces/personal.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-staff-page',
  templateUrl: './new-staff-page.component.html',
  styleUrls: ['./new-staff-page.component.css']
})
export class NewStaffPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  public staffForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    idNumber: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    dateOfBirth: [new Date(), Validators.required],
    dateOfEntry: [new Date(), Validators.required],
    role: ['', Validators.required],
  });

  public roles = [
    { id: 'administrative', desc: 'Administrativo' },
    { id: 'doctor', desc: 'Doctor' },
    { id: 'nurse', desc: 'Enfermero' }
  ];

  currentStaffToUpdate: Boolean = false;

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) {
      this.currentStaffToUpdate = false;
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.staffService.getStaffById(id) )
    )
    .subscribe( staff => {
      if (!staff) {
        this.showSnackbar('No se encontró el personal');
        return this.router.navigateByUrl('/administrative-staff/staff');
      }

      this.staffForm.reset({
        firstName: staff.firstName,
        lastName: staff.lastName,
        idNumber: staff.idNumber,
        phone: staff.phone,
        address: staff.address,
        dateOfBirth: staff.dateOfBirth,
        dateOfEntry: staff.dateOfEntry,
        role: staff.role,
      });

      this.currentStaffToUpdate = true;
      return;
    });
  }

  get currentStaff(): Personal {
    const staff = this.staffForm.value as unknown as Personal;

    return staff;
  }

  onSubmit() {

  }

  onDeleteStaff() {

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }



}
