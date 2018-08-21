import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';


@Component({
  selector: 'app-team-one',
  templateUrl: './team-one.component.html',
  styleUrls: ['./team-one.component.scss']
})
export class TeamOneComponent implements OnInit {
  @Input()
  set cardDetails(value: any) {
    if(value){
      this.cards = value;
      this.intializeFormValues();
    }
  }
  @Input() teamDetails: any;
  @Input() referreeData : any;
  @Input() periodCount: any;
  @Output() updateStatsData = new EventEmitter<any>();
  cardForms: FormGroup;
  cards: any;
  closeResult: string;
  modalContent: FormGroup;
  modalHeader: string;
  statsData: any;
  

  get formData() { return <FormArray>this.cardForms.get('cards'); }

  get modalFormData() { return <FormArray>this.modalContent.get('questions'); }

  constructor(private fb: FormBuilder, public dialog: MatDialog) { 
    this.cardForms = this.fb.group({
      team: ['1'],
      cards: new FormArray([])
    });
    
  }

  ngOnInit() {}

  intializeFormValues() {
    this.cards.map((card) => {
      const questionFormArray = new FormArray([]);
      card.questions.map((question) => {
        const questionFormGroup = this.fb.group({
          questionId: [question.questionId],
          question: [question.question],
          formType: [question.type],
          currentTeam: [question.currentTeam]
        });
        questionFormArray.push(questionFormGroup);
      });
      
      const newFormGroup = this.fb.group({
        clicked: false,
        title: card.title,
        icon: card.icon,
        isTwoTeamsInvolved: card.isTwoTeamsInvolved,
        questions: questionFormArray
      });

      (this.cardForms.get('cards') as FormArray).push(newFormGroup);
    });
  }

