import { Component, Output, EventEmitter } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent {
@Output() loadDialogComponent = new EventEmitter<string>();

  fabButtons = [
    {
      icon: 'timeline',
      toolTip: 'Timeline',
      component: 'TimeLineComponent'
    },
    {
      icon: 'view_headline',
      toolTip: 'View Stats',
      component: 'DetailedStatsComponent'
    },
    {
      icon: 'room',
      toolTip: 'Room',
      component: 'TimeLineComponent'
    },
    {
      icon: 'lock',
      toolTip: 'Lock',
      component: 'TimeLineComponent'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  constructor() { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  loadComponent(componentName) {
    this.loadDialogComponent.emit(componentName);
  }
}
