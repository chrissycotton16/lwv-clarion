import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  members: Member[];
  error = '';
  success = '';
  message = "hello"
  @Input() member={ MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate: '',
                    DateJoined:'', MembershipType:0, Active:null, Email:'', PreferredPhone:'', SecondaryPhone:'',
                    StreetAddress:'', City:'', State:'', ZipCode:0, MemberUser:'', MemberPassword:''}; //this is for storing purposes
  updatedMemberInfo: Member;
  constructor(private memberService: MemberService){
   // this.ngOnInIt();
  }
  ngOnInit(): void {
    this.getMembers();
  }
  ngOnInIt(){
    this.getMembers();

  }
  getMembers():void {
    console.log("fetching members");
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
    console.log("delete id: " + MemberID +  " " + (+MemberID))
    this.resetErrors();
    console.log("id of delete memeber is: " + MemberID);
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
    this.resetErrors();
    console.log("in add member in app component");
    this.memberService.store(this.member)
      .subscribe(
        (res: Member[]) => {
          // Update the list of cars
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
    this.resetErrors();
    console.log("new input: " + FirstName + " " + LastName + " " + MemberID);
    this.updatedMemberInfo = {MemberID:+MemberID, FirstName: FirstName.value, LastName: LastName.value} ;
    //{ MemberID:+MemberID, FirstName: FirstName.value, LastName: LastName.value};
    //console.log("new in variable input: " + this.updatedMemberInfo.FirstName );

    this.memberService.update(this.updatedMemberInfo)
      .subscribe(
        (res) => {
          this.members = res;
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );  
     
    }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}
