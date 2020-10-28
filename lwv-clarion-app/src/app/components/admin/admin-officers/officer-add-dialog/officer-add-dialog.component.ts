import { Component, OnInit, Inject } from '@angular/core';
import { Officer } from 'src/app/models/officer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData{
  
}
@Component({
  selector: 'app-officer-add-dialog',
  templateUrl: './officer-add-dialog.component.html',
  styleUrls: ['./officer-add-dialog.component.scss']
})
export class OfficerAddDialogComponent implements OnInit {
  newOfficer: Officer;
  firstname: string;
  lastname: string;
  position: string;
  email: string;
  termstart: string;
  
  constructor(
    public dialogRef: MatDialogRef<OfficerAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(){
      this.newOfficer = {FirstName:this.firstname, 
        LastName:this.lastname,
        Position: this.position,
        Email: this.email,
        TermStart: this.termstart};
      this.dialogRef.close(this.newOfficer);
    }
}
