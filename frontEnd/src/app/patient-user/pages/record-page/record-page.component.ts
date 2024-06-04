import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Record } from 'src/app/patient/interfaces/record.interface';
import { RecordService } from 'src/app/patient/services/record.service';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css']
})
export class RecordPageComponent implements OnInit {

  public records: Record[] = [];
  private id: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recordService: RecordService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.authService.token!;

    console.log(this.id);
    this.recordService.getRecordsByPatientId(this.id).subscribe(
      records => {
        this.records = records!;
        console.log(this.records);
      }
    );
  }

  showTittle: boolean = false;




}
