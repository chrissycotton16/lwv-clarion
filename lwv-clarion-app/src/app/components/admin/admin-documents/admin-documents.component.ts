import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DocumentUpdateDialogComponent } from './document-update-dialog/document-update-dialog.component';

@Component({
  selector: 'app-admin-documents',
  templateUrl: './admin-documents.component.html',
  styleUrls: ['./admin-documents.component.scss']
})
export class AdminDocumentsComponent implements OnInit {
  displayedColumns: string[] = ['pdfSrc', 'Title', 'Description', 'Type', 'Edit'];
  types: string[] = ['Policy', 'Archive'];
  documents: Document[];
  documentLength: number;
  error = '';
  success = '';
  pdfStringResult: string;
  documentToUpdate: Document ={ DocumentID:0, pdfSrc:'', Title:'', Description:'', Type:''};
  public pdfPath;
  pdfURL: any;
  public message: string;
  newPDFURL: string;
  newPDFTitle: string = '';
  newPDFDescription: string = '';
  newType: string = '';
  pdfChosen = false;
  baseUrl = 'https://clarionlwvpa.org/api/lwv/document/';
  files:string[]  = [];
  selection: string;
  uploadForm =  new  FormGroup({
    name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
    file:  new  FormControl('',  [Validators.required])
  });

  constructor(private documentService: DocumentService, public dialog:MatDialog, private httpClient:  HttpClient){
    this.ngOnInit();
  }

  ngOnInit(){
    this.selection = 'All';

    this.getDocuments();
  }

  //database crud operations
  getDocuments():void {
    this.documentService.getAll().subscribe(
      (res: Document[]) => {
        this.documents = res;
        this.documentLength = this.documents.length;
      },
      (err) => {
        this.error = err;
      });
  }
  
  openUpdateDialog(doc){
    const dialogRef = this.dialog.open(DocumentUpdateDialogComponent, {
      width: '450px',
      data:{ updateDocumentID: doc.DocumentID, updatePdfSrc: doc.pdfSrc, updateTitle: doc.Title, updateDescription: doc.Description, updateType: doc.Type},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.documentToUpdate = result;
        this.updateDocuments(this.documentToUpdate);
      }
    });
    this.getDocuments();
  }

  updateDocuments(doc){
    this.resetErrors();
    this.documentService.update({DocumentID: doc.DocumentID, pdfSrc: doc.pdfSrc, Title: doc.Title, Description: doc.Description, Type: doc.Type})
    .subscribe(
      (res) => {
        this.documents = res;
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
        this.pdfStringResult = res;
        
        this.addtoDatabase(this.pdfStringResult, this.newPDFTitle, this.newPDFDescription, this.newType);
        
        alert('File uploaded Successfully!');
        this.resetForm();

      }
      else{
        alert('File did not upload successfully. Please make sure the file you are submitting is a pdf and that it doesnt already exist in the folder.');
        this.resetForm();
      }
    });
  }

  addtoDatabase(pdfString, title, description, type){
    this.documentService.store(pdfString, title, description, type);
    this.getDocuments();
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

  deletePDF(DocumentID, pdfSrc) {
    if(window.confirm('Are you sure you want to delete this item?')){
      this.resetErrors();
      this.documentService.delete(+DocumentID)
        .subscribe(
          (res: Document[]) => {
            this.documents = res;
            this.success = 'Deleted successfully';
          },
          (err) => this.error = err
        );
      this.getDocuments();
    }
    this.documentService.deleteFromFolder(pdfSrc);
  }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }

  handleChange(evt) {
    if(evt.value == 'All'){
      this.getDocuments();
    }
    else if(evt.value =='Policy'){
      this.documentService.getPolicies().subscribe(
        (res: Document[]) => {
          this.documents = res;
          this.documentLength = this.documents.length;
        },
        (err) => {
          this.error = err;
        }
      );    
    }
    else if(evt.value =='Archive'){
      this.documentService.getArchives().subscribe(
        (res: Document[]) => {
          this.documents = res;
          this.documentLength = this.documents.length;
        },
        (err) => {
          this.error = err;
        }
      );    
    }
  }
}
