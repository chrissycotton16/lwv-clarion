import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseUrl = 'https://clarionlwvpa.org/api/lwv/document';
  documents: Document[];
    constructor(private http: HttpClient) { }

  getAll(): Observable<Document[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
    map((res) => {
        this.documents = res['data'];
        return this.documents;
    }),
    catchError(this.handleError));
  }

  getPolicies(): Observable<Document[]> {
    return this.http.get(`${this.baseUrl}/listPolicies`).pipe(
    map((res) => {
        this.documents = res['data'];
        return this.documents;
    }),
    catchError(this.handleError));
  }
  getArchives(): Observable<Document[]> {
    return this.http.get(`${this.baseUrl}/listArchives`).pipe(
    map((res) => {
        this.documents = res['data'];
        return this.documents;
    }),
    catchError(this.handleError));
  }

  delete(DocumentID: number): Observable<Document[]> {
    const params = new HttpParams()
    .set('DocumentID', DocumentID.toString());
    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
    .pipe(map(res => {
        const filteredDocuments = this.documents.filter((document) => {
        return +document['DocumentID'] !== +DocumentID;
        });
        return this.documents = filteredDocuments;
    }),
    catchError(this.handleError));
  }

  deleteFromFolder(pdfSrc: any) {
    this.http.post(`${this.baseUrl}/deleteDocument`, {pdfSrc}, {responseType: 'text'}).subscribe(res => {
    })
  }

  store(pdfString: string, Title: string, Description: string, Type :string) {
    let doc: Document = {DocumentID: 0, pdfSrc: pdfString, Title: Title, Description: Description, Type: Type};
    this.http.post(`${this.baseUrl}/store`, { data: doc }).subscribe(res => {
      this.documents.push(res['data']);
    }),
    catchError(this.handleError);
   }

   update(document: Document): Observable<Document[]> {
    return this.http.put(`${this.baseUrl}/update`, { data: document })
    .pipe(map((res) => {
        const theDocument = this.documents.find((item) => {
        return +item['DocumentID'] === +document['DocumentID'];
        });
        if (theDocument) {
            theDocument['pdfSrc'] = theDocument['pdfSrc'];
            theDocument['Title'] = theDocument['Title'];
            theDocument['Description'] = theDocument['Description'];
            theDocument['Type'] = theDocument['Type'];
        }
        return this.documents;
    }),
    catchError(this.handleError));
} 

  private handleError(error: HttpErrorResponse) {
      // return an observable with a user friendly message
      return throwError('Error! something went wrong.');
  }
}