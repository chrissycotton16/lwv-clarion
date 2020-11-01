import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
    baseUrl = 'http://localhost/api/lwv/event';
    events: Event[];
    constructor(private http: HttpClient) { }

    getAll(): Observable<Event[]> {
        return this.http.get(`${this.baseUrl}/list`).pipe(
        map((res) => {
            this.events = res['data'];
            return this.events;
        }),
        catchError(this.handleError));
    }

    getAllWithOutID(): Observable<Event[]> {
        return this.http.get(`${this.baseUrl}/listNoID`).pipe(
        map((res) => {
            this.events = res['data'];
            return this.events;
        }),
        catchError(this.handleError));
    }

    delete(EventID: number): Observable<Event[]> {
        const params = new HttpParams()
        .set('EventID', EventID.toString());

        return this.http.delete(`${this.baseUrl}/delete`, { params: params })
        .pipe(map(res => {
            const filteredEvents = this.events.filter((event) => {
            return +event['EventID'] !== +EventID;
            });
            return this.events = filteredEvents;
        }),
        catchError(this.handleError));
    }

    store(event: Event): Observable<Event[]> {
        console.log("in event service");
        return this.http.post(`${this.baseUrl}/store`, { data: event })
        .pipe(map((res) => {
            this.events.push(res['data']);
            return this.events;
        }),
        catchError(this.handleError));
    }

    update(event: Event): Observable<Event[]> {
        console.log(event);
        return this.http.put(`${this.baseUrl}/update`, { data: event })
        .pipe(map((res) => {
            const theEvent = this.events.find((item) => {
            return +item['EventID'] === +event['EventID'];
            });
            if (theEvent) {
                theEvent['title'] = event['title'];
                theEvent['start'] = event['start'];
                theEvent['end'] = event['end'];
                theEvent['description'] = event['description'];
            }
            return this.events;
        }),
        catchError(this.handleError));
    } 
    
    private handleError(error: HttpErrorResponse) {
        console.log(error);
        // return an observable with a user friendly message
        return throwError('Error! something went wrong.');
    }
}
