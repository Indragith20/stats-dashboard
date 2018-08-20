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
      console.log(this.teamOne.team_name);
    }
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
