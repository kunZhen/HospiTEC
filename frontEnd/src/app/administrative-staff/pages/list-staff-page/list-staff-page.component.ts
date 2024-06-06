import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { Personal } from '../../interfaces/personal.interface';

@Component({
  selector: 'app-list-staff-page',
  templateUrl: './list-staff-page.component.html',
  styleUrls: ['./list-staff-page.component.css']
})
export class ListStaffPageComponent implements OnInit {

  public staffs: Personal[] = [];

  constructor( private staffService: StaffService ) { }

  ngOnInit(): void {
    this.staffService.getStaff().subscribe( staffs => {
      this.staffs = staffs;
    });
  }

}
