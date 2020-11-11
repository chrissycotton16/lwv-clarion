import { Component, OnInit, Input } from '@angular/core';
import { Newsletter } from 'src/app/models/newsletter';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-newsletter',
  templateUrl: './admin-newsletter.component.html',
  styleUrls: ['./admin-newsletter.component.scss']
})
export class AdminNewsletterComponent implements OnInit {

  displayedColumns: string[] = ['NewsletterID', 'pdfSrc', 'Title', 'Description', 'Edit'];
  //@Input() new ={ ImageID:0, imageString:'', caption:''}; //this is for storing purposes
  newsletters: Newsletter[];
  newsletterLength: number;
  error = '';
  success = '';
  //@Input() newImage: Image ={ ImageID:0, imageString:'', caption:''};

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
      console.log(this.newsletters);
    },
    (err) => {
      this.error = err;
    });
 }

  public pdfPath;
  pdfURL: any;
  public message: string;
  newPDFURL: string;
  newPDFTitle: string = '';
  newPDFDescription: string = '';
  pdfChosen = false;
  onFileChange(event)  {
      this.files = [];
      this.files.push(event.target.files[0]);
      this.pdfChosen=true;
  }
  
  pdfStringResult: string;
  submitForm(){
    this.resetErrors();
    const formData =  new  FormData();
    formData.append("file",  this.files[0]);
    this.httpClient.post((this.baseUrl+"testUpload"), formData, {responseType: "text"}).subscribe(res =>  {
      if(res != 'failure'){
        alert('File uploaded Successfully!');
        console.log(res);
        this.pdfStringResult = res;
        //this.newImage = {ImageID: 0, imageString: res.toString(), caption: this.newImageCaption};  
        this.uploadForm = new  FormGroup({
          name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
          file:  new  FormControl('',  [Validators.required])
        });
        this.pdfURL = "";
        this.addtoDatabase(this.pdfStringResult, this.newPDFTitle, this.newPDFDescription);
        this.newPDFDescription = "";
        this.newPDFTitle = "";      }
      else{
        alert('File did not upload successfully. Please make sure the file you are submitting is a pdf and that it doesnt already exist in the folder.');
        this.uploadForm = new  FormGroup({
          name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
          file:  new  FormControl('',  [Validators.required])
        });
        this.pdfURL = "";
        this.newPDFDescription = "";
        this.newPDFTitle = "";
        this.pdfChosen = false;
      }
    });
   }

  addtoDatabase(pdfString, title, description){
    this.newsletterService.store(pdfString, title, description);
    this.getNewsletters();
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
