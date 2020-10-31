import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Event} from 'src/app/models/event';

export interface DialogData{
  
}
@Component({
  selector: 'app-event-add-dialog',
  templateUrl: './event-add-dialog.component.html',
  styleUrls: ['./event-add-dialog.component.scss']
})
export class EventAddDialogComponent implements OnInit {
  newEvent: Event;
  title: string;
  startdate: string;
  enddate: string;
  starttime: string;
  endtime: string;
  description: string;
  
  constructor(
    public dialogRef: MatDialogRef<EventAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(){
      this.newEvent = {
        Title:this.title, 
        StartTime:this.startdate + "T" + this.starttime,
        EndTime: this.enddate + "T" + this.endtime,
        Description: this.description};
      this.dialogRef.close(this.newEvent);
    }
}
