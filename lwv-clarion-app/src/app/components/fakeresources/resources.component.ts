import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  panelOpenState = false;

  constructor() { }


pdfSrc="./assets/LWVCC_Fiscal_Policy.pdf";
pdfSrc2="./assets/LWVCC_Nonpartisan_Policy.pdf";
pdfSrc3="./assets/LWVCC_Public_Releases_Policy.pdf";


  ngOnInit(): void {
  }

}
