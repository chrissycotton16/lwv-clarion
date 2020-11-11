import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user = '';
  password = '';
  loggedIn=false;
  checkLogIn: boolean;
  @Input() adminToCheck: Admin ={ AdminID:0, user:'', password:''};
  constructor(public adminService: AdminService, private router: Router){
    if(this.adminService.isLoggedIn()){
      console.log("you are already logged in");
      this.loggedIn= true;
    }
    this.ngOnInit();
  }

  ngOnInit() {}
  
  logIn(user, password){
    this.adminToCheck = {user: this.user, password: this.password};
    this.adminService.userLogin(this.adminToCheck).pipe(first()).subscribe(  () =>
      {
          this.loggedIn = this.test();
      });
  }

  logOut(){
    this.adminService.deleteToken();
    this.loggedIn = this.adminService.isLoggedIn();
    this.resetUserPassword();
  }
  
  test(): boolean{
    this.checkLogIn = this.adminService.getIfLoggedIn();
    this.loggedIn = this.checkLogIn;
    if(this.checkLogIn){
      this.resetUserPassword();
      return true;
    }
    else{
      this.resetUserPassword();
      return false;
    }
  }
  resetUserPassword(){
    this.user='';
    this.password='';
  }
    
}