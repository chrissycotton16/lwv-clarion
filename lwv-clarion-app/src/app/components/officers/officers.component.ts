import { Component, OnInit } from '@angular/core';
import { Officer } from 'src/app/models/officer';
import { OfficerService } from 'src/app/services/officer.service';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.scss']
})
export class OfficersComponent implements OnInit {
  officers: Officer [];
  displayedColumns: string[] = ['FirstName', 'LastName', 'Position', 'Email', 'TermStart'];

  constructor(private officerService: OfficerService) { }

  ngOnInit(): void {
    this.getOfficers();
  }

  getOfficers():void {
    this.officerService.getAll().subscribe(
      (res: Officer[]) => {
        this.officers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
