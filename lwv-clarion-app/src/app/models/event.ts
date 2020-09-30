import { Time } from '@angular/common';

export class Event {
    constructor(
        //required attributes of Event
        Name: string,
        Date: Date, // check data type
        Time?: Time, // check data type
        Description?: string,
        EventID?:   number      
    ) {}
  }
  