import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MembershipType } from '../models/membershiptype';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
    baseUrl = 'http://localhost/api/lwv/membershiptype';
    membershiptypes: MembershipType[];

    constructor(private http: HttpClient) { }

    getAll(): Observable<MembershipType[]> {
        return this.http.get(`${this.baseUrl}/list`).pipe(
        map((res) => {
            this.membershiptypes = res['data'];
            console.log(this.membershiptypes);
            return this.membershiptypes;
        }),
        catchError(this.handleError));
    }

    delete(MembershipID: number): Observable<MembershipType[]> {
        console.log("in member service delete method");
        const params = new HttpParams()
        .set('MemberID', MembershipID.toString());

        return this.http.delete(`${this.baseUrl}/delete`, { params: params })
        .pipe(map(res => {
            const filteredMembers = this.membershiptypes.filter((membershiptype) => {
            return +membershiptype['MembershipID'] !== +MembershipID;
            });
            return this.membershiptypes = filteredMembers;
        }),
        catchError(this.handleError));
    }

    // store(member: Member): Observable<Member[]> {
    //     console.log("in store method in member service");
    //     return this.http.post(`${this.baseUrl}/store`, { data: member })
    //     .pipe(map((res) => {
    //         this.members.push(res['data']);
    //         return this.members;
    //     }),
    //     catchError(this.handleError));
    //     console.log("leaving store method in member service");
    // }

    // update(member: Member): Observable<Member[]> {
    //     return this.http.put(`${this.baseUrl}/update`, { data: member })
    //     .pipe(map((res) => {
    //         const theMember = this.members.find((item) => {
    //         return +item['MemberID'] === +member['MemberID'];
    //         });
    //         if (theMember) {
    //         theMember['FirstName'] = member['FirstName'];
    //         theMember['LastName'] = member['LastName'];
    //         }
    //         console.log("maybe now it works????: " + this.members);
    //         return this.members;
    //     }),
    //     catchError(this.handleError));
    // } 
    
    private handleError(error: HttpErrorResponse) {
        console.log(error);

        // return an observable with a user friendly message
        return throwError('Error! something went wrong.');
    }
}
