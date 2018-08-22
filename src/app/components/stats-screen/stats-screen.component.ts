import { Component, OnInit } from '@angular/core';
import { cards } from '../../../constants/constants';
import { AppService } from '../../shared/services/app.service';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

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
  referreeDetails: any;
  referredProfileData: any;
  periodCount: number = 1;
  teamOneAcronym: string;
  teamTwoAcronym: string;
  scoreCardContent: any;
  foulsContent: any;

  constructor(private appService: AppService, private snackBar: MatSnackBar) {
    this.cardQuestions = cards;
  }

  ngOnInit() {
    this.matchDetails = this.appService.matchDetails ? this.appService.matchDetails.message[0] : undefined;
    if(this.matchDetails) {
      this.teamOne = this.matchDetails.managers.team1[0];
      this.teamTwo = this.matchDetails.managers.team2[0];
      this.referreeDetails = this.appService.referreeDetails;
      
      this.referredProfileData = {
        refereeId: this.referreeDetails ? this.referreeDetails.profileId : '',
        refereeKhelId: this.referreeDetails ? this.referreeDetails.uniqueId: '',
        refereeUserName: this.referreeDetails ? this.referreeDetails.userName : '',
      };
      this.getScoreCardDetails();
    }
  }

  getScoreCardDetails() {
    const teamOneName = this.teamOne ? this.teamOne.team_name : '';
    this.teamOneAcronym = teamOneName.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
    const teamTwoName = this.teamTwo ? this.teamTwo.team_name : '';
    this.teamTwoAcronym = teamTwoName.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
    //TODO: Remove the below hardcoded Score values with real stats data
    const teamOneScore = 30;
    const teamTwoScore = 16;
    this.scoreCardContent = {
      teamOneAcronym: this.teamOneAcronym,
      teamTwoAcronym: this.teamTwoAcronym,
      teamOneScore: teamOneScore,
      teamTwoScore: teamTwoScore
    };
    //TODO: Remove the below hardcoded Foul values with real stats data
    const teamOneFouls = 30;
    const teamTwoFouls = 16;
    this.foulsContent = {
      teamOneAcronym: this.teamOneAcronym,
      teamTwoAcronym: this.teamTwoAcronym,
      teamOneFouls: teamOneFouls,
      teamTwoFouls: teamTwoFouls
    };
  }

  updateStatsData(statsData) {
    console.log(statsData);
    this.appService.updateMatchStatData(statsData).then((data: any) => {
      console.log(data);
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: data.message,
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }).catch((err) => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: err,
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    })
  }

}
