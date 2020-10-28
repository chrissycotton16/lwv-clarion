import { Input } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { PaymentComponent } from '../payment/payment.component';

export interface DialogData{
  
}

@Component({
  selector: 'app-new-member-dialog',
  templateUrl: './new-member-dialog.component.html',
  styleUrls: ['./new-member-dialog.component.scss']
})
export class NewMemberDialogComponent implements OnInit {

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

  currentDate: string;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();

  
  
  error = '';
  success = '';
  @Input() newMember: Member ={ MemberID:0, FirstName:'', LastName:'', SecondaryHouseholdMemberName:'', LastPaidDate:'',
                    DateJoined:'', MembershipType:'', Status:'', Email:'', PreferredPhone:'', SecondaryPhone:'',
                    StreetAddress:'', City:'', State:'', ZipCode:0};

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  onOkClick(){
    this.newMember = {FirstName:this.firstname, 
      LastName:this.lastname,
      SecondaryHouseholdMemberName: this.secondaryname, 
      LastPaidDate: "N/A",
      DateJoined: this.currentDate,
      MembershipType: this.membership, 
      Status: "Pending",
      Email: this.email,
      PreferredPhone: this.phone, 
      SecondaryPhone: this.secondaryphone, 
      StreetAddress: this.street,
      City: this.city, 
      State: this.state, 
      ZipCode: this.zip};
    console.log(this.newMember);                        
    this.dialogRef.close(this.newMember);
  }

  constructor(
    public dialogRef: MatDialogRef<NewMemberDialogComponent>, 
    private dialog: MatDialog,
    private memberService: MemberService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.currentDate = this.mm + '/' + this.dd + '/' + this.yyyy;
    }


    addMember(mem: Member) {
      mem = this.newMember;
      console.log("member v");
      console.log(this.newMember);
      console.log(mem);
      this.resetErrors();
      this.memberService.store(mem)
        .subscribe(
          (res: Member[]) => {
            // Update the list of members
            //this.members = res;
            // Inform the user
            this.success = 'Created successfully';
          },
          (err) => this.error = err
        );
    }


    resetErrors() {
      this.success = '';
      this.error   = '';
    }

  saveOpen(){
    this.newMember = {FirstName:this.firstname, 
      LastName:this.lastname,
      SecondaryHouseholdMemberName: this.secondaryname, 
      LastPaidDate: "N/A",
      DateJoined: this.currentDate,
      MembershipType: this.membership, 
      Status: "Pending",
      Email: this.email,
      PreferredPhone: this.phone, 
      SecondaryPhone: this.secondaryphone, 
      StreetAddress: this.street,
      City: this.city, 
      State: this.state, 
      ZipCode: this.zip};
    
    const dialogConfig = this.dialog.open(PaymentComponent, {
      width: '450px',
      data: {id: 1,
        title: 'Payment'},
      autoFocus: false
    });
    dialogConfig.afterClosed().subscribe(result => {
      if(result == "yes"){
        console.log(this.newMember);
        this.addMember(this.newMember);
        this.dialogRef.close(this.newMember);
      }
    });
  }

  close(){
    this.dialogRef.close();
  }

}
