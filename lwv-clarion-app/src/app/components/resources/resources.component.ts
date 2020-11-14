import { Component, OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { Newsletter } from 'src/app/models/newsletter';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  panelOpenState = false;
  newsletters: Newsletter[];
  constructor(private newsletterService: NewsletterService) {
    this.getNewsletters();
  }

  getNewsletters(){
    this.newsletterService.getAll().subscribe(
      (res: Newsletter[]) => {
        this.newsletters = res;
        console.log(this.newsletters);
      },
      (err) => {
        console.log(err)
      });
  }

  ngOnInit(): void {
  }

}
