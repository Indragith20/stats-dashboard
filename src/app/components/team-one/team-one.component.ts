import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-team-one',
  templateUrl: './team-one.component.html',
  styleUrls: ['./team-one.component.css']
})
export class TeamOneComponent implements OnInit {
  @Input()
  set cardDetails(value: any) {
    if(value){
      this.cards = value;
      this.intializeFormValues();
    }
  }
  cardForms: FormGroup;
  cards: any;

  get formData() { return <FormArray>this.cardForms.get('cards'); }

  constructor(private fb: FormBuilder) { 
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
          formType: [question.type]
        });
        questionFormArray.push(questionFormGroup);
      });
      
      const newFormGroup = this.fb.group({
        clicked: false,
        title: card.title,
        questions: questionFormArray
      });

      (this.cardForms.get('cards') as FormArray).push(newFormGroup);
    });
    console.log(this.cardForms);
  }

  getQuestionView(card, i) {
    const cardDetails = this.cardForms.get('cards').value;
    cardDetails.map((card, index) => {
      if(i === index){
        (this.cardForms.get('cards') as FormArray).at(index).patchValue({
          clicked: true
        });
      } else {
        (this.cardForms.get('cards') as FormArray).at(index).patchValue({
          clicked: false
        });
      }
      
    })
  }

}
