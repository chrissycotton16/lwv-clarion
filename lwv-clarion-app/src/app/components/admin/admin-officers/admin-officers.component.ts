import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-officers',
  templateUrl: './admin-officers.component.html',
  styleUrls: ['./admin-officers.component.scss']
})
export class AdminOfficersComponent implements OnInit {
  displayedColumns: string[] = ['Select','Member ID', 'First Name', 'Last Name', 'Secondary Member', 'Last Paid Date', 'Date Joined',
  'Membership Type', 'Status', 'Email', 'Preferred Phone', 'Secondary Phone', 'Street Address', 'City',
  'State', 'Zip Code', 'Edit'];

  constructor() { }

  ngOnInit(): void {
  }

}
