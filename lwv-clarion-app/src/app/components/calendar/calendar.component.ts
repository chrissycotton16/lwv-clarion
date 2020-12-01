import { Component, OnInit } from '@angular/core';
import { EventSourceInput, CalendarOptions, Calendar } from '@fullcalendar/angular'; // useful for typechecking
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AutofillMonitor } from '@angular/cdk/text-field';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  eventsList:Event[];
  calendarOptions: CalendarOptions;
  error= '';

  constructor(private eventService: EventService, private dialog: MatDialog, private breakpointObserver: BreakpointObserver){
    this.getEvents();   
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  ngOnInit(): void {
   
  }

  openCalendarDialog(description, title, start, end){
    const dialogConfig = this.dialog.open(CalendarDialogComponent, {
      width: '60%',
      height: 'auto',
      data: {description: description, title: title, start:start, end:end},
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
          this.openCalendarDialog(arg.event.extendedProps.description, arg.event.title, arg.event.start, arg.event.end);
        }
        
      };
      
  }

  getEvents() {
    this.eventService.getAllWithOutID().subscribe(
      (res: Event[]) => {
        this.eventsList = res;
        this.getCalendar();
        
      },
      (err) => {
        this.error = err;
      }
    );
  }

  toggleListView() {
    this.calendarOptions.initialView = 'listMonth'  
  }

  mobileView(){
    if(this.isMobile)(
          
      this.calendarOptions.initialView = 'listMonth',
      this.calendarOptions.height= 'auto'
      
    )
  }

}