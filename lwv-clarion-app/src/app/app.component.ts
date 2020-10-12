import { Component, OnInit, Input } from '@angular/core';
import { Member } from './models/member';
import { MemberService } from './services/member.service';
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lwv-clarion-app';
}
