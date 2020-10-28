import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { HistoryComponent } from './components/history/history.component';
import { OfficersComponent } from './components/officers/officers.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import  appRoutes from './routerConfig';

import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';

//carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselComponent } from './components/home/carousel/carousel.component';
//calendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import listPlugin from '@fullcalendar/list'; 
import interactionPlugin from '@fullcalendar/interaction'; 
//resources
import {MatExpansionModule} from '@angular/material/expansion';
import { PdfViewerModule } from 'ng2-pdf-viewer';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  listPlugin,
  interactionPlugin
]);




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    ResourcesComponent,
    HistoryComponent,
    OfficersComponent,
    LogInComponent,
    AdminComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    SlickCarouselModule,
    FullCalendarModule,
    FormsModule,
    SlickCarouselModule,
    MatExpansionModule,
    PdfViewerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
