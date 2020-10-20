export class Newsletter {
    constructor(
        //required attributes of Newsletter
        FileName: string,
        DisplayName: string,
        PDFFile: Blob, // check data type
        Description?: string,
        NewsletterID?:   number      
    ) {}
  }