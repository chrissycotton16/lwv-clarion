import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewMemberDialogComponent } from '../new-member-dialog/new-member-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog){}
  ngOnInit() {
  
  }
  openMemberDialog(){
    const dialogConfig = this.dialog.open(NewMemberDialogComponent, {
      width: '450px',
      data: {id: 1,
        title: 'Become A Member'},
      autoFocus: false
    });
    dialogConfig.afterClosed().subscribe(
      data => console.log("Dialog output: ", data)
    );
  }
}
