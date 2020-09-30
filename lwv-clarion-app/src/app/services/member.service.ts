import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
    baseUrl = 'http://localhost/api/lwv';
    members: Member[];

    constructor(private http: HttpClient) { }

    getAll(): Observable<Member[]> {
        return this.http.get(`${this.baseUrl}/list`).pipe(
        map((res) => {
            this.members = res['data'];
            console.log(this.members);
            return this.members;
        }),
        catchError(this.handleError));
    }

    /*   store(car: Car): Observable<Car[]> {
        return this.http.post(`${this.baseUrl}/store`, { data: car })
        .pipe(map((res) => {
            this.cars.push(res['data']);
            return this.cars;
        }),
        catchError(this.handleError));
    }

    update(car: Car): Observable<Car[]> {
        return this.http.put(`${this.baseUrl}/update`, { data: car })
        .pipe(map((res) => {
            const theCar = this.cars.find((item) => {
            return +item['id'] === +car['id'];
            });
            if (theCar) {
            theCar['price'] = +car['price'];
            theCar['model'] = car['model'];
            }
            return this.cars;
        }),
        catchError(this.handleError));
    }

    delete(id: number): Observable<Car[]> {
        const params = new HttpParams()
        .set('id', id.toString());

        return this.http.delete(`${this.baseUrl}/delete`, { params: params })
        .pipe(map(res => {
            const filteredCars = this.cars.filter((car) => {
            return +car['id'] !== +id;
            });
            return this.cars = filteredCars;
        }),
        catchError(this.handleError));
    }
    */
    private handleError(error: HttpErrorResponse) {
        console.log(error);

        // return an observable with a user friendly message
        return throwError('Error! something went wrong.');
    }
}
