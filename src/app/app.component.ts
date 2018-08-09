import { Component } from '@angular/core';
import { cards } from '../constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cardQuestions: any;
  constructor() {
    this.cardQuestions = cards;
  }
}
