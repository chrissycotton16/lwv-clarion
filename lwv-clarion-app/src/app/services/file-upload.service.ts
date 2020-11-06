import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    constructor(private http: HttpClient) { }

    postFile(fileToUpload: File): void{
        //Observable<boolean> {
        // const endpoint = 'http://localhost/api/lwv/image';
        // const formData: FormData = new FormData();
        // formData.append('fileKey', fileToUpload, fileToUpload.name);
        // return this.http
        // .post(endpoint, formData, { headers: "" })
        // .map(() => { return true; })
        // .catch((e) => this.handleError(e));
    }
    handleError(e: any) {
        throw new Error("Method bad chrissy");
    }
}