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
  public selectedStar: number = 0;

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
  }

  goBack():void {
    this.router.navigateByUrl('patient-user/records')
  }

  setRating(index: number) {
    this.selectedStar = index + 1;
  }

}
