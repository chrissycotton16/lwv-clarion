import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lwv-clarion-app';

  constructor(){
    this.ngOnInIt();
  }

  ngOnInIt(){
  }

}
