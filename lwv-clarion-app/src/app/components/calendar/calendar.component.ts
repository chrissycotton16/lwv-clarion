import { AUTO_STYLE } from '@angular/animations';
import { Component } from '@angular/core';
import {  CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    displayEventEnd:true,
    displayEventTime:true,
    eventDisplay: 'block',
    eventColor: '#be0f34',
    themeSystem: 'standard',
    aspectRatio: 2.3,
    showNonCurrentDates: false,
    expandRows: true,
    
    eventTimeFormat:
    {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },

    eventClick: this.handleEventClick.bind(this),
    events: [
      { title: 'event 1', start:'2020-10-17T13:00', end:'2020-10-17T15:00' },
      { title: 'event 2', start:'2020-10-10T16:00', end:'2020-10-10T18:00' },
      { title: 'event 3', start:'2020-10-20T12:00', end:'2020-10-20T12:30'}
    ]
  };

  handleEventClick(arg) {
    alert('Event Click')
  }
  toggleListView() {
    this.calendarOptions.initialView = 'listMonth'
  }

}