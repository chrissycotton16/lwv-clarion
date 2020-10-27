import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Officer } from '../models/officer';
@Injectable({
    providedIn: 'root'
})
export class MemberService {
    baseUrl = 'http://localhost/api/lwv/officer';
    constructor(private http: HttpClient) { }
    officers: Officer[];

    getAll(): Observable<Officer[]> {
        return this.http.get(`${this.baseUrl}/list`).pipe(
        map((res) => {
            this.officers = res['data'];
            return this.officers;
        }),
        catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);

        // return an observable with a user friendly message
        return throwError('Error! something went wrong.');
    }
}