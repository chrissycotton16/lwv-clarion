import { Component, OnInit, Inject } from '@angular/core';
import { Newsletter } from 'src/app/models/newsletter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData{
  NewsletterToUpdate: Newsletter;
  updateNewsletterID: number;
  updatePdfSrc: string;
  updateTitle: string;
  updateDescription: string;
}
@Component({
  selector: 'app-newsletter-update-dialog',
  templateUrl: './newsletter-update-dialog.component.html',
  styleUrls: ['./newsletter-update-dialog.component.scss']
})
export class NewsletterUpdateDialogComponent implements OnInit {
  NewsletterToUpdate: Newsletter;
  updateNewsletterID: number;
  updatePdfSrc: string;
  updateTitle: string;
  updateDescription: string;
  error ='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<NewsletterUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ngOnInit(): void {}

  onOkClick(){
    this.data.NewsletterToUpdate = { NewsletterID: this.data.updateNewsletterID,
      pdfSrc: this.data.updatePdfSrc,
      Title:this.data.updateTitle, 
      Description:this.data.updateDescription};
      this.dialogRef.close(this.data.NewsletterToUpdate);
  }
}
