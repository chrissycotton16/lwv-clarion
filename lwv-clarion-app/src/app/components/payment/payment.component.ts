import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PaymentComponent>) { }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close("yes");

  }
  close(){
    this.dialogRef.close();
  }
}
