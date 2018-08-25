import { Routes, RouterModule } from '@angular/router';
import { StatsScreenComponent } from './components/stats-screen/stats-screen.component';
import { OtpLoginComponent } from './components/otp-login/otp-login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { JerseyPickerComponent } from './components/jersey-picker/jersey-picker.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: OtpLoginComponent },
  { path: 'stats-dashboard', component: StatsScreenComponent, canActivate: [AuthGuardService] },
  { path: 'jersey-picker', component: JerseyPickerComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: 'login'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);