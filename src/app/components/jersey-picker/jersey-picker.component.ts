import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../shared/services/app.service';


@Component({
  selector: 'app-jersey-picker',
  templateUrl: './jersey-picker.component.html',
  styleUrls: ['./jersey-picker.component.scss']
})
export class JerseyPickerComponent implements OnInit {
  matchDetails: any;
  teamOneName: string;
  teamTwoName: string;
  teamOneJerseyColor: any;
  teamTwoJerseyColor: any;

  colorList: any[] = [{
    color: 'Red',
    value: '#F44336'
  },{
    color: 'Purple',
    value: '#9C27B0'
  },{
    color: 'Indigo',
    value: '#3F51B5 '
  },{
    color: 'Green',
    value: '#4CAF50'
  },{
    color: 'Blue',
    value: '#2196F3'
  },{
    color: 'Yellow',
    value: '#FFEB3B'
  },{
    color: 'Black',
    value: '#000000'
  },{
    color: 'Brown',
    value: '#795548'
  }];
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.matchDetails = this.appService.matchDetails ? this.appService.matchDetails.message[0] : undefined;
    if(this.matchDetails) {
      this.teamOneName = this.matchDetails.managers.team1[0].team_name;
      this.teamTwoName = this.matchDetails.managers.team2[0].team_name;
    }
  }

  proceed() {
    this.appService.setJerseyColors(this.teamOneJerseyColor, this.teamTwoJerseyColor);
    this.router.navigateByUrl('/stats-dashboard');
  }

  getColor(color) {
    return color;
  }

}
