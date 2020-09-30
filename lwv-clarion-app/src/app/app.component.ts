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
  message = "hello"
  //@Input() member={firstName:''} //this is for storing purposes
  testMember: Member;
  constructor(private memberService: MemberService){
    this.ngOnInIt();
  }

  ngOnInIt(){
    this.getMembers();
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
}
