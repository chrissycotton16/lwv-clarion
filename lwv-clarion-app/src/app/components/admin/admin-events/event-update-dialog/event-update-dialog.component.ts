import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Event} from 'src/app/models/event';

export interface DialogData{
  eventToUpdate: Event;
  updateEventID: number;
  updateTitle: string;
  updateStartTime: string;
  updateEndTime: string;
  updateDescription: string;
}
@Component({
  selector: 'app-event-update-dialog',
  templateUrl: './event-update-dialog.component.html',
  styleUrls: ['./event-update-dialog.component.scss']
})
export class EventUpdateDialogComponent implements OnInit {
  eventToUpdate: Event;
  updateEventID: number;
  updateTitle: string;
  updateStartTime: string;
  updateEndTime: string;
  updateDescription: string;
  error ='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<EventUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ngOnInit(): void {}

  onOkClick(){
    this.data.eventToUpdate = { 
      EventID: this.data.updateEventID,
      title:this.data.updateTitle, 
      start:this.data.updateStartTime,
      end: this.data.updateEndTime, 
      description: this.data.updateDescription};
      this.dialogRef.close(this.data.eventToUpdate);
  }
}
