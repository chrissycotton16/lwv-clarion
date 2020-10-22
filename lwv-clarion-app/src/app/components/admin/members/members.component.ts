import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { MemberAddDialogComponent } from './member-add-dialog/member-add-dialog.component';
import { SplitInterpolation } from '@angular/compiler';

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
  updatedMemberInfo: Member;
  displayedColumns: string[] = ['Select','Member ID', 'First Name', 'Last Name', 'Secondary Member', 'Last Paid Date', 'Date Joined',
                                  'Membership Type', 'Status', 'Email', 'Preferred Phone', 'Secondary Phone', 'Street Address', 'City',
                                  'State', 'Zip Code', 'Edit'];

  @Input() member ={ MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate:'',
                    DateJoined:'', MembershipType:'', Status:'', Email:'', PreferredPhone:'', SecondaryPhone:'',
                    StreetAddress:'', City:'', State:'', ZipCode:0}; //this is for storing purposes
  @Input() newMember2: Member ={ MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate:'',
                    DateJoined:'', MembershipType:'', Status:'', Email:'', PreferredPhone:'', SecondaryPhone:'',
                    StreetAddress:'', City:'', State:'', ZipCode:0};
 
  
  constructor(private memberService: MemberService, public dialog:MatDialog){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getMembers();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(MemberAddDialogComponent, {
      width: '450px',
      data:{ newMember2: this.newMember2 },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newMember2 = result;
      if(result != undefined){
        console.log(this.newMember2);
        this.addMember(this.newMember2);
      }
    });
  }

 

  getMembers():void {
    this.memberService.getAll().subscribe(
      (res: Member[]) => {
        this.members = res;
        console.log(this.members);
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

  addMember(mem: Member) {
    mem = this.newMember2;
    console.log("member v");
    console.log(mem);
    this.resetErrors();
    this.memberService.store(mem)
      .subscribe(
        (res: Member[]) => {
          // Update the list of members
          this.members = res;
          // Inform the user
          this.success = 'Created successfully';
        },
        (err) => this.error = err
      );
    this.getMembers();
  }

  openUpdateDialog(ID){
    //update with ID info open
  }
  updateMember(MemberID, FirstName, LastName){
    console.log("in update members function in memebrs.ts");
    // this.resetErrors();
    // console.log("new input: " + FirstName + " " + LastName + " " + MemberID);
    // this.updatedMemberInfo = {MemberID:+MemberID, FirstName: FirstName.value, LastName: LastName.value} ;
    // //{ MemberID:+MemberID, FirstName: FirstName.value, LastName: LastName.value};
    // //console.log("new in variable input: " + this.updatedMemberInfo.FirstName );
    // this.memberService.update(this.updatedMemberInfo)
    //   .subscribe(
    //     (res) => {
    //       this.members = res;
    //       this.success = 'Updated successfully';
    //     },
    //     (err) => this.error = err
    //   );  
  }

  getEmails(){
      console.log("in get emails function!");
  }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}
