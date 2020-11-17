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
  all=true;
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
  
  getPendingMembers():void{
    this.memberService.getPending().subscribe(
      (res: Member[]) => {
        this.members = res;
        this.memberLength = this.members.length;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getInactiveMembers():void{
    this.memberService.getInactive().subscribe(
      (res: Member[]) => {
        this.members = res;
        this.memberLength = this.members.length;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  getActiveMembers():void{
    this.memberService.getActive().subscribe(
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

  exportEmails(){
    this.memberService.getEmails().subscribe(
      (res: string[]) => {
        this.emails = res;
        console.log(this.emails);
        this.downloadEmails();
      },
      (err) => {
        this.error = err;
      }
    );       
  }

  downloadEmails(){
    console.log(this.emails);
    let filename = "emails";
    let csvData = this.ConvertToCSV(this.emails, ['Email']);
    console.log(csvData);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' })
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  exportAll(){
    let filename = "members";
    console.log(this.members)
    let csvData = this.ConvertToCSV(this.members, ['FirstName', 'LastName', 'SecondaryHouseholdMemberName', 'LastPaidDate', 'DateJoined',
        'MembershipType', 'Status', 'Email', 'PreferredPhone', 'SecondaryPhone', 'StreetAddress', 'City',
        'State', 'ZipCode']);
        console.log(csvData);

    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' })
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headers){
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = 'S.No,';

         for (let index in headers) {
             row += headers[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array.length; i++) {
             let line = (i+1)+'';
             for (let index in headers) {
                let head = headers[index];

                 line += ',' + array[i][head];
             }
             str += line + '\r\n';
         }
         return str;
  }

  changeToAll(){
    console.log("all");
  }


  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}
