import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from 'src/app/patient/interfaces/record.interface';
import { RecordService } from '../../../patient/services/record.service';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-grade-page',
  templateUrl: './grade-page.component.html',
  styleUrls: ['./grade-page.component.css']
})
export class GradePageComponent implements OnInit {

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

  constructor(
    private recordService: RecordService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    console.log(this.cleanlinessSelectedStar);
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
    console.log(this.staffTreatmentSelectedStar);
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
    console.log(this.appoinmentPunctualitySelectedStar);
  }
}
