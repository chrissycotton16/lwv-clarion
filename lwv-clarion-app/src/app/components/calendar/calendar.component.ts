import { Component, OnInit } from '@angular/core';
import { EventSourceInput, CalendarOptions, Calendar } from '@fullcalendar/angular'; // useful for typechecking
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  eventsList:Event[];
  calendarOptions: CalendarOptions;
  error= '';

  constructor(private eventService: EventService, private dialog: MatDialog){
    this.getEvents();
  }
  ngOnInit(): void {

  }

  openCalendarDialog(arg){
    const dialogConfig = this.dialog.open(CalendarDialogComponent, {
      width: '50%',
      height: 'auto',
      data: {description: arg},
      autoFocus: false
    });
    dialogConfig.afterClosed().subscribe(
    );
  }
 
getCalendar(){
  this.calendarOptions = {
      initialView: 'dayGridMonth',
      displayEventEnd:true,
      displayEventTime:true,
      eventDisplay: 'block',
      eventColor: '#be0f34',
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
        right: 'dayGridMonth,listYear'
      },

      events: this.eventsList,

      eventClick:(arg) =>{
        this.openCalendarDialog(arg.event.extendedProps.description)
      }
      
    };
}

  getEvents() {
    this.eventService.getAllWithOutID().subscribe(
      (res: Event[]) => {
        this.eventsList = res;
        console.log(this.eventsList);
        this.getCalendar();

      },
      (err) => {
        this.error = err;
        console.log(this.error);
      }
    );
  }

  toggleListView() {
    this.calendarOptions.initialView = 'listMonth'
  }

}