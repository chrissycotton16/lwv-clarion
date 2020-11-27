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
  archives: Document[];
  policies: Document[];
  constructor(private newsletterService: NewsletterService, private documentService: DocumentService) {
    this.getNewsletters();
    this.getPolicies();
    this.getArchives();
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

  getPolicies(){
    this.documentService.getPolicies().subscribe(
      (res: Document[]) => {
        this.policies = res;
      },
      (err) => {
        console.log(err)
      });
  }

  getArchives(){
    this.documentService.getArchives().subscribe(
      (res: Document[]) => {
        this.archives = res;
      },
      (err) => {
        console.log(err)
      });
  }

  ngOnInit(): void {
  }

}
