import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactDialogComponent>) { }


  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