  openDialog(card): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: card.get('title').value,
        modalContent: card,
        selectedTeamId: this.teamDetails.managers.team1[0].team_id,
        oppositionTeamId: this.teamDetails.managers.team2[0].team_id,
        selectedTeamPlayers: this.teamDetails.players.team1,
        oppositionTeamPlayers: this.teamDetails.players.team2
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(dialogRef.componentInstance);
      if(result) {
        this.createStatsData(dialogRef.componentInstance);
      }
    });
  }

  createStatsData(statsData) {
    this.statsData = statsData;
    let time_stamp = {};
    let player1 = this.statsData.player.player1;
    let player2 = this.statsData.player.player2;
    let oppositionPlayer = this.statsData.player.oppositionPlayer;
    let assist = this.statsData.isAssist;
    let rebound = this.statsData.selectedReboundValue;
    let timeString = new Date().toLocaleTimeString('en-US', { hour12: false });
    time_stamp = {
      'date_created': timeString, 'period': this.periodCount, 
      'referee_id': this.referreeData.refereeId, 'referee_unique_id': this.referreeData.refereeKhelId, 
      'referee_username': this.referreeData.refereeUserName, 'team_id': this.teamDetails.managers.team1[0].team_id
    };
    switch(this.statsData.modalTitle) {
      case 'Foul': {
        time_stamp = {
          ...time_stamp,
          'type': 'foul',
          'foul_by': player1.khelId,
          'by': player1.khelId,
        };
        this.updateStatsData.emit(time_stamp);
        break;
      }
      case 'Free Throw': {
        time_stamp = {
          ...time_stamp,
          "type": "freethrow",
          "score_by": player1.khelId,
          "by": player1.khelId,
        }
        this.updateStatsData.emit(time_stamp);
        break;
      }
      case 'Block': {
        time_stamp = {
          ...time_stamp,
          "type": "block",
          "block_by": player1.khelId,
          "by": player1.khelId,
        }
        this.updateStatsData.emit(time_stamp);
        break;
      }
      case 'Steal': {
        time_stamp = {
          ...time_stamp,
          "type": "steal",
          "steal_by": player1.khelId,
          "by": player1.khelId,
        }
        this.updateStatsData.emit(time_stamp);
        break;
      }
      case 'TurnOver': {
        time_stamp = {
          ...time_stamp,
          "type": "turnover",
          "turnover_by": player1.khelId,
          "by": player1.khelId,
        }
        this.updateStatsData.emit(time_stamp);
        break;
      }
      case '2 Point': {
        let asssit_khelid = 'none'; 
        if(assist) {
          asssit_khelid = player2.khelId;
        }
        time_stamp = {
          ...time_stamp,
          "type": "two_points_made",
          "score_by": player1.khelId,
          "by": player1.khelId,
          "assist_by": asssit_khelid,
          "shot_chart": 'coords',
        }
        this.updateStatsData.emit(time_stamp);
        this.createAssistRecord(asssit_khelid, assist, timeString);
        break;
      }
      case '3 Point': {
        let asssit_khelid = 'none'; 
        if(assist) {
          asssit_khelid = player2.khelId;
        }
        time_stamp = {
          ...time_stamp,
          "type": "three_points_made",
          "score_by": player1.khelId,
          "by": player1.khelId,
          "assist_by": asssit_khelid,
          "shot_chart": 'coords',
        };
        this.updateStatsData.emit(time_stamp);
        this.createAssistRecord(asssit_khelid, assist, timeString);
        break;
      }
      case 'Free Throw Miss': {
        if(rebound === 'none') {
          time_stamp = {
            ...time_stamp,
            "type": "free_throw_miss",
            "free_throw_miss_by": player1.khelId,
            "by": player1.khelId,
          };
          this.updateStatsData.emit(time_stamp);
        } else {
          if(rebound === 'offensive') {
            time_stamp = {
              ...time_stamp,
              "type": "free_throw_miss",
              "free_throw_miss_by": player1.khelId,
              "by": player1.khelId,
              "rebound_by": player2.khelId,
              "rebound_type": "offensive_rebound",
            };
            this.updateStatsData.emit(time_stamp);
            this.createOffensiveReboundRecord(player2.khelId, timeString);
          } else {
            time_stamp = {
              ...time_stamp,
              "type": "free_throw_miss",
              "free_throw_miss_by": player1.khelId,
              "by": player1.khelId,
              "rebound_by": oppositionPlayer.khelId,
              "rebound_type": "defensive_rebound",
              'team_id': this.teamDetails.managers.team2[0].team_id
            };
            this.updateStatsData.emit(time_stamp);
            this.createDefensiveReboundRecord(oppositionPlayer.khelId, timeString, this.teamDetails.managers.team2[0].team_id);
          }
        }
        break;
      }
      case '2 Pt Miss': {
        if(rebound === 'none') {
          time_stamp = {
            ...time_stamp,
            "type": "two_points_miss",
            "miss_by": player1.khelId,
            "by": player1.khelId,
          };
          this.updateStatsData.emit(time_stamp);
        } else {
          if(rebound === 'offensive') {
            time_stamp = {
              ...time_stamp,
              "type": "two_points_miss",
              "miss_by": player1.khelId,
              "by": player1.khelId,
              "rebound_by": player2.khelId,
              "rebound_type": "offensive_rebound",
            };
            this.updateStatsData.emit(time_stamp);
            this.createOffensiveReboundRecord(player2.khelId, timeString);
          } else {
            time_stamp = {
              ...time_stamp,
              "type": "two_points_miss",
              "miss_by": player1.khelId,
              "by": player1.khelId,
              "rebound_by": oppositionPlayer.khelId,
              "rebound_type": "defensive_rebound",
              'team_id': this.teamDetails.managers.team2[0].team_id
            };
            this.updateStatsData.emit(time_stamp);
            this.createDefensiveReboundRecord(oppositionPlayer.khelId, timeString, this.teamDetails.managers.team2[0].team_id);
          }
        }
        break;
      }
      case '3 Pt Miss': {
        if(rebound === 'none') {
          time_stamp = {
            ...time_stamp,
            "type": "three_points_miss",
            "miss_by": player1.khelId,
            "by": player1.khelId,
          };
          this.updateStatsData.emit(time_stamp);
        } else {
          if(rebound === 'offensive') {
            time_stamp = {
              ...time_stamp,
              "type": "three_points_miss",
              "miss_by": player1.khelId,
              "by": player1.khelId,
              "rebound_by": player2.khelId,
              "rebound_type": "offensive_rebound",
            };
            this.updateStatsData.emit(time_stamp);
            this.createOffensiveReboundRecord(player2.khelId, timeString);
          } else {
            time_stamp = {
              ...time_stamp,
              "type": "three_points_miss",
              "miss_by": player1.khelId,
              "by": player1.khelId,
              "rebound_by": oppositionPlayer.khelId,
              "rebound_type": "defensive_rebound",
              'team_id': this.teamDetails.managers.team2[0].team_id
            };
            this.updateStatsData.emit(time_stamp);
            this.createDefensiveReboundRecord(oppositionPlayer.khelId, timeString, this.teamDetails.managers.team2[0].team_id);
          }
        }
        break;
      }
      default:
        break;
    }
  }

  createAssistRecord(asssit_khelid, assist, timeString) {
    let time_stamp = {};
    time_stamp = {
      'date_created': timeString, 'period': this.periodCount, 
      'referee_id': this.referreeData.refereeId, 'referee_unique_id': this.referreeData.refereeKhelId, 
      'referee_username': this.referreeData.refereeUserName, 'team_id': this.teamDetails.managers.team1[0].team_id
    };
    if(assist) {
      time_stamp = {
        ...time_stamp,
        "type": "assist",
        "assist_by": asssit_khelid,
        "by": asssit_khelid,
      };
      setTimeout(() => {
        this.updateStatsData.emit(time_stamp);
      }, 1000);
    }
  }

  createOffensiveReboundRecord(khelId,timeString) {
    let time_stamp = {};
    time_stamp = {
      'date_created': timeString, 'period': this.periodCount, 
      'referee_id': this.referreeData.refereeId, 'referee_unique_id': this.referreeData.refereeKhelId, 
      'referee_username': this.referreeData.refereeUserName, 'team_id': this.teamDetails.managers.team1[0].team_id,
      "type": "offensive_rebound",
      "offensive_rebound_by": khelId,
      "by": khelId,
    };
    setTimeout(() => {
      this.updateStatsData.emit(time_stamp);
    }, 1000);
  }

  createDefensiveReboundRecord(khelId,timeString, teamId) {
    let time_stamp = {};
    time_stamp = {
      'date_created': timeString, 'period': this.periodCount, 
      'referee_id': this.referreeData.refereeId, 'referee_unique_id': this.referreeData.refereeKhelId, 
      'referee_username': this.referreeData.refereeUserName, 'team_id': teamId,
      "type": "defensive_rebound",
      "defensive_rebound_by": khelId,
      "by": khelId,
    };
    setTimeout(() => {
      this.updateStatsData.emit(time_stamp);
    }, 1000);
  }
}
