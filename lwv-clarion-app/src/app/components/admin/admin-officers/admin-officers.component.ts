import { Component, OnInit, Input } from '@angular/core';
import { OfficerService } from 'src/app/services/officer.service';
import { MatDialog } from '@angular/material/dialog';
import { Officer } from 'src/app/models/officer';

@Component({
  selector: 'app-admin-officers',
  templateUrl: './admin-officers.component.html',
  styleUrls: ['./admin-officers.component.scss']
})
export class AdminOfficersComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'Position', 'Email', 'TermStart', 'TermEnd'];
  @Input() officer ={ OfficerID:0, FirstName:'', LastName:'', Position:'', Email:'', TermStart:'', TermEnd:''}; //this is for storing purposes
  officers: Officer[];
  officerLength: number;
  error = '';
  success = '';
  constructor(private officerService: OfficerService, public dialog:MatDialog){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getOfficers();
  }

  getOfficers():void {
    this.officerService.getAll().subscribe(
      (res: Officer[]) => {
        this.officers = res;
        console.log(this.officers);
        this.officerLength = this.officers.length;
      },
      (err) => {
        this.error = err;
      }

    );
  }

}
