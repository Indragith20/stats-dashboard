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
}

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog.component.html',
  })

export class DialogComponent {
  modalContent: FormGroup;
  modalTitle: string;
  selectedTeamPlayerInField: any;
  oppositionTeamPlayerInField: any;
  selectedDropDownValue: any;

  get modalFormData() { 
    console.log(this.modalContent.get('questions').value);
    return <FormArray>this.modalContent.get('questions'); 
  }

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.modalContent = data.modalContent;
    this.modalTitle = data.title;
    this.selectedTeamPlayerInField = data.selectedTeamPlayers.filter(player => player.is_substitute === false);
    this.oppositionTeamPlayerInField = data.oppositionTeamPlayers.filter(player => player.is_substitute === false);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  changeDisplayedPlayers(selectedValue) {
    console.log(selectedValue);
    if(selectedValue === 'offensive') {
      this.oppositionTeamPlayerInField = [];
      this.oppositionTeamPlayerInField = [...this.selectedTeamPlayerInField];
    }
  }

}
  