import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss']
})
export class CalendarDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CalendarDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: {description: string}) { }


  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }


}
