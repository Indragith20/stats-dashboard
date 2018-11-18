import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PlayerService } from '../../shared/services/get-player-details.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
  formattedTimeLineData: any;
  constructor(public dialogRef: MatDialogRef<TimeLineComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
          private playerService: PlayerService) {
    this.formatTimeLine(data);
  }

  ngOnInit() {
  }

  formatTimeLine(data) {
    if (data) {
      this.formattedTimeLineData = data.timeline.filter(timeline => timeline instanceof Object)
        .map(filteredTimeline => ({
          time: filteredTimeline.date_created,
          event: filteredTimeline.type,
          teamName: this.playerService.getTeamName(filteredTimeline.team_id),
          playerName: this.playerService.getPlayerName(filteredTimeline.team_id, filteredTimeline.by),
          eventIcon: this.playerService.getIcon(filteredTimeline.type)
        })).reverse();
    }
  }

}
