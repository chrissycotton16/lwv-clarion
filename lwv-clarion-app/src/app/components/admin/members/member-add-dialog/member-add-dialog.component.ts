import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';

export interface DialogData{}

@Component({
  selector: 'app-member-add-dialog',
  templateUrl: './member-add-dialog.component.html',
  styleUrls: ['./member-add-dialog.component.scss']
})
export class MemberAddDialogComponent implements OnInit { 
  newMember: Member;
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

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
    this.dialogRef.close(this.newMember);
  }

  constructor(
    public dialogRef: MatDialogRef<MemberAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
