import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-number',
  templateUrl: './player-number.component.html',
  styleUrls: ['./player-number.component.scss']
})
export class PlayerNumberComponent implements OnInit {
  @Input()
  set playerInField(playerList: any) {
    if(playerList) {
      this.playerList = [];
      playerList.map((player) => {
        this.playerList.push({
          jerseyNumber: player.jersey_number,
          playerName: player.name,
          khelId: player.player_id
        });
      });
    }
  }
  @Input() containerID: any;
  @Input() questionId: any;
  @Output() playerSelected = new EventEmitter<any>();
  playerList: any[] = [];
  selectedPlayer: number;
  constructor() { }

  ngOnInit() {}

  selectPlayer(player) {
    this.selectedPlayer = player.jerseyNumber;
    const dataToBePassed = {
      containerId: this.containerID,
      questionId: this.questionId,
      selectedPlayer: {
        jerseyNumber: player.jerseyNumber,
        playerName: player.playerName,
        khelId: player.khelId
      }
    };
    this.playerSelected.emit(dataToBePassed);
  }

}
