import { componentFactoryName } from '@angular/compiler';
import { Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { OfficersComponent } from './components/officers/officers.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { AdminComponent } from './components/admin/admin.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'resources',
        component: ResourcesComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'officers',
        component: OfficersComponent
    },
    {
        path: 'log-in',
        component: LogInComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    }

];

export default appRoutes;