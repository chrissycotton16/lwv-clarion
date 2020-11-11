import { Component, OnInit, Inject } from '@angular/core';
import { Officer } from 'src/app/models/officer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData{
  officerToUpdate: Officer;
  updateOfficerID: number;
  updateFirstName: string;
  updateLastName: string;
  updatePosition: string;
  updateEmail: string;
  updateTermStart: string;
}
@Component({
  selector: 'app-officer-update-dialog',
  templateUrl: './officer-update-dialog.component.html',
  styleUrls: ['./officer-update-dialog.component.scss']
})
export class OfficerUpdateDialogComponent implements OnInit {
  officerToUpdate: Officer;
  updateOfficerID: number;
  updateFirstName: string;
  updateLastName: string;
  updatePosition: string;
  updateEmail: string;
  updateTermStart: string;
  error ='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<OfficerUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ngOnInit(): void {}

  onOkClick(){
    this.data.officerToUpdate = { OfficerID: this.data.updateOfficerID,
      FirstName:this.data.updateFirstName, 
      LastName:this.data.updateLastName,
      Position: this.data.updatePosition, 
      Email: this.data.updateEmail,
      TermStart: this.data.updateTermStart};
      this.dialogRef.close(this.data.officerToUpdate);
  }
}
