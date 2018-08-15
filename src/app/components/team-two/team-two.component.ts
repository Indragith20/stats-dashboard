import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-team-two',
  templateUrl: './team-two.component.html',
  styleUrls: ['./team-two.component.scss']
})
export class TeamTwoComponent implements OnInit {
  @Input()
  set cardDetails(value: any) {
    if(value){
      this.cards = value;
      this.intializeFormValues();
    }
  }
  @Input() teamDetails: any;
  cardForms: FormGroup;
  cards: any;
  closeResult:string;
  modalContent: FormGroup;
  modalHeader: string;

  get formData() { return <FormArray>this.cardForms.get('cards'); }

  get modalFormData() { return <FormArray>this.modalContent.get('questions'); }
  
  constructor(private fb: FormBuilder, private modalService: NgbModal, public dialog: MatDialog) { 
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
    console.log(this.cardForms);
  }

  /* open(content, card) {
    this.modalContent = card;
    this.modalHeader = card.get('title').value;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  } */

  openDialog(card): void {
    //TODO: Uncomment the below code for two team players
    //if(card.get('isTwoTeamsInvolved').value === true) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: card.get('title').value, 
          modalContent: card, 
          selectedTeamId: this.teamDetails.managers.team2[0].team_id,
          oppositionTeamId: this.teamDetails.managers.team1[0].team_id,
          selectedTeamPlayers: this.teamDetails.players.team2,
          oppositionTeamPlayers: this.teamDetails.players.team1
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    //}
  }
}
