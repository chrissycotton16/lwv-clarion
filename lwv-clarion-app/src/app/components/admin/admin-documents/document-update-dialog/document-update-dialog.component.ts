import { Component, OnInit, Inject } from '@angular/core';
import { Document } from 'src/app/models/document';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData{
  DocumentToUpdate: Document;
  updateDocumentID: number;
  updatePdfSrc: string;
  updateTitle: string;
  updateDescription: string;
  updateType: string;
}

@Component({
  selector: 'app-document-update-dialog',
  templateUrl: './document-update-dialog.component.html',
  styleUrls: ['./document-update-dialog.component.scss']
})
export class DocumentUpdateDialogComponent implements OnInit {

  DocumentToUpdate: Document;
  updateDocumentID: number;
  updatePdfSrc: string;
  updateTitle: string;
  updateDescription: string;
  updateType: string;
  error ='';
  types: string[] = ['Policy', 'Archive']
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<DocumentUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ngOnInit(): void {}

  onOkClick(){
    this.data.DocumentToUpdate = { DocumentID: this.data.updateDocumentID,
      pdfSrc: this.data.updatePdfSrc,
      Title:this.data.updateTitle, 
      Description:this.data.updateDescription,
      Type: this.data.updateType
    };
      this.dialogRef.close(this.data.DocumentToUpdate);
  }
}
