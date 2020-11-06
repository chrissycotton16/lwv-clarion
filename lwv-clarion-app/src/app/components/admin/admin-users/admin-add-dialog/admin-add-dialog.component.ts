import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admin } from 'src/app/models/admin';
export interface DialogData{
  
}
@Component({
  selector: 'app-admin-add-dialog',
  templateUrl: './admin-add-dialog.component.html',
  styleUrls: ['./admin-add-dialog.component.scss']
})
export class AdminAddDialogComponent implements OnInit {
  newAdmin: Admin;
  user: string;
  password: string;
 
  constructor(
    public dialogRef: MatDialogRef<AdminAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(){
      this.newAdmin = {user:this.user, 
        password:this.password};
      this.dialogRef.close(this.newAdmin);
    }
}
