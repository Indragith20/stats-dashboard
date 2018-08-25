import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss']
})
export class TeamStatsComponent implements OnInit {
  @Input() teamStats: any;
  constructor() { }

  ngOnInit() {
  }

}
