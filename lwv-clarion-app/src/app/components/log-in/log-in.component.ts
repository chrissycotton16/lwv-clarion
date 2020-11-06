import { Input } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  
}


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  username: string;
  password: string;

  constructor(public dialogRef: MatDialogRef<LogInComponent>, 
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  logIn(){
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
}
