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
  @Input() adminToCheck: Admin ={ AdminID:0, user:'', password:''};
  constructor(public adminService: AdminService, private router: Router){
    this.ngOnInit();
  }

  ngOnInit() {}
  
  logIn(user, password){
    console.log(this.user + " " + this.password);
    console.log(user, password);
    this.adminToCheck = {user: this.user, password: this.password};

    console.log(this.adminToCheck);
    this.adminService.userLogin(this.adminToCheck).pipe(first()).subscribe(
      data =>
      {
        alert("user name or password is correct");
      },
      error => 
      {
        alert("user name or password is incorrect");
      });
  }
}
