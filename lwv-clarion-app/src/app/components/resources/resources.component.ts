import { Component, OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { Newsletter } from 'src/app/models/newsletter';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  panelOpenState = false;
  newsletters: Newsletter[];
  documents: Document[];
  constructor(private newsletterService: NewsletterService, private documentService: DocumentService) {
    this.getNewsletters();
    this.getDocuments();
  }

  getNewsletters(){
    this.newsletterService.getAll().subscribe(
      (res: Newsletter[]) => {
        this.newsletters = res;
      },
      (err) => {
        console.log(err)
      });
  }

  getDocuments(){
    this.documentService.getAll().subscribe(
      (res: Document[]) => {
        this.documents = res;
      },
      (err) => {
        console.log(err)
      });
  }

  ngOnInit(): void {
  }

}
