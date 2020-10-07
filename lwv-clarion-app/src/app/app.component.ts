import { Component, OnInit, Input } from '@angular/core';
import { Member } from './models/member';
import { MemberService } from './services/member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lwv-clarion-app';
  members: Member[];
  error = '';
  success = '';
  message = "hello"
  @Input() member={FirstName:'', LastName:'', id:0} //this is for storing purposes
  testMember: Member;
  constructor(private memberService: MemberService){
    this.ngOnInIt();
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

  updateMembers(FirstName, LastName, MemberID){
    this.resetErrors();
    console.log("new input: " + FirstName + " " + LastName + " " + MemberID);
    this.memberService.update({ FirstName: FirstName.value, LastName: LastName.value, MemberID: +MemberID })
      .subscribe(
        (res) => {
          this.members    = res;
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
