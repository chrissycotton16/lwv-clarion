import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { AdminAddDialogComponent } from './admin-add-dialog/admin-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  displayedColumns: string[] = ['User', 'Edit'];
  //@Input() event ={ EventID:0, title:'', start:'', end:'', description:''}; //this is for storing purposes
  admins: Admin[];
  adminLength: number;
  error = '';
  success = '';
  @Input() newAdmin: Admin ={ AdminID:0, user:'', password:''};

  //@Input() newEvent: Event ={ EventID:0, title:'', start:'', end:'', description:''};
  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAdmin();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(AdminAddDialogComponent, {
      width: '450px',
      data:{ newAdmin: this.newAdmin },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newAdmin = result;
      if(result != undefined){
        this.addAdmin(this.newAdmin);
      }
    });
  } 

  addAdmin(adm:Admin){
    adm = this.newAdmin;
    this.resetErrors();
    this.adminService.store(adm)
      .subscribe(
        (res: Admin[]) => {
          // Update the list of officers
          this.admins = res;
          // Inform the user
          this.success = 'Created successfully';
        },
        (err) => this.error = err
      );
    this.getAdmin();
  }

  getAdmin():void {
    this.adminService.getAll().subscribe(
      (res: Admin[]) => {
        this.admins = res;
        this.adminLength = this.admins.length;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  deleteAdmin(AdminID) {
    if(window.confirm('Are you sure you want to delete this item?')){
      this.resetErrors();
      this.adminService.delete(+AdminID)
        .subscribe(
          (res: Admin[]) => {
            this.admins = res;
            this.success = 'Deleted successfully';
          },
          (err) => this.error = err
        );
      this.getAdmin();
    }
  }
  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}