import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
    baseUrl = 'http://localhost/api/lwv/member';
    members: Member[];
   
    constructor(private http: HttpClient) { }

    getAll(): Observable<Member[]> {
        return this.http.get(`${this.baseUrl}/list`).pipe(
        map((res) => {
            this.members = res['data'];
            return this.members;
        }),
        catchError(this.handleError));
    }

    delete(MemberID: number): Observable<Member[]> {
        const params = new HttpParams()
        .set('MemberID', MemberID.toString());

        return this.http.delete(`${this.baseUrl}/delete`, { params: params })
        .pipe(map(res => {
            const filteredMembers = this.members.filter((member) => {
            return +member['MemberID'] !== +MemberID;
            });
            return this.members = filteredMembers;
        }),
        catchError(this.handleError));
    }

    store(member: Member): Observable<Member[]> {
        console.log("in mem service");
        return this.http.post(`${this.baseUrl}/store`, { data: member })
        .pipe(map((res) => {
            this.members.push(res['data']);
            return this.members;
        }),
        catchError(this.handleError));
    }

    update(member: Member): Observable<Member[]> {
        return this.http.put(`${this.baseUrl}/update`, { data: member })
        .pipe(map((res) => {
            const theMember = this.members.find((item) => {
            return +item['MemberID'] === +member['MemberID'];
            });
            if (theMember) {
            theMember['FirstName'] = member['FirstName'];
            theMember['LastName'] = member['LastName'];
            }
            //console.log("maybe now it works????: " + this.members);
            return this.members;
        }),
        catchError(this.handleError));
    } 
    
    private handleError(error: HttpErrorResponse) {
        console.log(error);

        // return an observable with a user friendly message
        return throwError('Error! something went wrong.');
    }
}
