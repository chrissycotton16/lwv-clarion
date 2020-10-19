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
import { MatTabsModule } from '@angular/material/tabs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatDialogModule} from '@angular/material/dialog';

import { CarouselComponent } from './components/home/carousel/carousel.component';
import { MembersComponent } from './components/admin/members/members.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MemberAddDialogComponent } from './components/admin/members/member-add-dialog/member-add-dialog.component';

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
    CarouselComponent,
    MembersComponent,
    MemberAddDialogComponent
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
    FormsModule,
    SlickCarouselModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
