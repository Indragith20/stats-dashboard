import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { TeamOneComponent } from './components/team-one/team-one.component';
import { TeamTwoComponent } from './components/team-two/team-two.component';
import { PlayerNumberComponent } from './components/player-number/player-number.component';
import { ShotMapComponent } from './components/shot-map/shot-map.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app-routing.module';
import { StatsScreenComponent } from './components/stats-screen/stats-screen.component';
import { AppService } from './shared/services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { MyOwnCustomMaterialModule } from './app-material.module';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { OtpLoginComponent } from './components/otp-login/otp-login.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    TeamOneComponent,
    TeamTwoComponent,
    PlayerNumberComponent,
    ShotMapComponent,
    LoginComponent,
    StatsScreenComponent,
    DialogComponent,
    OtpLoginComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule
  ],
  providers: [AppService, AuthGuardService],
  entryComponents: [DialogComponent, SnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
