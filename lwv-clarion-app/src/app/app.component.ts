import { Component, OnInit, Input } from '@angular/core';
import { Member } from './models/member';
import { MemberService } from './services/member.service';
import { FnParam } from '@angular/compiler/src/output/output_ast';

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
  @Input() member={ MemberID:0, FirstName:'', LastName:''} //this is for storing purposes
  updatedMemberInfo: Member;
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
