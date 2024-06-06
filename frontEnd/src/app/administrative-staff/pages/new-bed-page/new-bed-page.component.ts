import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BedService } from '../../services/bed.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Bed } from '../../interfaces/bed.interface';

@Component({
  selector: 'app-new-bed-page',
  templateUrl: './new-bed-page.component.html',
  styleUrls: ['./new-bed-page.component.css']
})
export class NewBedPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private bedService: BedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  public bedForm = this.fb.group({
    salonNumber: ['', [Validators.required]],
    bedNumber: ['', [Validators.required]],

  });

  currentBedToUpdate: Boolean = false;

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) {
      this.currentBedToUpdate = false;
      return;
    }
  }

  get currentBed(): Bed {
    const bed = this.bedForm.value as unknown as Bed;

    return bed;
  }

  onSubmit(): void {

  }

  onDeleteBed() {

  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }
}
