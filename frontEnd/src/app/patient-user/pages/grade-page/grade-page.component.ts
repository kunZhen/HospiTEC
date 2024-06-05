import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from 'src/app/patient/interfaces/record.interface';
import { RecordService } from '../../../patient/services/record.service';
import { delay, switchMap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EvaluationService } from '../../services/evaluation.service';
import { Evaluation } from '../../interfaces/evaluation.interface';

@Component({
  selector: 'app-grade-page',
  templateUrl: './grade-page.component.html',
  styleUrls: ['./grade-page.component.css']
})
export class GradePageComponent implements OnInit {

  public recordId: string = '';

  public record?: Record;
  public maxRating: number = 5;

  public maxRatingArray: number[] = [];
  public cleanlinessSelectedStar: number = 0;
  public previousSelection: number = 0;

  public staffTreatmentMaxRatingArray: number[] = [];
  public staffTreatmentSelectedStar: number = 0;
  public staffTreatmentPreviousSelection: number = 0;

  public appoinmentPunctualityMaxRatingArray: number[] = [];
  public appoinmentPunctualitySelectedStar: number = 0;
  public appoinmentPunctualityPreviousSelection: number = 0;

  public evaluationForm = this.fb.group({
    cleanliness: [0, [Validators.required]],
    staffTreatment: [0, [Validators.required]],
    appoinmentPunctuality: [0, [Validators.required]],
    commentsCleanliness: ['', Validators.required],
    commentsStaffTreatment: ['', Validators.required],
    commentsAppoinmentPunctuality: ['', Validators.required]
  });

  constructor(
    private recordService: RecordService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private evaluationService: EvaluationService

  ) {}


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(500),
        switchMap( ({ id }) => this.recordService.getRecordById(id) )
      )
      .subscribe( record => {

        if (!record) return this.router.navigate([ '/patient/list' ]);

        this.record = record;
        this.recordId = record.id;
        console.log(this.record);
        return;
      })

    this.maxRatingArray = Array(this.maxRating).fill(0).map((x, i) => i);
    this.staffTreatmentMaxRatingArray = Array(this.maxRating).fill(0).map((x, i) => i);
    this.appoinmentPunctualityMaxRatingArray = Array(this.maxRating).fill(0).map((x, i) => i);
  }

  goBack():void {
    this.router.navigateByUrl('patient-user/records')
  }

  onSubmit() {
    if (this.evaluationForm.invalid) return;

    const { cleanliness, staffTreatment, appoinmentPunctuality, commentsCleanliness, commentsStaffTreatment, commentsAppoinmentPunctuality } = this.evaluationForm.value;

    const evaluation: Evaluation = {
      recordId: this.recordId,
      cleanlinessComment: commentsCleanliness!,
      cleanlinessRate: cleanliness!,
      staffTreatmentComment: commentsStaffTreatment!,
      staffTreatmentRate: staffTreatment!,
      appointmentPunctualityComment: commentsAppoinmentPunctuality!,
      appointmentPunctualityRate: appoinmentPunctuality!
    }

    this.evaluationService.existEvaluation(evaluation.recordId).subscribe( exist => {
      if (exist) {
        this.evaluationService.updateEvaluation(evaluation).subscribe( () => {
          this.showSnackbar('Evaluación actualizada correctamente');
          this.router.navigateByUrl('patient-user/records');
        });
      } else {
        this.evaluationService.addEvaluation(evaluation).subscribe( () => {
          this.showSnackbar('Evaluación añadida correctamente');
          this.router.navigateByUrl('patient-user/records');
        });
      }
    });

    console.log(evaluation);
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Entendido', {
      duration: 2500
    });
  }

  // Cleanliness

  handleMouseEnter(index: number) {
    this.cleanlinessSelectedStar = index + 1;
  }

  handleMouseLeave() {
    if (this.previousSelection !== 0) this.cleanlinessSelectedStar = this.previousSelection;
    else this.cleanlinessSelectedStar = 0;
  }

  rating(index: number) {
    this.cleanlinessSelectedStar = index + 1;
    this.previousSelection = this.cleanlinessSelectedStar;
    this.evaluationForm.patchValue({ cleanliness: this.cleanlinessSelectedStar });
  }

  // Staff Treatment

  handleMouseEnterStaffTreatment(index: number) {
    this.staffTreatmentSelectedStar = index + 1;
  }

  handleMouseLeaveStaffTreatment() {
    if (this.staffTreatmentPreviousSelection !== 0) this.staffTreatmentSelectedStar = this.staffTreatmentPreviousSelection;
    else this.staffTreatmentSelectedStar = 0;
  }

  rateStaffTreatment(index: number) {
    this.staffTreatmentSelectedStar = index + 1;
    this.staffTreatmentPreviousSelection = this.staffTreatmentSelectedStar;
    this.evaluationForm.patchValue({ staffTreatment: this.staffTreatmentSelectedStar });
  }

  // Appoinment Punctuality

  handleMouseEnterAppoinmentPunctuality(index: number) {
    this.appoinmentPunctualitySelectedStar = index + 1;
  }

  handleMouseLeaveAppoinmentPunctuality() {
    if (this.appoinmentPunctualityPreviousSelection !== 0) this.appoinmentPunctualitySelectedStar = this.appoinmentPunctualityPreviousSelection;
    else this.appoinmentPunctualitySelectedStar = 0;
  }

  rateAppoinmentPunctuality(index: number) {
    this.appoinmentPunctualitySelectedStar = index + 1;
    this.appoinmentPunctualityPreviousSelection = this.appoinmentPunctualitySelectedStar;
    this.evaluationForm.patchValue({ appoinmentPunctuality: this.appoinmentPunctualitySelectedStar });
  }
}
