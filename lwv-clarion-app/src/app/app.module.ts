import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { HistoryComponent } from './components/history/history.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import  appRoutes from './routerConfig';

import { AdminComponent } from './components/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';
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
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { NewMemberDialogComponent } from './components/new-member-dialog/new-member-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './components/payment/payment.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  listPlugin,
  interactionPlugin
]);

import {MatDialogModule} from '@angular/material/dialog';

import { MembersComponent } from './components/admin/members/members.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MemberAddDialogComponent } from './components/admin/members/member-add-dialog/member-add-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MemberUpdateDialogComponent } from './components/admin/members/member-update-dialog/member-update-dialog.component';
import { AdminOfficersComponent } from './components/admin/admin-officers/admin-officers.component';
import { MatSortModule } from '@angular/material/sort';
import { OfficerUpdateDialogComponent } from './components/admin/admin-officers/officer-update-dialog/officer-update-dialog.component';
import { OfficerAddDialogComponent } from './components/admin/admin-officers/officer-add-dialog/officer-add-dialog.component';
import { AdminEventsComponent } from './components/admin/admin-events/admin-events.component';
import { EventAddDialogComponent } from './components/admin/admin-events/event-add-dialog/event-add-dialog.component';
import { EventUpdateDialogComponent } from './components/admin/admin-events/event-update-dialog/event-update-dialog.component';
import { AdminNewsletterComponent } from './components/admin/admin-newsletter/admin-newsletter.component';
import { AdminPictureComponent } from './components/admin/admin-picture/admin-picture.component';
import {CalendarDialogComponent} from './components/calendar-dialog/calendar-dialog.component'
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminAddDialogComponent } from './components/admin/admin-users/admin-add-dialog/admin-add-dialog.component';
import { AdminUpdateDialogComponent } from './components/admin/admin-users/admin-update-dialog/admin-update-dialog.component';
import { NewsletterUpdateDialogComponent } from './components/admin/admin-newsletter/newsletter-update-dialog/newsletter-update-dialog.component';

import {LayoutModule} from '@angular/cdk/layout';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AdminDocumentsComponent } from './components/admin/admin-documents/admin-documents.component';
import { DocumentUpdateDialogComponent } from './components/admin/admin-documents/document-update-dialog/document-update-dialog.component';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    ResourcesComponent,
    HistoryComponent,
    LogInComponent,
    AdminComponent,
    CarouselComponent,
    MembersComponent,
    MemberAddDialogComponent,
    MemberUpdateDialogComponent,
    AdminOfficersComponent,
    NewMemberDialogComponent,
    PaymentComponent,
    OfficerUpdateDialogComponent,
    OfficerAddDialogComponent,
    AdminEventsComponent,
    EventAddDialogComponent,
    EventUpdateDialogComponent,
    AdminNewsletterComponent,
    AdminPictureComponent,
    CalendarDialogComponent,
    AdminUsersComponent,
    AdminAddDialogComponent,
    AdminUpdateDialogComponent,
    NewsletterUpdateDialogComponent,
    AdminDocumentsComponent,
    DocumentUpdateDialogComponent,
    ContactDialogComponent
  
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
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    SlickCarouselModule,
    MatSortModule,
    PdfJsViewerModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ScrollingModule,
    MatRadioModule,
    LayoutModule
  
  ],
  exports:[ObserversModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
