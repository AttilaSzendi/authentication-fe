import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import { canActivateAuth } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
    canActivate: [canActivateAuth]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
    canActivate: [canActivateAuth]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'registration page'
  },
];
