import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { SignupComponent } from '../app/components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
