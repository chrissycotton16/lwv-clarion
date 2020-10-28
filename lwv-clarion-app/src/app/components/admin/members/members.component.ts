import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { MemberAddDialogComponent } from './member-add-dialog/member-add-dialog.component';
import { MemberUpdateDialogComponent } from './member-update-dialog/member-update-dialog.component';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: Member[];
  emails: string[];
  error = '';
  success = '';
  memberLength: number;
  displayedColumns: string[] = ['FirstName', 'LastName', 'SecondaryMember', 'LastPaidDate', 'DateJoined',
                                  'MembershipType', 'Status', 'Email', 'PreferredPhone', 'SecondaryPhone', 'StreetAddress', 'City',
                                  'State', 'ZipCode', 'Edit'];
  @Input() newMember: Member ={ MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate:'',
                    DateJoined:'', MembershipType:'', Status:'', Email:'', PreferredPhone:'', SecondaryPhone:'',
                    StreetAddress:'', City:'', State:'', ZipCode:0};
  memberToUpdate: Member = {MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate:'',
                            DateJoined:'', MembershipType:'', Status:'', Email:'', PreferredPhone:'', SecondaryPhone:'',
                            StreetAddress:'', City:'', State:'', ZipCode:0}
  
  constructor(private memberService: MemberService, public dialog:MatDialog){
    this.ngOnInit();
  }
 
  ngOnInit(){
    this.getMembers();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(MemberAddDialogComponent, {
      width: '450px',
      data:{ newMember: this.newMember },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newMember = result;
      if(result != undefined){
        this.addMember(this.newMember);
      }
    });
  }

  getMembers():void {
    this.memberService.getAll().subscribe(
      (res: Member[]) => {
        this.members = res;
        this.memberLength = this.members.length;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  
  deleteMember(MemberID) {
    if(window.confirm('Are you sure you want to delete this item?')){
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
  }

  addMember(mem: Member) {
    mem = this.newMember;
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

  openUpdateDialog(mem){
    const dialogRef = this.dialog.open(MemberUpdateDialogComponent, {
      width: '450px',
      data:{ updateMemberID: mem.MemberID, updateFirstName: mem.FirstName, updateLastName: mem.LastName, updateSecondaryHouseholdMemberName: mem.SecondaryHouseholdMemberName,
             updateLastPaidDate: mem.LastPaidDate, updateDateJoined: mem.DateJoined, updateMemberShipType: mem.MembershipType,
             updateStatus: mem.Status, updateEmail: mem.Email, updatePreferredPhone: mem.PreferredPhone,
             updateSecondaryPhone: mem.SecondaryPhone, updateStreetAddress: mem.StreetAddress, updateCity: mem.City, 
             updateState: mem.State, updateZipCode: mem.ZipCode },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.memberToUpdate = result;
        this.updateMember(this.memberToUpdate);
      }
    });
  }

  updateMember(mem){
    this.resetErrors();
    this.memberService.update({MemberID: mem.MemberID, FirstName: mem.FirstName, LastName: mem.LastName, 
        SecondaryHouseholdMemberName: mem.SecondaryHouseholdMemberName, LastPaidDate: mem.LastPaidDate,
        DateJoined: mem.DateJoined, MembershipType: mem.MembershipType, Status: mem.Status, Email:mem.Email,
        PreferredPhone: mem.PreferredPhone, SecondaryPhone: mem.SecondaryPhone, StreetAddress: mem.StreetAddress,
        City: mem.City, State: mem.State, ZipCode: mem.ZipCode })
    .subscribe(
      (res) => {
        this.members    = res;
        this.success = 'Updated successfully';
      },
      (err) => this.error = err
    );
  }

  getEmails(){
    this.memberService.getEmails().subscribe(
      (res: string[]) => {
        this.emails = res;
        this.emails.forEach(email => {
          //output to input box
          console.log(email);
        });
      },
      (err) => {
        this.error = err;
      }
    );     
  }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}
