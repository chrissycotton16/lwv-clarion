import { Component, OnInit, Input } from '@angular/core';
import { OfficerService } from 'src/app/services/officer.service';
import { MatDialog } from '@angular/material/dialog';
import { Officer } from 'src/app/models/officer';
import { OfficerAddDialogComponent } from './officer-add-dialog/officer-add-dialog.component';
import { OfficerUpdateDialogComponent } from './officer-update-dialog/officer-update-dialog.component';

@Component({
  selector: 'app-admin-officers',
  templateUrl: './admin-officers.component.html',
  styleUrls: ['./admin-officers.component.scss']
})
export class AdminOfficersComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'Position', 'Email', 'TermStart', 'Edit'];
  @Input() officer ={ OfficerID:0, FirstName:'', LastName:'', Position:'', Email:'', TermStart:''}; //this is for storing purposes
  officers: Officer[];
  officerLength: number;
  error = '';
  success = '';
  @Input() newOfficer: Officer ={ OfficerID:0, FirstName:'', LastName:'', Position:'', Email:'', TermStart:''};
  officerToUpdate: Officer ={ OfficerID:0, FirstName:'', LastName:'', Position:'', Email:'', TermStart:''};

  constructor(private officerService: OfficerService, public dialog:MatDialog){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getOfficers();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(OfficerAddDialogComponent, {
      width: '450px',
      data:{ newOfficer: this.newOfficer },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newOfficer = result;
      if(result != undefined){
        this.addOfficer(this.newOfficer);
      }
    });
  } 

  addOfficer(off:Officer){
    off = this.newOfficer;
    this.resetErrors();
    this.officerService.store(off)
      .subscribe(
        (res: Officer[]) => {
          // Update the list of officers
          this.officers = res;
          // Inform the user
          this.success = 'Created successfully';
        },
        (err) => this.error = err
      );
    this.getOfficers();
  }

  getOfficers():void {
    this.officerService.getAll().subscribe(
      (res: Officer[]) => {
        this.officers = res;
        this.officerLength = this.officers.length;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deleteOfficer(OfficerID) {
    if(window.confirm('Are you sure you want to delete this item?')){
      this.resetErrors();
      this.officerService.delete(+OfficerID)
        .subscribe(
          (res: Officer[]) => {
            this.officers = res;
            this.success = 'Deleted successfully';
          },
          (err) => this.error = err
        );
      this.getOfficers();
    }
  }

  openUpdateDialog(off){
    const dialogRef = this.dialog.open(OfficerUpdateDialogComponent, {
      width: '450px',
      data:{ updateOfficerID: off.OfficerID, updateFirstName: off.FirstName, updateLastName: off.LastName, updatePosition: off.Position,  
             updateEmail: off.Email, updateTermStart: off.TermStart},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.officerToUpdate = result;
        this.updateOfficer(this.officerToUpdate);
      }
    });
    this.getOfficers();
  }

  updateOfficer(off){
    this.resetErrors();
    this.officerService.update({OfficerID: off.OfficerID, FirstName: off.FirstName, LastName: off.LastName, 
        Position: off.Position, Email: off.Email, TermStart: off.TermStart})
    .subscribe(
      (res) => {
        this.officers = res;
        this.success = 'Updated successfully';
      },
      (err) => this.error = err
    );
  }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}
