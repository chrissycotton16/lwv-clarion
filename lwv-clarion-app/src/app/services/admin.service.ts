import { Injectable, Output, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Admin } from 'src/app/models/admin';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    redirectUrl: string;
    baseUrl:string = "http://localhost/api/lwv/admin";
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    admins: Admin[];
    confirmedAdmin: Admin[];
    checkAdmin = {user:'', password:''}
    user: string;
    password: string;
    correctLogIn: boolean;
    constructor(private http : HttpClient) { }

    userLogin(admin: Admin): Observable<Admin[]> {
        console.log("in userLogin, next line is the post");
        console.log(admin);
        return this.http.post(`${this.baseUrl}/login`, {data: admin},{responseType: "text"})
            .pipe(map((res) => {
                if(res == "success"){
                    console.log("inside success if");
                    alert("Welcome admin!");
                    this.correctLogIn = true;
                    
                    //console.log("setting token");
                    this.setToken("admin");
                    //return this.confirmedAdmin;
                }
                else{
                    this.correctLogIn = false;
                    alert("Access denied: Incorrect user or password.");
                    console.log("inside failure if");   
                    //this.deleteToken();
                    //this.getToken();
                    //console.log(localStorage);
                }
                return this.confirmedAdmin;
            }),
            catchError(this.handleError));
    }

    getIfLoggedIn(){
        return this.correctLogIn;
    }

    store(admin: Admin): Observable<Admin[]> {
        console.log("in admin service");
        return this.http.post(`${this.baseUrl}/store`, { data: admin })
        .pipe(map((res) => {
            this.admins.push(res['data']);
            return this.admins;
        }),
        catchError(this.handleError));
    }
   
    getAll(): Observable<Admin[]> {
        return this.http.get(`${this.baseUrl}/list`).pipe(
        map((res) => {
            this.admins = res['data'];
            return this.admins;
        }),
        catchError(this.handleError));
    }

    delete(AdminID: number): Observable<Admin[]> {
        const params = new HttpParams()
        .set('AdminID', AdminID.toString());

        return this.http.delete(`${this.baseUrl}/delete`, { params: params })
        .pipe(map(res => {
            const filteredAdmins = this.admins.filter((admin) => {
            return +admin['AdminID'] !== +AdminID;
            });
            return this.admins = filteredAdmins;
        }),
        catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        // return an observable with a user friendly message
        return throwError('Error! something went wrong.');
    }

    //token
    setToken(token: string) {
        localStorage.setItem('token', token);
        console.log(localStorage);
    }
    getToken() {
        return localStorage.getItem('token');
    }
    deleteToken() {
        localStorage.removeItem('token');
    }
    isLoggedIn() {
        const usertoken = this.getToken();
        if (usertoken != null) {
            return true
        }
        return false;
    }
}