import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';

export interface DialogData{
  memberToUpdate: Member;
  updateFirstName: string;
  updateLastName: string;
  updateSecondaryHouseholdMemberName: string;
  updateLastPaidDate: string;
  updateDateJoined: string;
  updateMemberShipType: string;
  updateStatus: string;
  updateEmail: string;
  updatePreferredPhone: string;
  updateSecondaryPhone: string;
  updateStreetAddress: string;
  updateCity: string;
  updateState: string;
  updateZipCode: string;
}

@Component({
  selector: 'app-member-update-dialog',
  templateUrl: './member-update-dialog.component.html',
  styleUrls: ['./member-update-dialog.component.scss']
})
export class MemberUpdateDialogComponent implements OnInit {
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


  memberToUpdate: Member;
  updateFirstName: string;
  updateLastName: string;
  updateSecondaryHouseholdMemberName: string;
  updateLastPaidDate: string;
  updateDateJoined: string;
  updateMemberShipType: string;
  updateStatus: string;
  updateEmail: string;
  updatePreferredPhone: string;
  updateSecondaryPhone: string;
  updateStreetAddress: string;
  updateCity: string;
  updateState: string;
  updateZipCode: string;

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<MemberUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
    }
  
  ngOnInit(): void {
    //console.log(this.data.memberToUpdate);
  }

  onOkClick(){
    console.log("clicked ok");                        
    this.dialogRef.close();
  }

}
