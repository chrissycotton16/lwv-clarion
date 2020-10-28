import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';

export interface DialogData{
  memberToUpdate: Member;
  updateMemberID: number;
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
  membershipTypes: string[] = ['Student: $0', 'Individual: $40-$80', 'Household: $60-$120'];
  statusOptions: string[] = ['Inactive', 'Active', 'Pending'];

  memberToUpdate: Member;
  updateMemberID: number;
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
  error ='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<MemberUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
    }
  
  ngOnInit(): void {
  }

  onOkClick(){
    this.data.memberToUpdate = { MemberID: this.data.updateMemberID,
      FirstName:this.data.updateFirstName, 
      LastName:this.data.updateLastName,
      SecondaryHouseholdMemberName: this.data.updateSecondaryHouseholdMemberName, 
      LastPaidDate: this.data.updateLastPaidDate,
      DateJoined: this.data.updateDateJoined,
      MembershipType: this.data.updateMemberShipType, 
      Status: this.data.updateStatus,
      Email: this.data.updateEmail,
      PreferredPhone: this.data.updatePreferredPhone, 
      SecondaryPhone: this.data.updateSecondaryPhone, 
      StreetAddress: this.data.updateStreetAddress,
      City: this.data.updateCity,
      State: this.data.updateState, 
      ZipCode: this.data.updateZipCode};   
      this.dialogRef.close(this.data.memberToUpdate);
  }

}
