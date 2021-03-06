import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormArray } from '@angular/forms';

export interface DialogData {
    title: string;
    modalContent: FormGroup;
    selectedTeamId: any;
    oppositionTeamId: any;
    selectedTeamPlayers: any;
    oppositionTeamPlayers: any;
    modalTitleColor: any;
}

@Component({
    selector: 'app-dialog-component',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
  })

export class DialogComponent {
  modalContent: FormGroup;
  modalTitle: string;
  selectedTeamPlayerInField: any;
  oppositionTeamPlayerInField: any;
  selectedTeamPlayer: any[] = [];
  selectedOppositionPlayer: any[] = [];
  selectedCoordinates: any;

  selectedReboundValue: any = 'none';
  isAssist: any = false;
  player: any;
  modalTitleColor: any;

  get modalFormData() {
    return <FormArray>this.modalContent.get('questions');
  }

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.modalContent = data.modalContent;
    this.modalTitle = data.title;
    this.modalTitleColor = data.modalTitleColor;
    this.selectedTeamPlayerInField = data.selectedTeamPlayers.filter(player => player.is_substitute === false);
    this.oppositionTeamPlayerInField = data.oppositionTeamPlayers.filter(player => player.is_substitute === false);
  }

  onUpdateClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  changeDisplayedPlayers(selectedValue) {
    this.selectedReboundValue = selectedValue;
  }

  changeIsAssistValue(selectedValue) {
    this.isAssist = selectedValue.checked;
  }

  changeSelectedPlayer(playerDet: any) {
    if(playerDet.containerId === 1) {
      if(playerDet.questionId > 1) {
         this.player = {...this.player, player2: playerDet.selectedPlayer };
      } else {
        this.player = {...this.player, player1: playerDet.selectedPlayer };
      }
    } else {
      this.player = {...this.player, oppositionPlayer: playerDet.selectedPlayer};
    }
  }

  getColor(modalTitleColor) {
    return modalTitleColor ? '#fff' : '#000';
  }
}
