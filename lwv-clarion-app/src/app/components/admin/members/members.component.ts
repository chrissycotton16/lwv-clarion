import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { MemberAddDialogComponent } from './member-add-dialog/member-add-dialog.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Member[];
  error = '';
  success = '';
  addedMemberTest: Member;
  displayedColumns: string[] = ['Select','Member ID', 'First Name', 'Last Name', 'Secondary Member', 'Last Paid Date', 'Date Joined',
                                  'Membership Type', 'Active', 'Email', 'Preferred Phone', 'Secondary Phone', 'Street Address', 'City',
                                  'State', 'Zip Code', 'Delete'];

  @Input() member={ MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate: '',
                    DateJoined:'', MembershipType:0, Active:0, Email:'', PreferredPhone:'', SecondaryPhone:'',
                    StreetAddress:'', City:'', State:'', ZipCode:0, MemberUser:'', MemberPassword:''}; //this is for storing purposes
  @Input() member2={ MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate: '',
                    DateJoined:'', MembershipType:0, Active:0, Email:'', PreferredPhone:'', SecondaryPhone:'',
                    StreetAddress:'', City:'', State:'', ZipCode:0, MemberUser:'', MemberPassword:''}; //this is for storing purposes
  updatedMemberInfo: Member;
  
  constructor(private memberService: MemberService, public dialog:MatDialog){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getMembers();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(MemberAddDialogComponent, {
      width: '300px',
      data: {firstname: this.member2.FirstName}
    });
  }
  getMembers():void {
    this.memberService.getAll().subscribe(
      (res: Member[]) => {
        this.members = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deleteMember(MemberID) {
    this.resetErrors();
    this.memberService.delete(+MemberID)
      .subscribe(
        (res: Member[]) => {
          this.members = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
    this.getMembers();
  }

  addMember(f) {
    if(this.member.SecondaryHouseholdMemberName)
    this.resetErrors();
    this.memberService.store(this.member)
      .subscribe(
        (res: Member[]) => {
          // Update the list of members
          this.members = res;
          // Inform the user
          this.success = 'Created successfully';
          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
    this.getMembers();
  }

  updateMember(MemberID, FirstName, LastName){
  //   this.resetErrors();
  //   console.log("new input: " + FirstName + " " + LastName + " " + MemberID);
  //   this.updatedMemberInfo = {MemberID:+MemberID, FirstName: FirstName.value, LastName: LastName.value} ;
  //   //{ MemberID:+MemberID, FirstName: FirstName.value, LastName: LastName.value};
  //   //console.log("new in variable input: " + this.updatedMemberInfo.FirstName );
  //   this.memberService.update(this.updatedMemberInfo)
  //     .subscribe(
  //       (res) => {
  //         this.members = res;
  //         this.success = 'Updated successfully';
  //       },
  //       (err) => this.error = err
  //     );  
  }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}
