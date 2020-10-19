import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  firstname: string;
}

@Component({
  selector: 'app-member-add-dialog',
  templateUrl: './member-add-dialog.component.html',
  styleUrls: ['./member-add-dialog.component.scss']
})
export class MemberAddDialogComponent implements OnInit {
  firstname: string;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  onOkClick(){
    this.dialogRef.close(this.firstname);
  }

  constructor(
    public dialogRef: MatDialogRef<MemberAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
