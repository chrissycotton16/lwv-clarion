import { Component, OnInit, Input } from '@angular/core';
import {Event} from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventAddDialogComponent } from './event-add-dialog/event-add-dialog.component';
import { EventUpdateDialogComponent } from './event-update-dialog/event-update-dialog.component';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {
  displayedColumns: string[] = ['Title', 'StartTime', 'EndTime', 'Description', 'Edit'];
  @Input() event ={ EventID:0, title:'', start:'', end:'', description:''}; //this is for storing purposes
  events: Event[];
  eventLength: number;
  error = '';
  success = '';
  @Input() newEvent: Event ={ EventID:0, title:'', start:'', end:'', description:''};
  eventToUpdate: Event ={ EventID:0, title:'', start:'', end:'', description:''};

  constructor(private eventService: EventService, public dialog:MatDialog){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getEvents();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(EventAddDialogComponent, {
      width: '450px',
      data:{ newOfficer: this.newEvent },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newEvent = result;
      if(result != undefined){
        this.addEvent(this.newEvent);
      }
    });
  } 

  addEvent(eve:Event){
    eve = this.newEvent;
    this.resetErrors();
    this.eventService.store(eve)
      .subscribe(
        (res: Event[]) => {
          // Update the list of events
          this.events = res;
          // Inform the user
          this.success = 'Created successfully';
        },
        (err) => this.error = err
      );
    this.getEvents();
  }

  getEvents():void {
    this.eventService.getAll().subscribe(
      (res: Event[]) => {
        this.events = res;
        this.eventLength = this.events.length;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  deleteEvent(EventID) {
    if(window.confirm('Are you sure you want to delete this item?')){
      this.resetErrors();
      this.eventService.delete(+EventID)
        .subscribe(
          (res: Event[]) => {
            this.events = res;
            this.success = 'Deleted successfully';
          },
          (err) => this.error = err
        );
      this.getEvents();
    }
  }

  openUpdateDialog(eve){
    const dialogRef = this.dialog.open(EventUpdateDialogComponent, {
      width: '450px',
      data:{ updateEventID: eve.EventID, updateTitle: eve.title, updateStartTime: eve.start, updateEndTime: eve.end,  
             updateDescription: eve.description},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.eventToUpdate = result;
        this.updateEvent(this.eventToUpdate);
      }
    });
    this.getEvents();
  }

  updateEvent(eve){
    this.resetErrors();
    this.eventService.update({EventID: eve.EventID, title: eve.title, start: eve.start, end: eve.end,  
      description: eve.description})
    .subscribe(
      (res) => {
        this.events = res;
        this.success = 'Updated successfully';
      },
      (err) => this.error = err
    );
  }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }
}
