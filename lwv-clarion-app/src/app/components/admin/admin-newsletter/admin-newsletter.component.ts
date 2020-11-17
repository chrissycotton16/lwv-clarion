import { Component, OnInit, Input } from '@angular/core';
import { Newsletter } from 'src/app/models/newsletter';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NewsletterUpdateDialogComponent } from './newsletter-update-dialog/newsletter-update-dialog.component';

@Component({
  selector: 'app-admin-newsletter',
  templateUrl: './admin-newsletter.component.html',
  styleUrls: ['./admin-newsletter.component.scss']
})
export class AdminNewsletterComponent implements OnInit {

  displayedColumns: string[] = ['NewsletterID', 'pdfSrc', 'Title', 'Description', 'Edit'];
  newsletters: Newsletter[];
  newsletterLength: number;
  error = '';
  success = '';
  pdfStringResult: string;
  newsletterToUpdate: Newsletter ={ NewsletterID:0, pdfSrc:'', Title:'', Description:''};

  public pdfPath;
  pdfURL: any;
  public message: string;
  newPDFURL: string;
  newPDFTitle: string = '';
  newPDFDescription: string = '';
  pdfChosen = false;
  baseUrl = 'http://localhost/api/lwv/newsletter/';
  files:string[]  = [];

  uploadForm =  new  FormGroup({
    name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
    file:  new  FormControl('',  [Validators.required])
  });

  constructor(private newsletterService: NewsletterService, public dialog:MatDialog, private httpClient:  HttpClient){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getNewsletters();
  }

  //database crud operations
  getNewsletters():void {
    this.newsletterService.getAll().subscribe(
      (res: Newsletter[]) => {
        this.newsletters = res;
        this.newsletterLength = this.newsletters.length;
      },
      (err) => {
        this.error = err;
      });
  }
  
  openUpdateDialog(news){
    const dialogRef = this.dialog.open(NewsletterUpdateDialogComponent, {
      width: '450px',
      data:{ updateNewsletterID: news.NewsletterID, updatePdfSrc: news.pdfSrc, updateTitle: news.Title, updateDescription: news.Description},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.newsletterToUpdate = result;
        this.updateNewsletter(this.newsletterToUpdate);
      }
    });
    this.getNewsletters();
  }

  updateNewsletter(news){
    this.resetErrors();
    this.newsletterService.update({NewsletterID: news.NewsletterID, pdfSrc: news.pdfSrc, Title: news.Title, Description: news.Description})
    .subscribe(
      (res) => {
        this.newsletters = res;
        this.success = 'Updated successfully';
      },
      (err) => this.error = err
    );
  }


  onFileChange(event)  {
      this.files = [];
      if(event.target.files[0].size < 40000000){
        this.files.push(event.target.files[0]);
        this.pdfChosen=true;
      }
      else{
        alert("This file is too big, the maximum size the database will allow is 40 MB.")
        this.resetForm();
      }
  }

  submitForm(){
    this.resetErrors();
    const formData =  new  FormData();
    formData.append("file",  this.files[0]);
    this.httpClient.post((this.baseUrl+"testUpload"), formData, {responseType: "text"}).subscribe(res =>  {
      if(res != 'failure'){
        console.log(res);
        this.pdfStringResult = res;
        
        this.addtoDatabase(this.pdfStringResult, this.newPDFTitle, this.newPDFDescription);
        
        alert('File uploaded Successfully!');
        this.resetForm();

      }
      else{
        console.log(res);
        alert('File did not upload successfully. Please make sure the file you are submitting is a pdf and that it doesnt already exist in the folder.');
        this.resetForm();
      }
    });
  }

  addtoDatabase(pdfString, title, description){
    this.newsletterService.store(pdfString, title, description);
    this.getNewsletters();
  }

  resetForm(){
    this.uploadForm = new  FormGroup({
      name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
      file:  new  FormControl('',  [Validators.required])
    });
    this.pdfURL = "";
    this.newPDFDescription = "";
    this.newPDFTitle = "";
    this.pdfChosen = false;
  }

  deletePDF(NewsletterID, pdfSrc) {
    if(window.confirm('Are you sure you want to delete this item?')){
      this.resetErrors();
      this.newsletterService.delete(+NewsletterID)
        .subscribe(
          (res: Newsletter[]) => {
            this.newsletters = res;
            this.success = 'Deleted successfully';
          },
          (err) => this.error = err
        );
      this.getNewsletters();
    }
    this.newsletterService.deleteFromFolder(pdfSrc);
  }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }

}
