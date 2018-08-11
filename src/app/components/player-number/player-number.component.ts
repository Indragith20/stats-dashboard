import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-number',
  templateUrl: './player-number.component.html',
  styleUrls: ['./player-number.component.css']
})
export class PlayerNumberComponent implements OnInit {
  //TODO: Selected Player Number Should be Unique .Generate the unique value by combining team name and jeysey number
  playerJerseyNumbers: number[] = [];
  selectedPlayer: number;
  constructor() { }

  ngOnInit() {
    for(let i = 1; i<12; i++) {
      this.playerJerseyNumbers.push(i);
    }
  }

  selectPlayer(playerNumber) {
    this.selectedPlayer = playerNumber;
  }

}
