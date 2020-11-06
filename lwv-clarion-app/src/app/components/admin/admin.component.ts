import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user = '';
  password = '';
  loggedIn = false;
  checkLogIn: boolean;
  @Input() adminToCheck: Admin ={ AdminID:0, user:'', password:''};
  constructor(public adminService: AdminService, private router: Router){
    if(this.adminService.isLoggedIn()){
      console.log("you are already logged in");
      //set log out button to true 
      // set log in button to false
      this.loggedIn = true;
    }

    this.ngOnInit();
  }

  ngOnInit() {}
  
  logOut(){
    this.adminService.deleteToken();
    this.loggedIn = this.adminService.isLoggedIn();
    this.resetUserPassword();
    //location.reload();
  }

  logIn(user, password){
    this.adminToCheck = {user: this.user, password: this.password};
    this.adminService.userLogin(this.adminToCheck).pipe(first()).subscribe( 
      () =>
      {
        this.loggedIn = this.test();
      });
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
