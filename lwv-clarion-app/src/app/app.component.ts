import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from './components/log-in/log-in.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lwv-clarion-app';

  constructor(private dialog: MatDialog){
    this.ngOnInIt();
  }

  openLogInDialog(){
    const dialogConfig = this.dialog.open(LogInComponent, {
      width: '450px',
      data: {id: 1,
        title: 'Admin Log In'},
      autoFocus: false
    });
    dialogConfig.afterClosed().subscribe(
      data => console.log("Dialog output: ", data)
    );
  }
  
  ngOnInIt(){
  }

}
