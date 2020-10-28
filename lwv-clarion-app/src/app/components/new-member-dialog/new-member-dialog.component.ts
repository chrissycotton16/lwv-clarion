import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';
import { PaymentComponent } from '../payment/payment.component';

export interface DialogData{
  
}

@Component({
  selector: 'app-new-member-dialog',
  templateUrl: './new-member-dialog.component.html',
  styleUrls: ['./new-member-dialog.component.scss']
})
export class NewMemberDialogComponent implements OnInit {

  firstname: string;
  lastname: string;
  secondaryname: string;
  lastpaid: string;
  datejoined: string;
  membership:number;
  status: string;
  email: string;
  phone: string;
  secondaryphone: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  membershipTypes: string[] = ['Student: $0', 'Individual: $40-$80', 'Household: $60-$120'];
  statusOptions: string[] = ['Inactive', 'Active', 'Pending'];

  newMember: Member;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  onOkClick(){
    this.newMember = {FirstName:this.firstname, 
      LastName:this.lastname,
      SecondaryHouseholdMemberName: this.secondaryname, 
      LastPaidDate: this.lastpaid,
      DateJoined: this.datejoined,
      MembershipType: this.membership, 
      Status: this.status,
      Email: this.email,
      PreferredPhone: this.phone, 
      SecondaryPhone: this.secondaryphone, 
      StreetAddress: this.street,
      City: this.city, 
      State: this.state, 
      ZipCode: this.zip};
    console.log(this.newMember);                        
    this.dialogRef.close(this.newMember);
  }

  constructor(
    public dialogRef: MatDialogRef<NewMemberDialogComponent>, 
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  saveOpen(){
    console.log(this.firstname,this.membership, this.status);
    this.dialogRef.close(this.newMember);
    const dialogConfig = this.dialog.open(PaymentComponent, {
      width: '450px',
      data: {id: 1,
        title: 'Payment'},
      autoFocus: false
    });
  }

  close(){
    this.dialogRef.close();
  }

}
