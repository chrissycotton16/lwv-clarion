import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Newsletter } from '../models/newsletter';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  
  
    baseUrl = 'https://clarionlwvpa.org/api/lwv/newsletter';
    newsletters: Newsletter[];
    constructor(private http: HttpClient) { }

  getAll(): Observable<Newsletter[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
    map((res) => {
        this.newsletters = res['data'];
        return this.newsletters;
    }),
    catchError(this.handleError));
  }

  delete(NewsletterID: number): Observable<Newsletter[]> {
    const params = new HttpParams()
    .set('NewsletterID', NewsletterID.toString());
    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
    .pipe(map(res => {
        const filteredNewsletters = this.newsletters.filter((newsletter) => {
        return +newsletter['NewsletterID'] !== +NewsletterID;
        });
        return this.newsletters = filteredNewsletters;
    }),
    catchError(this.handleError));
  }

  deleteFromFolder(pdfSrc: any) {
    this.http.post(`${this.baseUrl}/deleteNewsletter`, {pdfSrc}, {responseType: 'text'}).subscribe(res => {
      console.log(res);
    })
  }

  store(pdfString: string, Title: string, Description: string) {
    let news: Newsletter = {NewsletterID: 0, pdfSrc: pdfString, Title: Title, Description: Description};
    this.http.post(`${this.baseUrl}/store`, { data: news }).subscribe(res => {
      this.newsletters.push(res['data']);
    }),
    catchError(this.handleError);
   }

   update(newsletter: Newsletter): Observable<Newsletter[]> {
    console.log(newsletter);
    return this.http.put(`${this.baseUrl}/update`, { data: newsletter })
    .pipe(map((res) => {
      console.log(res);
        const theNewsletter = this.newsletters.find((item) => {
        return +item['NewsletterID'] === +newsletter['NewsletterID'];
        });
        if (theNewsletter) {
          theNewsletter['pdfSrc'] = newsletter['pdfSrc'];
          theNewsletter['Title'] = newsletter['Title'];
          theNewsletter['Description'] = newsletter['Description'];
        }
        return this.newsletters;
    }),
    catchError(this.handleError));
} 

  private handleError(error: HttpErrorResponse) {
      console.log(error);
      // return an observable with a user friendly message
      return throwError('Error! something went wrong.');
  }
}