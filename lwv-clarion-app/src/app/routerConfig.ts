import { componentFactoryName } from '@angular/compiler';
import { Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { OfficersComponent } from './components/officers/officers.component';
import { RegisterToVoteComponent } from './components/register-to-vote/register-to-vote.component';
import { ResourcesComponent } from './components/resources/resources.component';

const appRoutes: Routes = [
    {
        path: 'home',
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
        path: 'register-to-vote',
        component: RegisterToVoteComponent
    },
    {
        path: 'log-in',
        component: LogInComponent
    }

];

export default appRoutes;