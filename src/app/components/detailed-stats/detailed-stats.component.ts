import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-detailed-stats',
  templateUrl: './detailed-stats.component.html',
  styleUrls: ['./detailed-stats.component.scss']
})
export class DetailedStatsComponent implements OnInit {
  teamOneId: number;
  teamTwoId: number;
  teamOneName: string;
  teamTwoName: string;
  teamOneStatsData: any [] = [];
  teamTwoStatsData: any[] = [];


  constructor(public dialogRef: MatDialogRef<DetailedStatsComponent>, @Inject(MAT_DIALOG_DATA) public playersList: any, private appService: AppService) { 
    const players = playersList.playersList
    if(players) {
      this.teamOneId = players.team1[0].team_id;
      this.teamTwoId = players.team2[0].team_id;
      this.teamOneName = players.team1[0].team_name.toUpperCase();
      this.teamTwoName = players.team2[0].team_name.toUpperCase();
      this.getTeamStats(this.teamOneId);
    }
  }

  ngOnInit() {
  }

  getTeamStats(teamId) {
    this.appService.getMatchStatsData(teamId).then((data: any) => {
      if(teamId === this.teamOneId) {
        this.teamOneStatsData = [];
        Object.keys(data.message).map((keyName) => {
          const modifiedKey = keyName.replace('total_', '').toUpperCase();
          this.teamOneStatsData.push({
            key: modifiedKey,
            value: data.message[keyName]
          });
        });
      } else {
        this.teamTwoStatsData = [];
        Object.keys(data.message).map((keyName) => {
          const modifiedKey = keyName.replace('total_', '').toUpperCase();
          this.teamTwoStatsData.push({
            key: modifiedKey,
            value: data.message[keyName]
          });
        });
      }
      
    }).catch((err) => {
      this.dialogRef.close({dialogResult: 'Error'})
    });
  }

  changeEvent(event) {
    if(event.index === 0) {
      this.teamOneStatsData.length === 0 ? this.getTeamStats(this.teamOneId) : undefined;
    } else {
      this.teamTwoStatsData.length === 0 ? this.getTeamStats(this.teamTwoId) : undefined;
    }
  }

}
