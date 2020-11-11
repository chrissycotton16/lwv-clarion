import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
    baseUrl = 'http://localhost/api/lwv/image';
    images: Image[];
    constructor(private http: HttpClient) { }

    getAll(): Observable<Image[]> {
      return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
          this.images = res['data'];
          console.log(this.images);
          return this.images;
      }),
      catchError(this.handleError));
  }


  postFile(fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.baseUrl}/fileUpload`, formData)
      .pipe(map(res =>{
        console.log((res));
      }),
      catchError(this.handleError));
      
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
  }

  delete(ImageID: number): Observable<Image[]> {
      const params = new HttpParams()
      .set('ImageID', ImageID.toString());

      return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      .pipe(map(res => {
          const filteredImages = this.images.filter((image) => {
          return +image['ImageID'] !== +ImageID;
          });
          return this.images = filteredImages;
      }),
      catchError(this.handleError));
  }

  fileUpload(){
      return this.http.post(`${this.baseUrl}/fileUpload`, {  }, {responseType: "text"})
      .pipe(map((res) => {
        console.log(res);
      }),
      catchError(this.handleError));
  }
  // store(image: Image): Observable<Image[]> {
  //     return this.http.post(`${this.baseUrl}/store`, { data: image })
  //     .pipe(map((res) => {
  //         this.images.push(res['data']);
  //         return this.images;
  //     }),
  //     catchError(this.handleError));
  // }
  
  private handleError(error: HttpErrorResponse) {
      console.log(error);
      // return an observable with a user friendly message
      return throwError('Error! something went wrong.');
  }
}