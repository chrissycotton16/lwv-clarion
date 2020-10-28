import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Officer } from '../models/officer';
@Injectable({
    providedIn: 'root'
})
export class OfficerService {
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

    delete(OfficerID: number): Observable<Officer[]> {
        const params = new HttpParams()
        .set('OfficerID', OfficerID.toString());

        return this.http.delete(`${this.baseUrl}/delete`, { params: params })
        .pipe(map(res => {
            const filteredMembers = this.officers.filter((officer) => {
            return +officer['OfficerID'] !== +OfficerID;
            });
            return this.officers = filteredMembers;
        }),
        catchError(this.handleError));
    }

    store(officer: Officer): Observable<Officer[]> {
        console.log("in officer service");
        return this.http.post(`${this.baseUrl}/store`, { data: officer })
        .pipe(map((res) => {
            this.officers.push(res['data']);
            return this.officers;
        }),
        catchError(this.handleError));
    }

    update(officer: Officer): Observable<Officer[]> {
        console.log(officer);
        return this.http.put(`${this.baseUrl}/update`, { data: officer })
        .pipe(map((res) => {
            const theOfficer = this.officers.find((item) => {
            return +item['OfficerID'] === +officer['OfficerID'];
            });
            if (theOfficer) {
                theOfficer['FirstName'] = officer['FirstName'];
                theOfficer['LastName'] = officer['LastName'];
                theOfficer['Position'] = officer['Position'];
                theOfficer['Email'] = officer['Email'];
                theOfficer['TermStart'] = officer['TermStart'];
            }
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