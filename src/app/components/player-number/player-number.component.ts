import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-number',
  templateUrl: './player-number.component.html',
  styleUrls: ['./player-number.component.scss']
})
export class PlayerNumberComponent implements OnInit {
  //TODO: Selected Player Number Should be Unique .Generate the unique value by combining team name and jeysey number
  @Input() 
  set playerInField(playerList: any) {
    if(playerList) {
      playerList.map((player) => {
        this.playerList.push({
          jerseyNumber: player.jersey_number,
          playerName: player.name
        })
      })
    }
  }
  playerList: any[] = [];
  selectedPlayer: number;
  constructor() { }

  ngOnInit() {
    // for(let i = 1; i<12; i++) {
    //   this.playerJerseyNumbers.push(i);
    // }
  }

  selectPlayer(playerNumber) {
    this.selectedPlayer = playerNumber;
  }

}
