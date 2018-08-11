import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TeamOneComponent } from './components/team-one/team-one.component';
import { TeamTwoComponent } from './components/team-two/team-two.component';
import { PlayerNumberComponent } from './components/player-number/player-number.component';
import { ShotMapComponent } from './components/shot-map/shot-map.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamOneComponent,
    TeamTwoComponent,
    PlayerNumberComponent,
    ShotMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
