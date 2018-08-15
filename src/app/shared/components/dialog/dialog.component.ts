import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormArray } from '@angular/forms';

export interface DialogData {
    title: string;
    modalContent: FormGroup;
}

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog.component.html',
  })

export class DialogComponent {
  modalContent: FormGroup;
  modalTitle: string;

  get modalFormData() { return <FormArray>this.modalContent.get('questions'); }

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.modalContent = data.modalContent;
    this.modalTitle = data.title;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
  