import { Component, OnInit } from '@angular/core';
import { cards } from '../../../constants/constants';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-stats-screen',
  templateUrl: './stats-screen.component.html',
  styleUrls: ['./stats-screen.component.scss']
})
export class StatsScreenComponent implements OnInit {
  cardQuestions: any;
  matchDetails: any;
  teamOne: any;
  teamTwo: any;
  constructor(private appService: AppService) {
    this.cardQuestions = cards;
  }

  ngOnInit() {
    this.matchDetails = this.appService.matchDetails ? this.appService.matchDetails.message[0] : undefined;
    if(this.matchDetails) {
      this.teamOne = this.matchDetails.managers.team1[0];
      this.teamTwo = this.matchDetails.managers.team2[0];
      console.log(this.teamOne.team_name);
    }
  }

}
